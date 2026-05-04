"use client";

import { useEffect, useMemo, useState } from "react";
import { getProductsForCategories } from "../../lib/products";

type Budget = "affordable" | "mid" | "premium";

type OutfitDirection = "casual clean" | "smart casual" | "evening polished";

/** AI analysis from /api/analyze-item; fields optional so older responses stay valid. */
type AIAnalysis = {
  itemType?: string;
  mainColor?: string;
  style?: string;
  recommendedPieces?: string[];
  reason?: string;
  outfitDirection?: OutfitDirection;
};

const OUTFIT_DIRECTION_VALUES: readonly OutfitDirection[] = [
  "casual clean",
  "smart casual",
  "evening polished",
];

function normalizeOutfitDirection(raw: unknown): OutfitDirection {
  if (typeof raw !== "string") return "smart casual";
  const t = raw.toLowerCase().trim();
  return OUTFIT_DIRECTION_VALUES.includes(t as OutfitDirection)
    ? (t as OutfitDirection)
    : "smart casual";
}

function formatOutfitDirectionLabel(direction: OutfitDirection): string {
  return direction
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

const BUDGET_LABELS: Record<Budget, string> = {
  affordable: "Affordable",
  mid: "Mid-Range",
  premium: "Premium",
};

function buildResultNote(budget: Budget) {
  if (budget === "affordable") {
    return "Matched around your item on an affordable budget.";
  }
  if (budget === "mid") {
    return "Matched around your item on a mid-range budget.";
  }
  return "Matched around your item on a premium budget.";
}

/** Title override when AI returns `outfitDirection`; falls back to budget-based title. */
function formatOutfitDirectionTitle(direction?: string | null): string | null {
  const t = typeof direction === "string" ? direction.toLowerCase().trim() : "";
  if (t === "casual clean") return "Casual Clean Match";
  if (t === "smart casual") return "Smart Casual Match";
  if (t === "evening polished") return "Evening Polished Match";
  return null;
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
  const percent = Math.round((step / 3) * 100);

  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
          Step {step} of 3
        </p>
        <p className="text-[11px] text-zinc-600">{percent}%</p>
      </div>

      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
              s <= step ? "bg-white" : "bg-white/10"
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadConfirmed, setUploadConfirmed] = useState(false);
  const [budget, setBudget] = useState<Budget | null>(null);

  const aiRecommendedItems = (aiAnalysis?.recommendedPieces ?? []).slice(0, 3);
  const resolvedOutfitDirection = normalizeOutfitDirection(
    aiAnalysis?.outfitDirection
  );

  const dynamicItems = budget ? getProductsForCategories(aiRecommendedItems, budget) : [];
  const heroItem = dynamicItems[0];

  const outfit =
    budget && dynamicItems.length > 0
      ? { ...OUTFITS[budget], items: dynamicItems }
      : budget
        ? OUTFITS[budget]
        : null;
  const showResult = Boolean(uploadConfirmed && budget && uploadedImage && outfit);

  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setUploadedImage(preview);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/analyze-item", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Server returned non-JSON:", text);
        throw new Error("Server returned an invalid response.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze image.");
      }

      console.log("AI RESULT:", data);
      setAiAnalysis(data.analysis);
    } catch (err) {
      console.error(err);
    }
  }

  function resetAll() {
    if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    setUploadedImage(null);
    setUploadedFileName(null);
    setUploadConfirmed(false);
    setBudget(null);
    setAiAnalysis(null);
  }

  const stepNumber = !uploadedImage
    ? 1
    : !uploadConfirmed
      ? 1
      : !budget
        ? 2
        : 3;

  const selectedSummary = useMemo(
    () => ({
      upload: uploadedImage ? "Item uploaded" : null,
      budget: budget ? BUDGET_LABELS[budget] : null,
    }),
    [budget, uploadedImage]
  );

  const resultNote = budget ? buildResultNote(budget) : null;

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

        <ProgressBar step={stepNumber} />

        {(selectedSummary.budget || selectedSummary.upload) &&
          !showResult && (
            <div className="mb-5 flex flex-wrap gap-2">
              {selectedSummary.upload && <MiniPill>{selectedSummary.upload}</MiniPill>}
              {selectedSummary.budget && <MiniPill>{selectedSummary.budget}</MiniPill>}
            </div>
          )}

        {!uploadedImage && (
          <section className="space-y-3">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold tracking-tight">Upload your item.</h2>
              <p className="mt-1.5 text-sm text-zinc-500">Step 1 of 3</p>
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
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">Clear image works best.</p>

                <div className="mt-5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 transition group-hover:border-white/20 group-hover:text-white">
                  Upload image
                </div>
              </div>
            </label>
          </section>
        )}

        {uploadedImage && !uploadConfirmed && (
          <section className="space-y-3">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold tracking-tight">Confirm upload.</h2>
              <p className="mt-1.5 text-sm text-zinc-500">Step 1 of 3</p>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03]">
              <div className="relative h-60 bg-zinc-950">
                <img
                  src={uploadedImage}
                  alt="Uploaded clothing item"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {aiAnalysis && (
                <div className="mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    AI read
                  </p>

                  <p className="mt-2 text-base font-semibold text-white">
                    {aiAnalysis.mainColor} {aiAnalysis.itemType}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">{aiAnalysis.style}</p>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {aiAnalysis.reason}
                  </p>
                </div>
              )}

              <div className="px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">Uploaded item</p>
                <p className="mt-1 max-w-[260px] truncate text-sm font-semibold text-zinc-100">
                  {uploadedFileName ?? "Clothing photo"}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setUploadConfirmed(true)}
                    className="rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-100"
                  >
                    Looks good → continue
                  </button>

                  <label className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300 transition hover:border-white/20 hover:text-white">
                    Change photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleUpload(event.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>
        )}

        {uploadConfirmed && !budget && (
          <section className="space-y-3">
            <div className="mb-5 flex items-start gap-4">
              <BackButton onClick={() => setUploadConfirmed(false)} />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Pick budget.</h2>
                <p className="mt-0.5 text-sm text-zinc-500">Step 2 of 3</p>
              </div>
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

        {showResult && outfit && budget && uploadedImage && (
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <BackButton onClick={() => setBudget(null)} />
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
                    Step 3 of 3
                  </p>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
                    {formatOutfitDirectionTitle(aiAnalysis?.outfitDirection) ??
                      outfit.title}
                  </h2>
                  <p className="mt-2 text-xs text-white/50">{outfit.imageLabel}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/[0.06] px-5 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Budget preference
                </p>
                <MiniPill>{BUDGET_LABELS[budget]}</MiniPill>
              </div>

              <div className="border-b border-white/[0.06] px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-400">{resultNote}</p>
              </div>

              <div className="px-5 py-5">
                {aiAnalysis && (
                  <div className="mb-4 space-y-2.5">
                    {aiAnalysis.reason && (
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {aiAnalysis.reason}
                      </p>
                    )}
                    <p className="text-[11px] leading-relaxed text-zinc-500">
                      <span className="uppercase tracking-[0.16em] text-zinc-600">
                        Direction:{" "}
                      </span>
                      <span className="font-medium text-zinc-300">
                        {formatOutfitDirectionLabel(resolvedOutfitDirection)}
                      </span>
                    </p>
                  </div>
                )}

                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                    Recommended pieces
                  </p>
                  <p className="text-[11px] text-zinc-600">{outfit.items.length} items</p>
                </div>

                <div className="space-y-2.5">
                  {outfit.items.map((item: OutfitItem, i: number) => (
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
                          <div>
                            <div>
                              {item.brand && (
                                <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                                  {item.brand}
                                </p>
                              )}

                              <p className="text-sm leading-snug text-zinc-100">{item.label}</p>
                            </div>
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
                            Shop piece →
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
                  <p className="mt-1.5 text-sm font-semibold text-zinc-100">Europe</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}