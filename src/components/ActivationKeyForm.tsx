"use client";

import { Loader2, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ACTIVATION_API_BASE } from "@/lib/config";

type Stage = "form" | "submitting" | "awaiting-payment" | "paid" | "error";

type FormState = {
  firstname: string;
  lastname: string;
  surname: string;
  email: string;
  mpesaNumber: string;
};

const EMPTY: FormState = {
  firstname: "",
  lastname: "",
  surname: "",
  email: "",
  mpesaNumber: "",
};

export default function ActivationKeyForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [stage, setStage] = useState<Stage>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [activationKey, setActivationKey] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startPolling(id: string) {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${ACTIVATION_API_BASE}/status.php?id=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (data.status === "paid" && data.key) {
          setActivationKey(data.key);
          setStage("paid");
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // keep polling silently; the confirmation email is the fallback
      }
    }, 4000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!ACTIVATION_API_BASE) {
      setStage("error");
      setErrorMsg("Payment isn't configured yet. Set ACTIVATION_API_BASE in src/lib/config.ts.");
      return;
    }

    if (!form.firstname || !form.lastname || !form.surname || !form.email || !form.mpesaNumber) {
      setStage("error");
      setErrorMsg("Please fill in every field.");
      return;
    }

    setStage("submitting");

    try {
      const res = await fetch(`${ACTIVATION_API_BASE}/process.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          surname: form.surname,
          email: form.email,
          mpesa_number: form.mpesaNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not start the payment. Please try again.");
      }

      setRecordId(data.id);
      setStage("awaiting-payment");
      startPolling(data.id);
    } catch (err) {
      setStage("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (stage === "paid" && activationKey) {
    return (
      <div className="border border-ok/40 bg-ok/10 p-7">
        <h3 className="font-display text-[17px] font-semibold text-text">Payment received</h3>
        <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted">
          Your activation key has also been sent to <span className="text-text">{form.email}</span>.
        </p>
        <div className="mt-4 border border-line bg-ink p-4">
          <p className="font-mono text-[15px] tracking-wider text-accent break-all">{activationKey}</p>
        </div>
      </div>
    );
  }

  if (stage === "awaiting-payment") {
    return (
      <div className="border border-line bg-raised p-7">
        <div className="flex items-center gap-2">
          <span className="status-dot h-2 w-2 rounded-full bg-accent" />
          <h3 className="font-display text-[17px] font-semibold text-text">Check your phone</h3>
        </div>
        <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted">
          Enter your M-Pesa PIN on the prompt sent to {form.mpesaNumber} to complete the $10 payment.
          This page updates automatically once it's confirmed — you'll also get your key by email.
        </p>
        {recordId && <p className="mt-3 font-mono text-[11px] text-muted">Reference: {recordId}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-raised p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name">
          <input
            value={form.firstname}
            onChange={(e) => update("firstname", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Last name">
          <input
            value={form.lastname}
            onChange={(e) => update("lastname", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Surname">
          <input
            value={form.surname}
            onChange={(e) => update("surname", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="M-Pesa number" hint="07XXXXXXXX or 2547XXXXXXXX">
          <input
            value={form.mpesaNumber}
            onChange={(e) => update("mpesaNumber", e.target.value)}
            className={inputClass}
            placeholder="0712345678"
            required
          />
        </Field>
      </div>

      {stage === "error" && errorMsg && (
        <p className="mt-4 font-body text-[13px] text-accent">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={stage === "submitting"}
        className="mt-6 inline-flex items-center gap-2 border border-accent bg-accent px-7 py-3.5 font-display text-[15px] text-ink shadow-glow transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {stage === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting payment…
          </>
        ) : (
          <>
            <Smartphone className="h-4 w-4" strokeWidth={2} />
            Pay $10 with M-Pesa
          </>
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-line bg-ink px-3.5 py-2.5 font-body text-[13.5px] text-text placeholder:text-muted/60 focus:border-accent";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11.5px] uppercase tracking-wide text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block font-mono text-[11px] text-muted/70">{hint}</span>}
    </label>
  );
}
