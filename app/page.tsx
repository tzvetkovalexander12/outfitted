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
          Have a piece you need to wear this week? Upload it, choose the situation, and get a styled outfit built around it.
        </p>

        <p className="text-sm text-zinc-500 mb-3 max-w-xs">
          Built for real-life styling decisions, not just generic outfit ideas.
        </p>

        <p className="text-sm text-zinc-500 mb-10 max-w-xs">No signup needed. Free to try.</p>

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
            Four steps, then your result.
            <br />
            <span className="text-zinc-400">One better outfit.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              step: "01",
              title: "Upload one item",
              desc: "Start with something you own or want to buy.",
            },
            {
              step: "02",
              title: "Pick the situation",
              desc: "Tell us where you need to wear it.",
            },
            {
              step: "03",
              title: "Choose the vibe",
              desc: "Safe, minimal, bold, or expensive-looking.",
            },
            {
              step: "04",
              title: "Set your budget",
              desc: "Keep recommendations realistic.",
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

          <div className="my-1 flex items-center gap-3 px-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Then your result</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          <div className="rounded-[24px] border border-white/15 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-transparent px-5 py-5 flex gap-5 items-start">
            <span className="mt-1 shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-300">
              Result
            </span>
            <div>
              <p className="mb-1 text-base font-semibold text-white">Get a styled result</p>
              <p className="text-sm leading-relaxed text-zinc-400">
                See the direction, why it works, and pieces that complete the look.
              </p>
            </div>
          </div>
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
