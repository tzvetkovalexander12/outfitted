import type { Metadata } from "next";
import { LegalPageShell } from "../../components/legal-page-shell";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Outfitted",
  description: "How affiliate links on Outfitted work and how they support the service.",
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPageShell title="Affiliate Disclosure">
      <p>Outfitted recommends clothing and accessories from online retailers.</p>
      <p>
        Some links on Outfitted may be affiliate links. This means we may earn a commission if a user clicks a product
        link and makes a purchase.
      </p>
      <p>This does not change the price users pay.</p>
      <p>Affiliate partnerships help keep Outfitted free to use.</p>
      <p>
        We aim to recommend products that are relevant to the uploaded item and useful for building better outfits.
      </p>
    </LegalPageShell>
  );
}
