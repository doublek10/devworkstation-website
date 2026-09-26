import { KeyRound } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ActivationKeyForm from "@/components/ActivationKeyForm";

export const metadata = {
  title: "Get your activation key — DevWorkstation",
  description: "Pay $10 via M-Pesa to receive your DevWorkstation activation key by email.",
};

export default function ActivationKeyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden
            className="glow-blob pointer-events-none absolute -left-20 -top-20 h-[320px] w-[320px] rounded-full bg-accent/15"
          />
          <div className="relative mx-auto max-w-2xl px-6 py-20">
            <span className="inline-flex items-center gap-2 border border-line bg-raised px-3 py-1.5 font-mono text-[11.5px] text-accent">
              <KeyRound className="h-3.5 w-3.5" strokeWidth={2} />
              Activation
            </span>
            <h1 className="mt-4 font-display text-[32px] font-semibold tracking-tight text-text">
              Pay $10 to get your activation key
            </h1>
            <p className="mt-3 font-body text-[14.5px] leading-relaxed text-muted">
              Fill in your details and pay with M-Pesa. Once payment is confirmed you&apos;ll get your
              activation key on this page and by email.
            </p>

            <div className="mt-10">
              <ActivationKeyForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
