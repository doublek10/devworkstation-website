import { KeyRound } from "lucide-react";
import Link from "next/link";

export default function GetKeyButton({ variant = "primary" }: { variant?: "primary" | "nav" }) {
  const base =
    variant === "nav"
      ? "px-4 py-2 font-mono text-[12.5px]"
      : "px-7 py-3.5 font-display text-[15px]";

  return (
    <Link
      href="/activationkey"
      className={`${base} inline-flex items-center gap-2 border border-line text-text transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent`}
    >
      <KeyRound className="h-4 w-4" strokeWidth={2} />
      Get key
    </Link>
  );
}
