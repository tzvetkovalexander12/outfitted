"use client";

import { useEffect, useMemo, useState } from "react";

type Budget = "affordable" | "mid" | "premium";
type Country = "UK" | "Germany" | "France";

interface OutfitItem {
  label: string;
  url: string;
  price: string;
  image: string;
  note?: string;
  brand?: string;
}

interface Outfit {
  title: string;
  description: string;
  vibe: string;
  estimatedTotal: string;
  accent: string;
  accentSolid: string;
  imageLabel: string;
  items: OutfitItem[];
}

type OutfitMap = {
  [B in Budget]: Outfit;
};

const PLACEHOLDER_IMAGE = "/products/uniqlo-white-tee.jpg";

const OUTFITS: OutfitMap = {
  affordable: {
    title: "Easy Everyday Match",
    vibe: "Relaxed, clean, hard to get wrong.",
    estimatedTotal: "~€50",
    accent: "from-stone-400/30 via-zinc-600/20 to-zinc-800/30",
    accentSolid: "from-stone-300 via-zinc-400 to-zinc-600",
    imageLabel: "Soft neutrals · simple layers",
    description: "A light, relaxed combination that makes your uploaded item feel intentional.",
    items: [
      {
        label: "White Supima cotton crew-neck T-shirt",
        brand: "Uniqlo",
        url: "https://www.uniqlo.com/uk/en/products/E455365-000/00?colorDisplayCode=00&sizeDisplayCode=003",
        price: "€20",
        image: PLACEHOLDER_IMAGE,
        note: "Clean base layer",
      },
      {
        label: "Skinny fit chino trousers in ecru",
        brand: "Zara Men",
        url: "https://www.zara.com/uk/en/skinny-fit-chino-trousers-p01934408.html",
        price: "€20",
        image: PLACEHOLDER_IMAGE,
        note: "Relaxed palette",
      },
      {
        label: "VL Court Base Shoes",
        brand: "adidas",
        url: "https://www.adidas.co.uk/vl-court-base-shoes/JI1776.html",
        price: "€10+",
        image: PLACEHOLDER_IMAGE,
        note: "Simple finish",
      },
    ],
  },
  mid: {
    title: "Refined Everyday Match",
    vibe: "A little sharper, still effortless.",
    estimatedTotal: "~€175",
    accent: "from-blue-900/30 via-slate-700/20 to-stone-800/30",
    accentSolid: "from-slate-300 via-stone-400 to-slate-600",
    imageLabel: "Elevated basics · clean tones",
    description: "Better fabrics and cleaner proportions around your uploaded piece.",
    items: [
      {
        label: "Relaxed fit off-white T-shirt",
        brand: "COS",
        url: "https://www.cos.com/en-gb/men/menswear/tshirts/relaxed-fit/product/mesh-panel-knitted-t-shirt-mole-off-white-1281661001",
        price: "€45",
        image: PLACEHOLDER_IMAGE,
        note: "Better drape",
      },
      {
        label: "Washed cotton slim-fit chinos in stone",
        brand: "Reiss Pitch",
        url: "https://www.reiss.com/style/st453404/d74487",
        price: "€70",
        image: PLACEHOLDER_IMAGE,
        note: "Cleaner line",
      },
      {
        label: "Leather trainers in white",
        brand: "ARKET",
        url: "https://www.arket.com/en-eu/product/leather-trainers-white-1277664001/",
        price: "€60",
        image: PLACEHOLDER_IMAGE,
        note: "Minimal finish",
      },
      {
        label: "Slim leather card wallet",
        brand: "Bellroy Card Sleeve",
        url: "https://bellroy.com/products/card-sleeve-wallet/leather/charcoal",
        price: "€35",
        image: PLACEHOLDER_IMAGE,
        note: "Small polish detail",
      },
    ],
  },
  premium: {
    title: "Quiet Luxury Match",
    vibe: "Subtle, sharp, expensive-looking.",
    estimatedTotal: "~€520",
    accent: "from-amber-900/30 via-stone-700/20 to-neutral-900/30",
    accentSolid: "from-amber-200 via-stone-400 to-neutral-600",
    imageLabel: "Refined texture · premium denim",
    description: "The uploaded item stays central. The rest upgrades the whole impression.",
    items: [
      {
        label: "Slim-fit cashmere crew-neck knit",
        brand: "Johnstons of Elgin",
        url: "https://www.johnstons.com/en-gb/mens/knitwear/crew-neck/slim-fit-cashmere-crew-neck-KAA01987HA73.html",
        price: "€240",
        image: PLACEHOLDER_IMAGE,
        note: "Luxury texture",
      },
      {
        label: "Regular fit jeans 2021M",
        brand: "Acne Studios",
        url: "https://www.acnestudios.com/us/en/regular-fit-jeans-2021m/",
        price: "€180",
        image: PLACEHOLDER_IMAGE,
        note: "Premium denim base",
      },
      {
        label: "Dark tan suede Chelsea boots",
        brand: "Crockett & Jones Chepstow",
        url: "https://www.crockett-jones.com/products/chepstow-4-tan-suede",
        price: "€100+",
        image: PLACEHOLDER_IMAGE,
        note: "Strong finish",
      },
    ],
  },
};

