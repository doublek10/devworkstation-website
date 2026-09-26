import { ShieldAlert } from "lucide-react";
import DownloadButton from "./DownloadButton";
import GetKeyButton from "./GetKeyButton";

export default function DownloadSection() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-[28px] font-semibold tracking-tight text-text">Get DevWorkstation</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-[15px] leading-relaxed text-muted">
          One installer. Windows 10 or 11, 64-bit. No separate runtime to set up first.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <DownloadButton />
          <GetKeyButton />
        </div>
        <p className="mx-auto mt-6 flex max-w-md items-start justify-center gap-2 text-left font-body text-[12.5px] leading-relaxed text-muted">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
          <span>
            Windows SmartScreen may flag new installers from independent
            developers as unrecognized — click &quot;More info, then Run
            anyway&quot; to continue.
          </span>
        </p>
      </div>
    </section>
  );
}
