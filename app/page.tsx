"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="mx-auto max-w-md px-5 pt-6 pb-2 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-widest uppercase text-white">
          Outfitted
        </span>
        <Link
          href="/outfit"
          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-widest text-zinc-300 transition hover:scale-105 hover:border-white/20 hover:text-white"
        >
          Get started
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-md px-5 pt-16 pb-20">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            First date. One outfit. Done.
          </span>
        </div>

        <h1 className="text-[3rem] font-bold leading-[1.02] tracking-tight mb-6">
          Stop guessing
          <br />
          <span className="text-zinc-400">what to wear.</span>
        </h1>

        <p className="text-base leading-relaxed text-zinc-400 mb-6 max-w-xs">
          Outfitted gives you one curated outfit for your first date — matched to your budget, your vibe, and where you are.
        </p>

        {/* NEW ONE-LINER */}
        <p className="text-sm text-zinc-500 mb-10 max-w-xs">
          Built for guys who don’t want to overthink what to wear.
        </p>

        <div className="flex flex-col gap-3 mb-12">
          <Link
            href="/outfit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.99]"
          >
            Get my outfit
          </Link>

          <a
            href="#how-it-works"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm uppercase tracking-widest text-zinc-400 transition hover:scale-[1.02] hover:border-white/20 hover:text-white"
          >
            See how it works
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Takes 30 seconds", "No overthinking", "Looks intentional", "Real brands"].map((pill) => (
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
            Four questions.
            <br />
            <span className="text-zinc-400">One outfit.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              step: "01",
              title: "Pick the date type",
              desc: "Coffee, dinner, or drinks. Each one needs a different approach.",
            },
            {
              step: "02",
              title: "Set your budget",
              desc: "Affordable, mid-range, or premium. You decide the level.",
            },
            {
              step: "03",
              title: "Choose your country",
              desc: "So the links go somewhere useful and delivery is realistic.",
            },
            {
              step: "04",
              title: "Get one clean outfit",
              desc: "A curated look with real items, prices, and direct links. No noise.",
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

      {/* Final CTA */}
      <section className="mx-auto max-w-md px-5 py-24 text-center">
        <h2 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight mb-5">
          One outfit.
          <br />
          <span className="text-zinc-400">Zero stress.</span>
        </h2>

        <p className="text-base leading-relaxed text-zinc-400 mb-10 max-w-xs mx-auto">
          Takes less than a minute. Works for any budget. Looks like you planned it for weeks.
        </p>

        <Link
          href="/outfit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.99]"
        >
          Get my outfit
        </Link>

        {/* NEW TINY FOOTER LINE */}
        <p className="mt-6 text-xs text-zinc-600 tracking-wide">
          Free · No signup
        </p>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-md px-5 pb-10 border-t border-white/10 pt-8 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
          Outfitted
        </span>
        <span className="text-xs text-zinc-700">
          Men's first date style, simplified.
        </span>
      </footer>

    </main>
  );
}