const BUDGET_OPTIONS: {
  value: Budget;
  label: string;
  sub: string;
  accent: string;
  dot: string;
}[] = [
  {
    value: "affordable",
    label: "Affordable",
    sub: "Best value, still intentional.",
    accent: "hover:border-stone-500/40 hover:bg-stone-900/30",
    dot: "bg-stone-400",
  },
  {
    value: "mid",
    label: "Mid-Range",
    sub: "Better fabrics, stronger look.",
    accent: "hover:border-slate-500/40 hover:bg-slate-900/30",
    dot: "bg-slate-400",
  },
  {
    value: "premium",
    label: "Premium",
    sub: "Higher-end, elevated choices.",
    accent: "hover:border-amber-600/40 hover:bg-amber-950/20",
    dot: "bg-amber-400",
  },
];

const COUNTRY_OPTIONS: Country[] = ["UK", "Germany", "France"];

const BUDGET_LABELS: Record<Budget, string> = {
  affordable: "Affordable",
  mid: "Mid-Range",
  premium: "Premium",
};

function buildUploadExplanation(budget: Budget) {
  return `Your uploaded item becomes the anchor. These pieces are matched around it on a ${BUDGET_LABELS[
    budget
  ].toLowerCase()} budget.`;
}

function MiniPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
      {children}
    </span>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:border-white/20 hover:text-white"
    >
      <span className="text-zinc-600">←</span> Back
    </button>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
          Step {step} of 3
        </p>
        <p className="text-[11px] text-zinc-600">
          {Math.round(((step - 1) / 3) * 100)}%
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
              s < step ? "bg-white" : s === step ? "bg-zinc-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductImage({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent: string;
}) {
  return (
    <div className={`relative h-28 w-24 shrink-0 overflow-hidden bg-gradient-to-br ${accent}`}>
      <div className="absolute inset-0 bg-black/10" />
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export default function Home() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [country, setCountry] = useState<Country | null>(null);

  const outfit = budget ? OUTFITS[budget] : null;
  const showResult = Boolean(budget && uploadedImage && country && outfit);

  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  function handleUpload(file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadedImage(previewUrl);
    setUploadedFileName(file.name);
  }

  function resetAll() {
    setBudget(null);
    setUploadedImage(null);
    setUploadedFileName(null);
    setCountry(null);
  }

  const stepNumber = !budget ? 1 : !uploadedImage ? 2 : !country ? 3 : 4;

  const selectedSummary = useMemo(
    () => ({
      budget: budget ? BUDGET_LABELS[budget] : null,
      upload: uploadedImage ? "Item uploaded" : null,
      country,
    }),
    [budget, uploadedImage, country]
  );

  const uploadExplanation = budget ? buildUploadExplanation(budget) : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_50%),linear-gradient(to_bottom,#0a0a0c,#111113_40%,#0a0a0c)] text-white">
      <div className="mx-auto max-w-md px-4 pb-20 pt-6 sm:px-5 sm:pt-8">
        <div className="mb-6 rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                Outfitted
              </p>
              <h1 className="text-[2.1rem] font-bold leading-[1.02] tracking-tight sm:text-[2.5rem]">
                Upload one item.
                <br />
                <span className="text-zinc-400">Match the rest.</span>
              </h1>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-base shadow-lg shadow-black/20">
              ✦
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <MiniPill>Upload item</MiniPill>
            <MiniPill>Online matches</MiniPill>
            <MiniPill>3 steps</MiniPill>
          </div>
        </div>

        {stepNumber < 4 && <ProgressBar step={stepNumber} />}

        {(selectedSummary.budget || selectedSummary.upload || selectedSummary.country) &&
          stepNumber < 4 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {selectedSummary.budget && <MiniPill>{selectedSummary.budget}</MiniPill>}
              {selectedSummary.upload && <MiniPill>{selectedSummary.upload}</MiniPill>}
              {selectedSummary.country && <MiniPill>{selectedSummary.country}</MiniPill>}
            </div>
          )}

        {!budget && (
          <section className="space-y-3">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold tracking-tight">Budget?</h2>
              <p className="mt-1.5 text-sm text-zinc-500">
                Sets the level of the whole outfit.
              </p>
            </div>

            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setBudget(opt.value)}
                className={`group w-full rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-left transition duration-200 hover:scale-[1.025] active:scale-[0.99] ${opt.accent}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${opt.dot} opacity-70 group-hover:opacity-100`}
                    />
                    <div>
                      <p className="text-base font-semibold text-white">{opt.label}</p>
                      <p className="mt-0.5 text-sm text-zinc-500">{opt.sub}</p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 transition group-hover:text-zinc-400">
                    Select →
                  </span>
                </div>
              </button>
            ))}
          </section>
        )}

        {budget && !uploadedImage && (
          <section className="space-y-3">
            <div className="mb-5 flex items-start gap-4">
              <BackButton onClick={() => setBudget(null)} />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Upload your item.</h2>
                <p className="mt-0.5 text-sm text-zinc-500">
                  We’ll match online pieces around it.
                </p>
              </div>
            </div>

            <label className="group block cursor-pointer overflow-hidden rounded-[26px] border border-dashed border-white/[0.14] bg-white/[0.03] p-5 transition duration-200 hover:scale-[1.015] hover:border-white/25 hover:bg-white/[0.06]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleUpload(event.target.files?.[0])}
              />

              <div className="flex min-h-64 flex-col items-center justify-center rounded-[22px] border border-white/[0.06] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent px-5 py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05] text-2xl shadow-lg shadow-black/20">
                  +
                </div>

                <p className="text-lg font-semibold text-white">Choose clothing photo</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
                  Upload a clear picture of one item you already own.
                </p>

                <div className="mt-5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 transition group-hover:border-white/20 group-hover:text-white">
                  Upload image
                </div>
              </div>
            </label>
          </section>
        )}

        {budget && uploadedImage && !country && (
          <section className="space-y-3">
            <div className="mb-5 flex items-start gap-4">
              <BackButton
                onClick={() => {
                  setUploadedImage(null);
                  setUploadedFileName(null);
                }}
              />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Where are you?</h2>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Keeps links and prices relevant.
                </p>
              </div>
            </div>

            <div className="mb-4 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03]">
              <div className="relative h-44 bg-zinc-950">
                <img
                  src={uploadedImage}
                  alt="Uploaded clothing item"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Uploaded item
                  </p>
                  <p className="mt-1 max-w-[220px] truncate text-sm font-semibold text-zinc-100">
                    {uploadedFileName ?? "Clothing photo"}
                  </p>
                </div>

                <label className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition hover:border-white/20 hover:text-white">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleUpload(event.target.files?.[0])}
                  />
                </label>
              </div>
            </div>

            {COUNTRY_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className="group w-full rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-left transition duration-200 hover:scale-[1.025] hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-white">{c}</p>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 transition group-hover:text-zinc-400">
                    Select →
                  </span>
                </div>
              </button>
            ))}
          </section>
        )}

        {showResult && outfit && country && budget && uploadedImage && (
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <BackButton onClick={() => setCountry(null)} />
              <button
                onClick={resetAll}
                className="inline-flex rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100"
              >
                Start over
              </button>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur">
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${outfit.accent}`}>
                <img
                  src={uploadedImage}
                  alt="Uploaded clothing item"
                  className="absolute inset-0 h-full w-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute -right-8 top-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-black/30 blur-2xl" />

                <div className="relative flex h-full flex-col justify-end p-6">
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.28em] text-white/50">
                    Matched around your uploaded item
                  </p>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
                    {outfit.vibe}
                  </h2>
                  <p className="mt-2 text-xs text-white/50">{outfit.imageLabel}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                <div className="flex flex-wrap gap-2">
                  <MiniPill>{BUDGET_LABELS[budget]}</MiniPill>
                  <MiniPill>{country}</MiniPill>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Est. spend
                  </p>
                  <p className="text-base font-semibold text-white">{outfit.estimatedTotal}</p>
                </div>
              </div>

              <div className="border-b border-white/[0.06] px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-400">{uploadExplanation}</p>
              </div>

              <div className="px-5 py-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                    Suggested pieces
                  </p>
                  <p className="text-[11px] text-zinc-600">{outfit.items.length} items</p>
                </div>

                <div className="space-y-2.5">
                  {outfit.items.map((item, i) => (
                    <div
                      key={i}
                      className="group overflow-hidden rounded-[20px] border border-white/[0.07] bg-zinc-950/60 transition duration-200 hover:scale-[1.012] hover:border-white/[0.15]"
                    >
                      <div className="flex">
                        <ProductImage
                          src={item.image}
                          alt={item.label}
                          accent={outfit.accentSolid}
                        />

                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              {item.brand && (
                                <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                                  {item.brand}
                                </p>
                              )}

                              <p className="text-sm leading-snug text-zinc-100">{item.label}</p>
                            </div>

                            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-xs font-semibold text-white">
                              {item.price}
                            </span>
                          </div>

                          {item.note && (
                            <p className="mt-1.5 text-xs text-zinc-600">{item.note}</p>
                          )}

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                          >
                            View item →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 border-t border-white/[0.06] px-5 py-5">
                <div className="overflow-hidden rounded-[18px] border border-white/[0.06] bg-zinc-950/60">
                  <div className="h-24">
                    <img
                      src={uploadedImage}
                      alt="Uploaded clothing item"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                      Uploaded item
                    </p>
                    <p className="mt-1.5 truncate text-sm font-semibold text-zinc-100">
                      {uploadedFileName ?? "Clothing photo"}
                    </p>
                  </div>
                </div>

                <div className="rounded-[18px] border border-white/[0.06] bg-zinc-950/60 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Region
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-zinc-100">{country}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}