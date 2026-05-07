"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="mx-auto max-w-md px-5 pt-6 pb-2 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-widest uppercase text-white">
          FitAround
        </span>
        <Link
          href="/outfit"
          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-widest text-zinc-300 transition hover:scale-105 hover:border-white/20 hover:text-white"
        >
          Build my outfit
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-md px-5 pt-16 pb-20">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            AI outfit matching
          </span>
        </div>

        <h1 className="text-[3rem] font-bold leading-[1.02] tracking-tight mb-6">
          Upload one item.
          <br />
          <span className="text-zinc-400">Build the fit around it.</span>
        </h1>

        <p className="text-base leading-relaxed text-zinc-400 mb-6 max-w-sm">
          Choose the occasion, vibe, and budget — then get outfit pieces that actually make sense with what
          you&apos;re wearing.
        </p>

        <p className="text-sm text-zinc-500 mb-3 max-w-xs">
          Built to make outfit decisions faster, sharper, and less generic.
        </p>

        <p className="text-sm text-zinc-500 mb-3 max-w-xs">No signup needed. Free to try.</p>

        <p className="text-xs text-zinc-600 mb-10 max-w-xs leading-relaxed">
          Photos are only used to generate your outfit recommendation.
        </p>

        <div className="flex flex-col gap-3 mb-12">
          <Link
            href="/outfit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.99]"
          >
            Build my outfit
          </Link>

          <Link
            href="/outfit"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm uppercase tracking-widest text-zinc-400 transition hover:scale-[1.02] hover:border-white/20 hover:text-white"
          >
            Try a sample item
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Upload photo", "Pick occasion", "Choose vibe", "Shop matches"].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-400"
            >
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-md px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-md px-5 py-20">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-600 mb-3">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Five steps.
            <br />
            <span className="text-zinc-400">One better outfit.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              step: "01",
              title: "Upload your item",
              desc: "Start with one clothing piece you already own.",
            },
            {
              step: "02",
              title: "Pick the context",
              desc: "Choose where you are wearing it, like dinner, work, party, or travel.",
            },
            {
              step: "03",
              title: "Choose the vibe",
              desc: "Go safe, minimal, bold, or expensive-looking.",
            },
            {
              step: "04",
              title: "Pick budget",
              desc: "Set your spend level so recommendations fit your price range.",
            },
            {
              step: "05",
              title: "Shop matching pieces",
              desc: "Get products that work around your item and outfit direction.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 flex gap-5 items-start"
            >
              <span className="text-[11px] font-mono text-zinc-600 mt-1 shrink-0">
                {item.step}
              </span>
              <div>
                <p className="text-base font-semibold text-white mb-1">{item.title}</p>
                <p className="text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-md px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Footer */}
      <footer className="mx-auto max-w-md border-t border-white/10 px-5 pb-10 pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
              FitAround
            </span>
            <p className="mt-1 text-xs text-zinc-700">AI outfit matching, simplified.</p>
            <p className="mt-2 text-[11px] text-zinc-700">Free to use · Affiliate-supported</p>
            <p className="mt-2 text-[11px] text-zinc-700">© 2026 FitAround</p>
          </div>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-zinc-500"
            aria-label="Legal and contact"
          >
            <Link href="/about" className="transition hover:text-zinc-300">
              About
            </Link>
            <Link href="/privacy" className="transition hover:text-zinc-300">
              Privacy
            </Link>
            <Link href="/affiliate-disclosure" className="transition hover:text-zinc-300">
              Affiliate Disclosure
            </Link>
            <Link href="/contact" className="transition hover:text-zinc-300">
              Contact
            </Link>
          </nav>
        </div>
      </footer>

    </main>
  );
}
