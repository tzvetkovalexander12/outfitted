import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../../components/legal-page-shell";

export const metadata: Metadata = {
  title: "About | FitAround",
  description:
    "Learn how FitAround helps you style an outfit around one item you already want to wear.",
};

export default function AboutPage() {
  return (
    <LegalPageShell title="About FitAround">
      <p>
        FitAround helps you build an outfit around one item you already want to wear.
      </p>
      <p>
        Upload one item, choose the occasion, fit, and budget, and get matching outfit recommendations built around
        that piece.
      </p>
      <p>No signup is needed, and it is built for quick styling help, not wardrobe management.</p>

      <div className="pt-2">
        <Link
          href="/outfit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.99]"
        >
          Try FitAround
        </Link>
      </div>
    </LegalPageShell>
  );
}
