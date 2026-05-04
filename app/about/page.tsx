import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../../components/legal-page-shell";

export const metadata: Metadata = {
  title: "About | Outfitted",
  description:
    "Learn how Outfitted uses AI to recommend matching pieces from European retailers around clothing you already own.",
};

export default function AboutPage() {
  return (
    <LegalPageShell title="About Outfitted">
      <p>
        Outfitted is an AI outfit matching tool that helps people build better outfits around clothing they already own.
      </p>
      <p>
        Users upload a photo of one clothing item, and Outfitted analyzes the item&apos;s style, colour, and outfit
        direction to recommend matching pieces from online retailers.
      </p>
      <p>Our goal is to make outfit building faster, simpler, and less overwhelming.</p>

      <div className="pt-2">
        <Link
          href="/outfit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.99]"
        >
          Try Outfitted
        </Link>
      </div>
    </LegalPageShell>
  );
}
