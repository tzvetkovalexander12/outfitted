import type { Metadata } from "next";
import { LegalPageShell } from "../../components/legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | FitAround",
  description: "How FitAround handles uploaded images, third-party processing, and contact information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <p>FitAround lets users upload clothing images to generate outfit recommendations.</p>
      <p>
        We only use uploaded images to analyze the clothing item and generate a recommendation. Uploaded images are not
        used to personally identify users.
      </p>
      <p>Images may be sent to third-party AI providers for processing. We do not sell personal data.</p>
      <p>
        FitAround may use basic analytics or affiliate tracking to understand product clicks and improve recommendations.
      </p>
      <p>If users contact us, we may receive their name or email address only for communication purposes.</p>
      <p className="border-t border-white/[0.08] pt-5 text-xs text-zinc-500">
        This policy may be updated as the product develops.
      </p>
    </LegalPageShell>
  );
}
