import type { Metadata } from "next";
import { LegalPageShell } from "../../components/legal-page-shell";

export const metadata: Metadata = {
  title: "Contact | FitAround",
  description: "Contact FitAround for questions, feedback, partnerships, or affiliate enquiries.",
};

export default function ContactPage() {
  return (
    <LegalPageShell title="Contact">
      <p>For questions, feedback, partnership requests, or affiliate enquiries, contact:</p>
      <p className="text-white">
        <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-600">Email</span>
        <br />
        <a
          href="mailto:tzvetkovalexander@gmail.com"
          className="mt-1 inline-block font-medium text-zinc-200 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/40"
        >
          tzvetkovalexander@gmail.com
        </a>
      </p>
      <p className="text-zinc-500">
        We are currently improving FitAround and welcome feedback from users and retail partners.
      </p>
    </LegalPageShell>
  );
}
