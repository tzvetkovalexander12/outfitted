"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { getProductsForCategories, type FitPreference } from "../../lib/products";
import {
  getProductStylistNote,
  getStylingContrastNote,
  getStylistDirection,
  getUpgradeMove,
} from "../../lib/resultCopy";

type Budget = "affordable" | "mid" | "premium";

type EventType =
  | "casual-day"
  | "dinner"
  | "party"
  | "work"
  | "vacation"
  | "date";

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
  id?: string;
  label: string;
  url: string;
  price: string;
  image: string;
  note?: string;
  brand?: string;
  category?: string;
}

interface Outfit {
  title: string;
  description: string;
  tagline: string;
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

/** Set to true when `public/products/sample-black-trousers.webp` exists. */
const USE_LOCAL_SAMPLE_IMAGE = false;
const SAMPLE_IMAGE = "/products/sample-black-trousers.webp";
const SAMPLE_IMAGE_REMOTE =
  "https://image.hm.com/assets/hm/39/96/39966692dce4819fd2cb12b0f53e2edc41b69b40.jpg?imwidth=1260";

function getSampleAnalysis(
  eventType?: EventType | null,
  fitPreference?: FitPreference | null,
  _budget?: Budget | null
): AIAnalysis {
  const base: Pick<AIAnalysis, "itemType" | "mainColor" | "style"> = {
    itemType: "tailored trousers",
    mainColor: "black",
    style: "wide-leg, clean, smart-casual",
  };

  if ((eventType === "dinner" || eventType === "date") && fitPreference === "clean") {
    return {
      ...base,
      outfitDirection: "evening polished",
      recommendedPieces: ["oxford shirt", "blazer", "loafers"],
      reason:
        "Your black tailored trousers already create a polished base. A clean shirt, blazer, and loafers build a sharper dinner outfit that looks refined without feeling overdone.",
    };
  }

  if ((eventType === "dinner" || eventType === "date") && fitPreference === "relaxed") {
    return {
      ...base,
      outfitDirection: "smart casual",
      recommendedPieces: ["oxford shirt", "loafers", "minimal accessory"],
      reason:
        "Your black tailored trousers give the outfit structure. A clean shirt and loafers keep it smart, while a minimal accessory adds a small finishing detail.",
    };
  }

  if (eventType === "party" && fitPreference === "baggy") {
    return {
      ...base,
      outfitDirection: "evening polished",
      recommendedPieces: ["black t-shirt", "blazer", "chelsea boots"],
      reason:
        "Your black tailored trousers create a sharp base for a night out. A black tee, blazer, and dark shoes keep the look confident and more evening-ready.",
    };
  }

  if (eventType === "work") {
    return {
      ...base,
      outfitDirection: "smart casual",
      recommendedPieces: ["oxford shirt", "blazer", "loafers"],
      reason:
        "Your black tailored trousers are already work-appropriate. A clean shirt, blazer, and smart shoes keep the outfit sharp, simple, and professional.",
    };
  }

  if (eventType === "vacation") {
    return {
      ...base,
      outfitDirection: "casual clean",
      recommendedPieces: ["white t-shirt", "overshirt", "white sneakers"],
      reason:
        "Your black tailored trousers can still work casually. A white tee, light layer, and white sneakers make the outfit relaxed and travel-friendly.",
    };
  }

  return {
    ...base,
    outfitDirection: "casual clean",
    recommendedPieces: ["white t-shirt", "overshirt", "white sneakers"],
    reason:
      "Your black tailored trousers are a strong base for casual day wear. A white tee adds contrast, an overshirt keeps it relaxed, and white sneakers make it easy to wear.",
  };
}

const OUTFITS: OutfitMap = {
  affordable: {
    title: "Easy Everyday Match",
    tagline: "Relaxed, clean, hard to get wrong.",
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
    tagline: "A little sharper, still effortless.",
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
    tagline: "Subtle, sharp, elevated.",
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

// TODO:
// Future real-life constraints to test after validation:
// - weather
// - dress code
// - comfort level
// - already-owned shoes/bottoms
// - before-buying use case
const EVENT_OPTIONS: {
  value: EventType;
  label: string;
  sub: string;
  accent: string;
  dot: string;
}[] = [
  {
    value: "casual-day",
    label: "Casual day",
    sub: "Easy everyday outfit.",
    accent: "hover:border-stone-500/40 hover:bg-stone-900/30",
    dot: "bg-stone-400",
  },
  {
    value: "dinner",
    label: "Dinner",
    sub: "Clean, polished, not too much.",
    accent: "hover:border-slate-500/40 hover:bg-slate-900/30",
    dot: "bg-slate-400",
  },
  {
    value: "party",
    label: "Party",
    sub: "Sharper, social, more standout.",
    accent: "hover:border-fuchsia-600/40 hover:bg-fuchsia-950/20",
    dot: "bg-fuchsia-400",
  },
  {
    value: "work",
    label: "Work",
    sub: "Smart, clean, appropriate.",
    accent: "hover:border-zinc-500/40 hover:bg-zinc-900/30",
    dot: "bg-zinc-400",
  },
  {
    value: "vacation",
    label: "Vacation",
    sub: "Relaxed, practical, still stylish.",
    accent: "hover:border-cyan-500/40 hover:bg-cyan-950/20",
    dot: "bg-cyan-400",
  },
  {
    value: "date",
    label: "Date",
    sub: "Intentional, confident, balanced.",
    accent: "hover:border-rose-500/40 hover:bg-rose-950/20",
    dot: "bg-rose-400",
  },
];

const FIT_OPTIONS: {
  value: FitPreference;
  label: string;
  sub: string;
  accent: string;
  dot: string;
}[] = [
  {
    value: "clean",
    label: "Clean",
    sub: "Sharper and more put-together",
    accent: "hover:border-slate-500/40 hover:bg-slate-900/30",
    dot: "bg-slate-400",
  },
  {
    value: "relaxed",
    label: "Relaxed",
    sub: "Easy fit, still intentional",
    accent: "hover:border-stone-500/40 hover:bg-stone-900/30",
    dot: "bg-stone-400",
  },
  {
    value: "baggy",
    label: "Baggy",
    sub: "Looser, wider, more streetwear",
    accent: "hover:border-fuchsia-600/40 hover:bg-fuchsia-950/20",
    dot: "bg-fuchsia-400",
  },
];

const EVENT_LABELS: Record<EventType, string> = {
  "casual-day": "Casual day",
  dinner: "Dinner",
  party: "Party",
  work: "Work",
  vacation: "Vacation",
  date: "Date",
};

const FIT_LABELS: Record<FitPreference, string> = {
  clean: "Clean",
  relaxed: "Relaxed",
  baggy: "Baggy",
};

const ANALYZING_MESSAGES = [
  "Reading your item...",
  "Detecting colour and shape...",
  "Matching occasion and fit...",
  "Finding pieces that work...",
  "Building your outfit...",
] as const;

function getAllowedBudgets(_fitPreference: FitPreference | null): Budget[] {
  return ["affordable", "mid", "premium"];
}

function buildResultNote(budget: Budget) {
  if (budget === "affordable") {
    return "Built around your item and where you're wearing it — tuned to an affordable budget.";
  }
  if (budget === "mid") {
    return "Built around your item and where you're wearing it — tuned to a mid-range budget.";
  }
  return "Built around your item and where you're wearing it — tuned to a premium budget.";
}

/**
 * Rich title when AI returns `outfitDirection`; falls back to budget-based `outfit.title`.
 * Keeps "Easy refined casual" for relaxed casual-day/vacation — not for date/dinner sharpening.
 */
function resolveOutfitResultTitle(
  directionRaw: string | undefined | null,
  eventType: EventType | null,
  fitPreference: FitPreference | null,
  budget: Budget,
  itemType: string | undefined | null
): string | null {
  if (directionRaw == null || String(directionRaw).trim() === "") return null;

  const direction = normalizeOutfitDirection(directionRaw);
  const occ = eventType;
  const f = fitPreference;
  const item = (itemType ?? "").toLowerCase();

  if (!occ || !f) return null;

  const isHoodie = item.includes("hoodie") || item.includes("sweatshirt");
  const isWhiteTee =
    !isHoodie &&
    ((item.includes("white") &&
      (item.includes("t-shirt") || item.includes("tee") || item.includes("tshirt"))) ||
      item.includes("white t-shirt"));
  const isBlueJeans =
    item.includes("blue jeans") ||
    (item.includes("jean") &&
      (item.includes("blue") || item.includes("indigo") || item.includes("light wash")));

  if (occ === "date" && f === "clean" && isBlueJeans) {
    return budget === "premium" ? "Sharp casual date" : "Clean date-night casual";
  }

  if (occ === "dinner" && f === "clean" && budget === "premium") {
    if (isWhiteTee) return "Polished T-shirt dinner";
    return "Elevated evening casual";
  }

  if (occ === "dinner" && f === "clean" && budget === "mid") {
    if (isWhiteTee) return "Refined off-duty dinner";
    return "Refined dinner look";
  }

  if (isHoodie && occ === "date") {
    return "Clean date-night casual";
  }

  if (isHoodie && occ === "dinner") {
    return "Relaxed-sharp casual";
  }

  if (occ === "date") {
    if (direction === "evening polished") return "Polished casual date";
    if (direction === "smart casual") return "Sharp casual date";
    if (f === "clean") return "Clean date look";
    return "Clean date-night casual";
  }

  if (occ === "dinner") {
    if (f === "clean") return "Polished dinner base";
    if (direction === "evening polished") return "Refined dinner look";
    return "Clean evening fit";
  }

  if (occ === "party") {
    return direction === "evening polished" ? "Clean evening fit" : "Sharp night-out fit";
  }

  if (occ === "work") {
    return direction === "evening polished" ? "Polished work look" : "Smart work casual";
  }

  if (occ === "vacation") {
    if (direction === "casual clean") return "Easy vacation casual";
    return "Easy refined casual";
  }

  if (direction === "casual clean") {
    return "Clean casual base";
  }

  if (direction === "evening polished") {
    return "Polished off-duty";
  }

  if (direction === "smart casual") {
    if (occ === "casual-day") {
      return "Easy refined casual";
    }
    return "Refined everyday match";
  }

  return null;
}

function buildOutfitFormula(
  aiAnalysis: AIAnalysis | null,
  eventType: EventType | null,
  fitPreference: FitPreference | null
): string {
  const direction = normalizeOutfitDirection(aiAnalysis?.outfitDirection);
  const pieces = (aiAnalysis?.recommendedPieces ?? []).map((p) => p.toLowerCase());
  const isSampleTrousers = (aiAnalysis?.itemType ?? "").toLowerCase().includes("tailored trousers");

  if (isSampleTrousers && direction === "casual clean") {
    return "Structured trousers with a clean tee, relaxed layer, and light shoes.";
  }
  if (isSampleTrousers && direction === "smart casual") {
    return "Structured trousers with a clean shirt and smart shoes.";
  }
  if (isSampleTrousers && direction === "evening polished") {
    return "A tailored base with a crisp shirt, polished layer, and refined shoes.";
  }

  if (direction === "evening polished") {
    if (pieces.includes("chelsea boots")) {
      return "A dark base with a sharp layer and confident finish.";
    }
    return "A structured base with a crisp shirt and polished shoes.";
  }

  if (direction === "smart casual") {
    if (eventType === "work") return "A structured base with a clean shirt and smart shoes.";
    return "A structured base with a crisp shirt and polished shoes.";
  }

  if (eventType === "vacation") return "An easy base with a practical layer and comfortable shoes.";
  if (fitPreference === "clean") return "A clean base with a simple layer and quiet finish.";
  return "A clean base with a relaxed layer and light shoes.";
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

function ProgressBar({
  step,
  isResult,
}: {
  step: number;
  isResult: boolean;
}) {
  const percent = isResult ? 100 : Math.round((step / 5) * 100);

  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center justify-between">
        <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-zinc-600">
          {isResult ? "Your result" : `Step ${step} of 4 + result`}
        </p>
        <p className="text-[11px] text-zinc-600">{percent}%</p>
      </div>

      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
              isResult || s <= step
                ? s === 5
                  ? "bg-zinc-300"
                  : "bg-white"
                : s === 5
                  ? "bg-zinc-600/40"
                  : "bg-white/10"
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
    <div
      className={`group/image relative h-48 w-32 shrink-0 overflow-hidden rounded-l-[20px] border-r border-white/[0.08] bg-gradient-to-br ${accent} sm:h-52 sm:w-36`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-800/10 via-zinc-950/40 to-zinc-950/72" />
      <img
        src={src}
        alt={alt}
        className="relative z-10 h-full w-full object-contain p-4 transition-transform duration-300 ease-out group-hover/image:scale-[1.03] sm:p-5"
      />
    </div>
  );
}

function toCategoryLabel(rawCategory?: string): string | null {
  if (!rawCategory) return null;
  if (rawCategory === "minimal accessory") return "Quiet detail";
  if (rawCategory === "tailored trousers") return "Sharper lower half";
  if (rawCategory === "black jeans" || rawCategory === "blue jeans") return "Polished base";
  if (rawCategory === "chelsea boots" || rawCategory === "loafers") return "Smarter shoe";
  if (rawCategory === "white sneakers" || rawCategory === "black sneakers") return "Clean foundation";
  if (rawCategory === "overshirt" || rawCategory === "blazer") return "Relaxed layer";
  return "Finishing touch";
}

function OutfitFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDev = process.env.NODE_ENV === "development";
  const devLog = (label: string, durationMs?: number) => {
    if (!isDev) return;
    if (typeof durationMs === "number") {
      console.log(`[outfit] ${label}: ${durationMs}ms`);
      return;
    }
    console.log(`[outfit] ${label}`);
  };

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSampleItem, setIsSampleItem] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadConfirmed, setUploadConfirmed] = useState(false);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [fitPreference, setFitPreference] = useState<FitPreference | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [analyzingMessageIndex, setAnalyzingMessageIndex] = useState(0);
  const [sampleSelectionSource, setSampleSelectionSource] = useState<
    "landing" | "upload_step" | null
  >(null);
  const trySampleClickedRef = useRef(false);
  const hasTrackedResultRef = useRef(false);
  const analyzeStartRef = useRef<number | null>(null);
  const budgetSelectStartRef = useRef<number | null>(null);
  const hasLoggedResultRenderRef = useRef(false);

  const aiRecommendedItems = (aiAnalysis?.recommendedPieces ?? []).slice(0, 3);
  const resolvedOutfitDirection = normalizeOutfitDirection(
    aiAnalysis?.outfitDirection
  );

  const dynamicItems = budget
    ? getProductsForCategories(aiRecommendedItems, budget, {
        uploadedItemType: aiAnalysis?.itemType,
        uploadedItemColor: aiAnalysis?.mainColor,
        occasion: eventType ?? undefined,
        fitPreference: fitPreference ?? undefined,
      })
    : [];

  const outfit =
    budget && dynamicItems.length > 0
      ? { ...OUTFITS[budget], items: dynamicItems }
      : budget
        ? OUTFITS[budget]
        : null;
  const showResult = Boolean(
    uploadConfirmed && uploadedImage && eventType && fitPreference && budget && outfit
  );

  useEffect(() => {
    return () => {
      if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  async function analyzeUploadedItem(
    file: File,
    selectedEventType: EventType | null,
    selectedFitPreference: FitPreference | null
  ) {
    const analyzeStart = Date.now();
    analyzeStartRef.current = analyzeStart;
    devLog("analyzeUploadedItem started");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("eventType", selectedEventType ?? "casual-day");
    formData.append("fitPreferenceType", selectedFitPreference ?? "relaxed");

    const apiRequestStart = Date.now();
    const res = await fetch("/api/analyze-item", {
      method: "POST",
      body: formData,
    });
    devLog("API response received", Date.now() - apiRequestStart);

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

    setAiAnalysis(data.analysis);
    devLog("result state set (aiAnalysis)", Date.now() - analyzeStart);
  }

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    setUploadedFile(file);
    setUploadedFileName(file.name);
    setIsSampleItem(false);
    setUploadConfirmed(false);
    setAiAnalysis(null);
    setEventType(null);
    setFitPreference(null);
    setBudget(null);
    setSampleSelectionSource(null);
    trySampleClickedRef.current = false;

    const preview = URL.createObjectURL(file);
    setUploadedImage(preview);
    track("upload_completed", { source: "user_upload" });
  }

  /** Preloads the sample image on Step 1; user confirms before occasion selection. */
  function preloadSampleItem(selectionSource: "landing" | "upload_step") {
    if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    setUploadedImage(USE_LOCAL_SAMPLE_IMAGE ? SAMPLE_IMAGE : SAMPLE_IMAGE_REMOTE);
    setUploadedFile(null);
    setUploadedFileName("Sample black trousers");
    setAiAnalysis(null);
    setIsSampleItem(true);
    setUploadConfirmed(false);
    setEventType(null);
    setFitPreference(null);
    setBudget(null);
    setSampleSelectionSource(selectionSource);
    trySampleClickedRef.current = false;
  }

  function handleTrySample() {
    preloadSampleItem("upload_step");
  }

  function handleConfirmStep1() {
    if (isSampleItem && !trySampleClickedRef.current) {
      trySampleClickedRef.current = true;
      track("try_sample_clicked", {
        source: sampleSelectionSource ?? "upload_step",
      });
    }
    setUploadConfirmed(true);
  }

  useEffect(() => {
    if (searchParams.get("sample") !== "true") {
      return;
    }

    if (
      uploadedImage !== null ||
      uploadConfirmed ||
      eventType ||
      fitPreference ||
      budget
    ) {
      router.replace("/outfit", { scroll: false });
      return;
    }

    preloadSampleItem("landing");
    router.replace("/outfit", { scroll: false });
  }, [
    budget,
    eventType,
    router,
    searchParams,
    uploadConfirmed,
    uploadedImage,
    fitPreference,
  ]);

  async function handleBudgetSelect(nextBudget: Budget) {
    if (isAnalyzing) return;
    const budgetSelectedAt = Date.now();
    budgetSelectStartRef.current = budgetSelectedAt;
    devLog(`budget selected (${nextBudget})`);

    if (isSampleItem) {
      setAiAnalysis(getSampleAnalysis(eventType, fitPreference, nextBudget));
      setBudget(nextBudget);
      devLog("result state set (sample path)", Date.now() - budgetSelectedAt);
      return;
    }

    if (!uploadedFile) {
      setBudget(nextBudget);
      devLog("budget set without upload", Date.now() - budgetSelectedAt);
      return;
    }

    setIsAnalyzing(true);
    try {
      await analyzeUploadedItem(uploadedFile, eventType, fitPreference);
      setBudget(nextBudget);
    } catch (err) {
      console.error(err);
      setBudget(nextBudget);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function resetAll() {
    if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    setUploadedImage(null);
    setUploadedFile(null);
    setUploadedFileName(null);
    setIsSampleItem(false);
    setIsAnalyzing(false);
    setUploadConfirmed(false);
    setEventType(null);
    setFitPreference(null);
    setBudget(null);
    setAiAnalysis(null);
    setSampleSelectionSource(null);
    trySampleClickedRef.current = false;
  }

  const stepNumber = !uploadedImage
    ? 1
    : !uploadConfirmed
      ? 1
      : !eventType
        ? 2
        : !fitPreference
          ? 3
          : !budget
            ? 4
            : 4;

  const selectedSummary = useMemo(
    () => ({
      upload: uploadedImage ? "Item uploaded" : null,
      event: eventType ? EVENT_LABELS[eventType] : null,
      fit: fitPreference ? FIT_LABELS[fitPreference] : null,
      budget: budget ? BUDGET_LABELS[budget] : null,
    }),
    [budget, eventType, uploadedImage, fitPreference]
  );

  const resultNote = budget ? buildResultNote(budget) : null;
  const outfitFormula = buildOutfitFormula(aiAnalysis, eventType, fitPreference);
  const allowedBudgets = getAllowedBudgets(fitPreference);
  const selectedCategories = (outfit?.items ?? []).map(
    (item, i) => item.category ?? aiRecommendedItems[i]
  );
  const stylistDirection = getStylistDirection({
    uploadedItemType: aiAnalysis?.itemType,
    uploadedItemColor: aiAnalysis?.mainColor,
    occasion: eventType ?? undefined,
    fitPreference: fitPreference ?? undefined,
    budget: budget ?? undefined,
    selectedCategories,
    aiReason: aiAnalysis?.reason,
  });
  const stylingContrastNote = getStylingContrastNote({
    uploadedItemType: aiAnalysis?.itemType,
    uploadedItemColor: aiAnalysis?.mainColor,
    occasion: eventType ?? undefined,
    fitPreference: fitPreference ?? undefined,
    budget: budget ?? undefined,
    selectedCategories,
  });
  const upgradeMove = getUpgradeMove({
    uploadedItemType: aiAnalysis?.itemType,
    uploadedItemColor: aiAnalysis?.mainColor,
    occasion: eventType ?? undefined,
    fitPreference: fitPreference ?? undefined,
    budget: budget ?? undefined,
    selectedCategories,
  });

  useEffect(() => {
    if (budget && !allowedBudgets.includes(budget)) {
      setBudget(null);
    }
  }, [allowedBudgets, budget]);

  useEffect(() => {
    if (!isAnalyzing) {
      setAnalyzingMessageIndex(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setAnalyzingMessageIndex((prev) => (prev + 1) % ANALYZING_MESSAGES.length);
    }, 1200);

    return () => window.clearInterval(intervalId);
  }, [isAnalyzing]);

  useEffect(() => {
    if (!showResult) {
      hasLoggedResultRenderRef.current = false;
      return;
    }
    if (hasLoggedResultRenderRef.current) return;

    if (budgetSelectStartRef.current) {
      devLog("result rendered from budget select", Date.now() - budgetSelectStartRef.current);
    } else {
      devLog("result rendered");
    }
    hasLoggedResultRenderRef.current = true;
  }, [showResult]);

  useEffect(() => {
    if (!showResult || !outfit || !eventType || !fitPreference || !budget) {
      hasTrackedResultRef.current = false;
      return;
    }

    if (hasTrackedResultRef.current) return;

    track("result_generated", {
      occasion: eventType,
      fitPreference,
      budget,
      uploadedItemType: aiAnalysis?.itemType ?? "unknown",
      productCount: outfit.items.length,
    });
    hasTrackedResultRef.current = true;
  }, [aiAnalysis?.itemType, budget, eventType, outfit, showResult, fitPreference]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_50%),linear-gradient(to_bottom,#0a0a0c,#111113_40%,#0a0a0c)] text-white">
      <div className="mx-auto max-w-md px-4 pb-20 pt-6 sm:px-5 sm:pt-8">
        <div className="mb-6 rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                FitAround
              </p>
              <h1 className="text-[2.1rem] font-bold leading-[1.02] tracking-tight sm:text-[2.5rem]">
                Upload one item.
                <br />
                <span className="text-zinc-400">Build the fit around it.</span>
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
                Start with a piece you own or want to buy, then tell FitAround where you need to wear it.
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-base shadow-lg shadow-black/20">
              ✦
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <MiniPill>Upload item</MiniPill>
            <MiniPill>Online matches</MiniPill>
            <MiniPill>4 steps</MiniPill>
          </div>
        </div>

        <ProgressBar step={stepNumber} isResult={showResult} />

        {(selectedSummary.budget ||
          selectedSummary.upload ||
          selectedSummary.event ||
          selectedSummary.fit) &&
          !showResult && (
            <div className="mb-5 flex flex-wrap gap-2">
              {selectedSummary.upload && <MiniPill>{selectedSummary.upload}</MiniPill>}
              {selectedSummary.event && <MiniPill>{selectedSummary.event}</MiniPill>}
              {selectedSummary.fit && <MiniPill>{selectedSummary.fit}</MiniPill>}
              {selectedSummary.budget && <MiniPill>{selectedSummary.budget}</MiniPill>}
            </div>
          )}

        {!uploadedImage && (
          <section className="space-y-3">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold tracking-tight">Upload your item.</h2>
              <p className="mt-1.5 text-sm text-zinc-500">Step 1 of 4</p>
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

            <p className="text-center text-xs text-zinc-500">
              Photos are only used to generate your outfit recommendation.
            </p>
            <p className="text-center text-xs leading-relaxed text-zinc-500">
              No account needed. Try a sample first if you don&apos;t want to upload yet.
            </p>
            <button
              type="button"
              onClick={handleTrySample}
              className="w-full rounded-[16px] border border-white/20 bg-white/[0.07] px-4 py-3.5 text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
            >
              Try a sample item
            </button>
            <p className="-mt-1 text-center text-xs text-zinc-500">
              Not ready to upload? See an example result first.
            </p>

            <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">Example match</p>
              <p className="mt-2 text-sm font-medium text-zinc-200">
                Black trousers → white tee + overshirt + white sneakers
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                Choose an event and fit to make the result more specific.
              </p>
            </div>
          </section>
        )}

        {uploadedImage && !uploadConfirmed && (
          <section className="space-y-3">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold tracking-tight">Confirm upload.</h2>
              <p className="mt-1.5 text-sm text-zinc-500">Step 1 of 4</p>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03]">
              <div
                className={`relative bg-zinc-950 ${isSampleItem ? "h-72 sm:h-80" : "h-60"}`}
              >
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
                    type="button"
                    onClick={handleConfirmStep1}
                    className="rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-100"
                  >
                    {isSampleItem ? "Continue with this item" : "Looks good → continue"}
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

        {uploadConfirmed && !eventType && (
          <section className="space-y-3">
            <div className="mb-5 flex items-start gap-4">
              <BackButton onClick={() => setUploadConfirmed(false)} />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Where are you wearing it?</h2>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Pick the situation so the outfit feels right for real life, not just good in theory.
                </p>
                <p className="mt-1 text-sm text-zinc-500">Step 2 of 4</p>
              </div>
            </div>

            {EVENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEventType(opt.value)}
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

        {uploadConfirmed && eventType && !fitPreference && (
          <section className="space-y-3">
            <div className="mb-5 flex items-start gap-4">
              <BackButton onClick={() => setEventType(null)} />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Choose the fit</h2>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Pick the silhouette so the outfit matches how you actually like clothes to fit.
                </p>
                <p className="mt-1 text-sm text-zinc-500">Step 3 of 4</p>
              </div>
            </div>

            {FIT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFitPreference(opt.value)}
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

        {uploadConfirmed && eventType && fitPreference && !budget && (
          <section className="space-y-3">
            <div className="mb-5 flex items-start gap-4">
              <BackButton onClick={() => setFitPreference(null)} />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Pick budget.</h2>
                <p className="mt-0.5 text-sm text-zinc-500">Step 4 of 4</p>
              </div>
            </div>

            {isAnalyzing && (
              <div className="rounded-[24px] border border-white/20 bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-transparent px-5 py-5 shadow-lg shadow-black/30">
                <p className="flex items-center gap-2.5 text-base font-semibold text-white">
                  <span className="inline-flex h-5 w-5 items-center justify-center">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white/80 border-t-transparent animate-spin" />
                  </span>
                  Building your outfit...
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Analyzing your item, occasion, fit, and budget.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {ANALYZING_MESSAGES[analyzingMessageIndex]}
                </p>
              </div>
            )}

            {BUDGET_OPTIONS.filter((opt) => allowedBudgets.includes(opt.value)).map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleBudgetSelect(opt.value)}
                disabled={isAnalyzing}
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
                    {isAnalyzing ? "Analyzing..." : "Select →"}
                  </span>
                </div>
              </button>
            ))}
          </section>
        )}

        {showResult && outfit && budget && uploadedImage && eventType && fitPreference && (
          <section className="pt-2">
            <div className="mb-6 flex items-center justify-between gap-3">
              <BackButton onClick={() => setBudget(null)} />
              <button
                onClick={resetAll}
                className="inline-flex rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100"
              >
                Start over
              </button>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/40 backdrop-blur">
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${outfit.accent}`}>
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
                    Step 5 of 5
                  </p>
                  <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.15rem]">
                    {resolveOutfitResultTitle(
                      aiAnalysis?.outfitDirection,
                      eventType,
                      fitPreference,
                      budget,
                      aiAnalysis?.itemType
                    ) ?? outfit.title}
                  </h2>
                  <p className="mt-2 text-xs text-white/50">{outfit.imageLabel}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/[0.06] px-5 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Selections
                </p>
                <MiniPill>{EVENT_LABELS[eventType]}</MiniPill>
                <MiniPill>{FIT_LABELS[fitPreference]}</MiniPill>
                <MiniPill>{BUDGET_LABELS[budget]}</MiniPill>
              </div>

              <div className="border-b border-white/[0.06] px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-400">{resultNote}</p>
              </div>

              <div className="space-y-6 px-5 py-7">
                <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.05] px-5 py-5 shadow-inner shadow-black/20">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                    Stylist direction
                  </p>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-zinc-100">
                    {stylistDirection}
                  </p>
                </div>

                {stylingContrastNote && (
                  <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] px-5 py-4.5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                      Why this direction?
                    </p>
                    <p className="mt-2.5 whitespace-pre-line text-sm leading-7 text-zinc-300">
                      {stylingContrastNote}
                    </p>
                  </div>
                )}

                <p className="text-[11px] leading-relaxed text-zinc-600">
                  {outfitFormula}
                </p>

                <div className="pt-1">
                  <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                    Pieces that complete the look
                  </p>
                  <p className="text-[11px] text-zinc-600">{outfit.items.length} items</p>
                  </div>
                  <p className="mb-5 text-xs leading-relaxed text-zinc-500">
                    Styled for your occasion, fit, and budget — picked to work in real life, not just on a moodboard.
                  </p>
                </div>

                <div className="space-y-5">
                  {outfit.items.map((item: OutfitItem, i: number) => (
                    <div
                      key={i}
                      className="group overflow-hidden rounded-[20px] border border-white/[0.07] bg-zinc-950/55 transition duration-200 hover:border-white/[0.14]"
                    >
                      <div className="flex">
                        <ProductImage
                          src={item.image}
                          alt={item.label}
                          accent={outfit.accentSolid}
                        />

                        <div className="min-w-0 flex-1 p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-3.5">
                            <div className="space-y-1.5">
                              {item.brand && (
                                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                                  {item.brand}
                                </p>
                              )}
                              <p className="text-sm leading-6 text-zinc-100">{item.label}</p>
                            </div>
                          </div>

                          {toCategoryLabel(item.category ?? aiRecommendedItems[i]) && (
                            <p className="mt-3.5 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-300">
                              {toCategoryLabel(item.category ?? aiRecommendedItems[i])}
                            </p>
                          )}

                          <div className="mt-4.5 rounded-[14px] border border-white/[0.08] bg-white/[0.035] px-4 py-4">
                            <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                              Why this works
                            </p>
                            <p className="mt-2.5 whitespace-pre-line text-sm leading-7 text-zinc-200">
                              {getProductStylistNote({
                                productName: item.label,
                                brand: item.brand,
                                category: item.category ?? aiRecommendedItems[i],
                                uploadedItemType: aiAnalysis?.itemType,
                                uploadedItemColor: aiAnalysis?.mainColor,
                                occasion: eventType,
                                fitPreference,
                                budget,
                                selectedCategories,
                                productNote: item.note,
                              })}
                            </p>
                          </div>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() =>
                              track("shop_piece_clicked", {
                                productId: item.id ?? "unknown",
                                productName: item.label,
                                brand: item.brand ?? "unknown",
                                category: item.category ?? aiRecommendedItems[i] ?? "unknown",
                                occasion: eventType,
                                fitPreference,
                                budget,
                              })
                            }
                            className="mt-4.5 inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-zinc-200 transition-all duration-200 hover:scale-[1.03] hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                          >
                            View piece →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {upgradeMove && (
                  <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.025] px-5 py-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Upgrade move</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{upgradeMove}</p>
                    {aiAnalysis && (
                      <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                        <span className="uppercase tracking-[0.14em] text-zinc-600">Direction: </span>
                        <span className="font-medium text-zinc-300">
                          {formatOutfitDirectionLabel(resolvedOutfitDirection)}
                        </span>
                      </p>
                    )}
                  </div>
                )}

                <p className="pt-1 text-[11px] leading-relaxed text-zinc-600">
                  Some product links may be{" "}
                  <Link href="/affiliate-disclosure" className="underline decoration-zinc-700/70 hover:text-zinc-400">
                    affiliate links
                  </Link>
                  . This helps keep FitAround free.
                </p>
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

      <footer className="mx-auto max-w-md border-t border-white/[0.08] px-4 pb-10 pt-10 sm:px-5">
        <nav
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-zinc-600"
          aria-label="Legal and contact"
        >
          <Link href="/about" className="transition hover:text-zinc-400">
            About
          </Link>
          <Link href="/privacy" className="transition hover:text-zinc-400">
            Privacy
          </Link>
          <Link href="/affiliate-disclosure" className="transition hover:text-zinc-400">
            Affiliate Disclosure
          </Link>
          <Link href="/contact" className="transition hover:text-zinc-400">
            Contact
          </Link>
        </nav>
        <p className="mt-4 text-center text-[11px] text-zinc-700">© 2026 FitAround</p>
      </footer>
    </main>
  );
}

export default function OutfitPage() {
  return (
    <Suspense
      fallback={<main className="min-h-screen bg-[#09090b]" aria-hidden />}
    >
      <OutfitFlow />
    </Suspense>
  );
}