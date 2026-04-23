"use client";

import { useMemo, useState } from "react";

type DateType = "coffee" | "dinner" | "drinks";
type Budget = "affordable" | "mid" | "premium";
type Country = "UK" | "Germany" | "France";
type DeliverySpeed = "3days" | "1week" | "2weeks";
type AnchorItemType =
  | "white-tee"
  | "black-jeans"
  | "white-sneakers"
  | "oxford-shirt"
  | "overshirt";

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
  imageLabel: string;
  items: OutfitItem[];
}

type OutfitMap = {
  [D in DateType]: {
    [B in Budget]: Outfit;
  };
};

const PLACEHOLDER_IMAGE = "/products/uniqlo-white-tee.jpg";

const OUTFITS: OutfitMap = {
  coffee: {
    affordable: {
      title: "Easy Day Match",
      vibe: "Relaxed, clean, and hard to get wrong.",
      estimatedTotal: "~€50 total",
      accent: "from-stone-200 via-zinc-300 to-zinc-500",
      imageLabel: "Soft neutrals · simple layers · easy daytime look",
      description:
        "A light, relaxed combination that makes one existing item feel intentional instead of random.",
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
          note: "Keeps the palette relaxed",
        },
        {
          label: "VL Court Base Shoes",
          brand: "adidas",
          url: "https://www.adidas.co.uk/vl-court-base-shoes/JI1776.html",
          price: "€10+",
          image: PLACEHOLDER_IMAGE,
          note: "Simple, easy finish",
        },
      ],
    },
    mid: {
      title: "Refined Casual Match",
      vibe: "A little sharper, still effortless.",
      estimatedTotal: "~€175 total",
      accent: "from-neutral-100 via-stone-300 to-stone-500",
      imageLabel: "Elevated basics · clean tones · stronger fit",
      description:
        "Better fabrics and cleaner proportions make the anchor item feel more deliberate.",
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
      vibe: "Subtle, sharp, expensive-looking without being loud.",
      estimatedTotal: "~€520 total",
      accent: "from-amber-100 via-stone-300 to-neutral-700",
      imageLabel: "Refined texture · premium denim · soft structure",
      description:
        "The anchor piece stays central, while the rest of the outfit upgrades the whole impression.",
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
          note: "Strong finishing piece",
        },
      ],
    },
  },
  dinner: {
    affordable: {
      title: "Dinner-Ready Match",
      vibe: "Clean, structured, and reliable.",
      estimatedTotal: "~€90 total",
      accent: "from-slate-200 via-slate-400 to-slate-700",
      imageLabel: "Sharper pieces · darker tones · easy polish",
      description:
        "This builds a more structured outfit around your item without feeling overdressed.",
      items: [
        {
          label: "White regular fit Oxford shirt",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1013956002.html",
          price: "€25",
          image: PLACEHOLDER_IMAGE,
          note: "Clean structure",
        },
        {
          label: "Dark blue slim fit cotton chinos",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1311240004.html",
          price: "€30",
          image: PLACEHOLDER_IMAGE,
          note: "Keeps it balanced",
        },
        {
          label: "Black Derby shoes",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1261294001.html",
          price: "€35",
          image: PLACEHOLDER_IMAGE,
          note: "Simple dress finish",
        },
      ],
    },
    mid: {
      title: "Modern Dinner Match",
      vibe: "Tailored but not stiff.",
      estimatedTotal: "~€270 total",
      accent: "from-zinc-200 via-zinc-500 to-zinc-900",
      imageLabel: "Merino texture · charcoal tailoring · evening balance",
      description:
        "A sharper silhouette that supports your item instead of competing with it.",
      items: [
        {
          label: "Slim-fit merino wool polo shirt",
          brand: "Massimo Dutti",
          url: "https://www.massimodutti.com/gb/men/knitwear/polo-shirts/slim-fit-merino-wool-polo-shirt-l00916425",
          price: "€70",
          image: PLACEHOLDER_IMAGE,
          note: "Softer than a shirt",
        },
        {
          label: "Slim tapered wool-blend trousers in charcoal",
          brand: "Reiss Belief",
          url: "https://www.reiss.com/p/slim-tapered-wool-blend-trousers-belief-charcoal-23803021",
          price: "€80",
          image: PLACEHOLDER_IMAGE,
          note: "Strong shape",
        },
        {
          label: "Leather monk-strap shoes",
          brand: "Massimo Dutti",
          url: "https://www.massimodutti.com/gb/men/shoes/formal-shoes/leather-monk-strap-shoes-l16308531",
          price: "€75",
          image: PLACEHOLDER_IMAGE,
          note: "Adds character",
        },
        {
          label: "Unstructured wool blazer in charcoal",
          brand: "ARKET",
          url: "https://www.arket.com/en-gb/men/blazers/product.unstructured-wool-blazer-charcoal.1228290001.html",
          price: "€110",
          image: PLACEHOLDER_IMAGE,
          note: "Fast polish",
        },
      ],
    },
    premium: {
      title: "Editorial Dinner Match",
      vibe: "Sharp enough to turn heads, still controlled.",
      estimatedTotal: "~€680 total",
      accent: "from-neutral-300 via-stone-500 to-black",
      imageLabel: "Evening tailoring · darker palette · clean luxury",
      description:
        "This is the dressed-up version: stronger lines, richer textures, and more evening presence.",
      items: [
        {
          label: "Relaxed black silk-blend shirt",
          brand: "Sandro Paris",
          url: "https://www.sandro-paris.com/en-gb/man/tops/shirts/silk-blend-relaxed-shirt-SHPCM01006.html",
          price: "€190",
          image: PLACEHOLDER_IMAGE,
          note: "Soft texture, higher impact",
        },
        {
          label: "Tordon tailored wool trousers",
          brand: "Tiger of Sweden",
          url: "https://www.tigerofsweden.com/gb/men/trousers-and-shorts/trousers/tordon-trousers-T65994001.html",
          price: "€170",
          image: PLACEHOLDER_IMAGE,
          note: "Tailored anchor",
        },
        {
          label: "Audley black calf Oxfords",
          brand: "Crockett & Jones",
          url: "https://www.crockett-jones.com/products/audley-1-black-calf",
          price: "€220",
          image: PLACEHOLDER_IMAGE,
          note: "Serious finishing shoe",
        },
      ],
    },
  },
  drinks: {
    affordable: {
      title: "Night-Out Match",
      vibe: "Easy, dark, and direct.",
      estimatedTotal: "~€75 total",
      accent: "from-zinc-300 via-zinc-600 to-black",
      imageLabel: "Darker palette · clean layers · bar-ready finish",
      description:
        "Built to feel more social and night-ready without trying too hard.",
      items: [
        {
          label: "Black loose fit sweatshirt",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1308076013.html",
          price: "€25",
          image: PLACEHOLDER_IMAGE,
          note: "Relaxed top layer",
        },
        {
          label: "Straight leg black jeans",
          brand: "Levi's 501",
          url: "https://www.levi.com/GB/en_GB/clothing/men/jeans/straight/501-original-fit-mens-jeans/p/005010165",
          price: "€35",
          image: PLACEHOLDER_IMAGE,
          note: "Reliable dark base",
        },
        {
          label: "Black low-profile trainers",
          brand: "ASOS DESIGN",
          url: "https://www.asos.com/asos-design/asos-design-trainers-in-black/prd/200732344",
          price: "€15+",
          image: PLACEHOLDER_IMAGE,
          note: "Simple finish",
        },
      ],
    },
    mid: {
      title: "Sharp Night Match",
      vibe: "More intentional, still relaxed.",
      estimatedTotal: "~€240 total",
      accent: "from-emerald-200 via-zinc-600 to-black",
      imageLabel: "Dark overshirt · tailored contrast · cool finish",
      description:
        "This version adds more shape and confidence without losing the relaxed energy.",
      items: [
        {
          label: "Dark olive brushed cotton overshirt",
          brand: "COS",
          url: "https://www.cos.com/en-gb/men/shirts/overshirts/product.relaxed-fit-overshirt-dark-green.1228294001.html",
          price: "€75",
          image: PLACEHOLDER_IMAGE,
          note: "Adds structure fast",
        },
        {
          label: "Slim tapered trousers in black",
          brand: "Reiss Belief",
          url: "https://www.reiss.com/p/slim-tapered-trousers-belief-black-23803020",
          price: "€80",
          image: PLACEHOLDER_IMAGE,
          note: "Smarter silhouette",
        },
        {
          label: "Leather loafers with track sole",
          brand: "Massimo Dutti",
          url: "https://www.massimodutti.com/gb/men/shoes/loafers/leather-loafers-with-track-sole-l16203527",
          price: "€85",
          image: PLACEHOLDER_IMAGE,
          note: "Dressy with edge",
        },
      ],
    },
    premium: {
      title: "Polished Edge Match",
      vibe: "Dark, controlled, immaculate.",
      estimatedTotal: "~€590 total",
      accent: "from-zinc-200 via-zinc-700 to-zinc-950",
      imageLabel: "Architectural dark tones · strong silhouette · quiet statement",
      description:
        "A premium night-out version built around sharper contrast and more deliberate finishing pieces.",
      items: [
        {
          label: "Slim-fit merino roll-neck knit",
          brand: "Johnstons of Elgin",
          url: "https://www.johnstons.com/en-gb/mens/knitwear/roll-neck/slim-fit-merino-roll-neck-KAA01988HA73.html",
          price: "€180",
          image: PLACEHOLDER_IMAGE,
          note: "Sharp evening layer",
        },
        {
          label: "Slim tailored trousers",
          brand: "Sandro",
          url: "https://www.sandro-paris.com/en-gb/man/trousers-and-shorts/trousers/slim-tailored-trousers-SHPPA00632.html",
          price: "€160",
          image: PLACEHOLDER_IMAGE,
          note: "Clean line",
        },
        {
          label: "Black Chelsea boots",
          brand: "Ted Baker",
          url: "https://www.tedbaker.com/uk/mens/shoes-and-boots/chelsea-boots/chelsea-boot-black-275880",
          price: "€140",
          image: PLACEHOLDER_IMAGE,
          note: "Strong silhouette",
        },
      ],
    },
  },
};

const DATE_OPTIONS = [
  { value: "coffee" as DateType, label: "Coffee Date", sub: "Casual, daytime, relaxed." },
  { value: "dinner" as DateType, label: "Dinner Date", sub: "Sharper, more polished, evening." },
  { value: "drinks" as DateType, label: "Drinks Date", sub: "Stylish, social, slightly more edge." },
];

const BUDGET_OPTIONS = [
  { value: "affordable" as Budget, label: "Affordable", sub: "Best value, still looks intentional." },
  { value: "mid" as Budget, label: "Mid-Range", sub: "Better fabrics, stronger overall look." },
  { value: "premium" as Budget, label: "Premium", sub: "Higher-end, more elevated choices." },
];

const COUNTRY_OPTIONS: Country[] = ["UK", "Germany", "France"];

const DELIVERY_OPTIONS = [
  { value: "3days" as DeliverySpeed, label: "In 3 days", sub: "Need express delivery options." },
  { value: "1week" as DeliverySpeed, label: "In 1 week", sub: "Standard delivery is fine." },
  { value: "2weeks" as DeliverySpeed, label: "In 2+ weeks", sub: "Plenty of time, no rush." },
];

const ANCHOR_OPTIONS = [
  {
    value: "white-tee" as AnchorItemType,
    label: "White T-shirt",
    sub: "A clean base that works with almost anything.",
  },
  {
    value: "black-jeans" as AnchorItemType,
    label: "Black Jeans",
    sub: "Easy anchor for darker and sharper looks.",
  },
  {
    value: "white-sneakers" as AnchorItemType,
    label: "White Sneakers",
    sub: "Lightens the whole outfit immediately.",
  },
  {
    value: "oxford-shirt" as AnchorItemType,
    label: "Oxford Shirt",
    sub: "Sharper starting point for cleaner outfits.",
  },
  {
    value: "overshirt" as AnchorItemType,
    label: "Overshirt",
    sub: "Adds structure fast and changes the whole vibe.",
  },
];

const DELIVERY_LABELS: Record<DeliverySpeed, string> = {
  "3days": "In 3 days",
  "1week": "In 1 week",
  "2weeks": "In 2+ weeks",
};

const DATE_LABELS: Record<DateType, string> = {
  coffee: "Coffee Date",
  dinner: "Dinner Date",
  drinks: "Drinks Date",
};

const BUDGET_LABELS: Record<Budget, string> = {
  affordable: "Affordable",
  mid: "Mid-Range",
  premium: "Premium",
};

const ANCHOR_LABELS: Record<AnchorItemType, string> = {
  "white-tee": "White T-shirt",
  "black-jeans": "Black Jeans",
  "white-sneakers": "White Sneakers",
  "oxford-shirt": "Oxford Shirt",
  overshirt: "Overshirt",
};

function buildAnchorExplanation(
  anchorItem: AnchorItemType,
  dateType: DateType,
  budget: Budget
) {
  const map: Record<AnchorItemType, string> = {
    "white-tee":
      "A white tee is a neutral base, so the rest of the outfit should add shape and tone without making the look feel forced.",
    "black-jeans":
      "Black jeans already add edge and structure, so the best match is cleaner contrast and a controlled top half.",
    "white-sneakers":
      "White sneakers make an outfit feel lighter and more relaxed, so the surrounding pieces should stay clean and balanced.",
    "oxford-shirt":
      "An Oxford shirt already feels sharper, so the rest of the outfit should support that polish without becoming stiff.",
    overshirt:
      "An overshirt adds structure immediately, so the best match is simpler supporting pieces that keep the silhouette clean.",
  };

  return `${map[anchorItem]} For a ${DATE_LABELS[dateType].toLowerCase()} on a ${BUDGET_LABELS[
    budget
  ].toLowerCase()} budget, this gives you the easiest version of a coordinated look.`;
}

function StepCard({
  title,
  sub,
  onClick,
}: {
  title: string;
  sub?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-5 text-left transition duration-200 ease-out hover:scale-[1.035] hover:border-white/30 hover:bg-white/[0.07] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-white">{title}</p>
          {sub ? <p className="mt-1 text-sm leading-relaxed text-zinc-400">{sub}</p> : null}
        </div>

        <div className="mt-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition group-hover:border-white/20 group-hover:text-zinc-200">
          Select
        </div>
      </div>
    </button>
  );
}

function MiniPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
      {children}
    </span>
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
  const [dateType, setDateType] = useState<DateType | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [anchorItem, setAnchorItem] = useState<AnchorItemType | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [delivery, setDelivery] = useState<DeliverySpeed | null>(null);

  const outfit = dateType && budget ? OUTFITS[dateType][budget] : null;
  const showResult = Boolean(dateType && budget && anchorItem && country && delivery && outfit);

  function resetAll() {
    setDateType(null);
    setBudget(null);
    setAnchorItem(null);
    setCountry(null);
    setDelivery(null);
  }

  const stepNumber = !dateType
    ? 1
    : !budget
    ? 2
    : !anchorItem
    ? 3
    : !country
    ? 4
    : !delivery
    ? 5
    : 6;

  const selectedSummary = useMemo(() => {
    return {
      date: dateType ? DATE_LABELS[dateType] : null,
      budget: budget ? BUDGET_LABELS[budget] : null,
      anchor: anchorItem ? ANCHOR_LABELS[anchorItem] : null,
      country,
      delivery: delivery ? DELIVERY_LABELS[delivery] : null,
    };
  }, [dateType, budget, anchorItem, country, delivery]);

  const anchorExplanation =
    anchorItem && dateType && budget
      ? buildAnchorExplanation(anchorItem, dateType, budget)
      : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,#09090b,#111111_35%,#09090b)] text-white">
      <div className="mx-auto max-w-md px-4 pb-20 pt-6 sm:px-5 sm:pt-8">
        <div className="mb-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                Outfitted
              </p>
              <h1 className="text-[2.25rem] font-bold leading-[1.02] tracking-tight sm:text-[2.6rem]">
                Match one item.
                <br />
                Build the rest.
              </h1>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg shadow-lg shadow-black/20">
              ✦
            </div>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            Pick one item you already own. Get the rest of the outfit around it.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <MiniPill>One-item matching</MiniPill>
            <MiniPill>Fast decisions</MiniPill>
            <MiniPill>AI-ready direction</MiniPill>
          </div>
        </div>

        {stepNumber < 6 && (
          <div className="mb-7">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Step {stepNumber} of 5
              </p>

              <p className="text-xs text-zinc-500">
                {Math.round(((stepNumber - 1) / 5) * 100)}% complete
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    s < stepNumber
                      ? "bg-white"
                      : s === stepNumber
                      ? "bg-zinc-400"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {(selectedSummary.date ||
          selectedSummary.budget ||
          selectedSummary.anchor ||
          selectedSummary.country ||
          selectedSummary.delivery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedSummary.date ? <MiniPill>{selectedSummary.date}</MiniPill> : null}
            {selectedSummary.budget ? <MiniPill>{selectedSummary.budget}</MiniPill> : null}
            {selectedSummary.anchor ? <MiniPill>{selectedSummary.anchor}</MiniPill> : null}
            {selectedSummary.country ? <MiniPill>{selectedSummary.country}</MiniPill> : null}
            {selectedSummary.delivery ? <MiniPill>{selectedSummary.delivery}</MiniPill> : null}
          </div>
        )}

        {!dateType && (
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What kind of date is it?</h2>
              <p className="mt-2 text-sm text-zinc-400">The setting changes what feels right.</p>
            </div>

            <div className="flex flex-col gap-3">
              {DATE_OPTIONS.map((opt) => (
                <StepCard
                  key={opt.value}
                  title={opt.label}
                  sub={opt.sub}
                  onClick={() => setDateType(opt.value)}
                />
              ))}
            </div>
          </section>
        )}

        {dateType && !budget && (
          <section className="space-y-4">
            <button
              onClick={() => setDateType(null)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
            >
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What is your budget?</h2>
              <p className="mt-2 text-sm text-zinc-400">Pick the level you want the rest of the outfit to hit.</p>
            </div>

            <div className="flex flex-col gap-3">
              {BUDGET_OPTIONS.map((opt) => (
                <StepCard
                  key={opt.value}
                  title={opt.label}
                  sub={opt.sub}
                  onClick={() => setBudget(opt.value)}
                />
              ))}
            </div>
          </section>
        )}

        {dateType && budget && !anchorItem && (
          <section className="space-y-4">
            <button
              onClick={() => setBudget(null)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
            >
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What item do you already have?</h2>
              <p className="mt-2 text-sm text-zinc-400">Start with one piece. We will build the rest around it.</p>
            </div>

            <div className="flex flex-col gap-3">
              {ANCHOR_OPTIONS.map((opt) => (
                <StepCard
                  key={opt.value}
                  title={opt.label}
                  sub={opt.sub}
                  onClick={() => setAnchorItem(opt.value)}
                />
              ))}
            </div>
          </section>
        )}

        {dateType && budget && anchorItem && !country && (
          <section className="space-y-4">
            <button
              onClick={() => setAnchorItem(null)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
            >
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Where are you shopping from?</h2>
              <p className="mt-2 text-sm text-zinc-400">This helps keep the recommendation realistic.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {COUNTRY_OPTIONS.map((c) => (
                <StepCard key={c} title={c} onClick={() => setCountry(c)} />
              ))}
            </div>
          </section>
        )}

        {dateType && budget && anchorItem && country && !delivery && (
          <section className="space-y-4">
            <button
              onClick={() => setCountry(null)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
            >
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">When is the date?</h2>
              <p className="mt-2 text-sm text-zinc-400">Pick the timeline so the rest of the outfit feels realistic.</p>
            </div>

            <div className="flex flex-col gap-3">
              {DELIVERY_OPTIONS.map((opt) => (
                <StepCard
                  key={opt.value}
                  title={opt.label}
                  sub={opt.sub}
                  onClick={() => setDelivery(opt.value)}
                />
              ))}
            </div>
          </section>
        )}

        {showResult && outfit && country && delivery && dateType && budget && anchorItem && (
          <section>
            <div className="mb-5 flex items-center justify-between gap-3">
              <button
                onClick={() => setDelivery(null)}
                className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
              >
                Back
              </button>

              <button
                onClick={resetAll}
                className="inline-flex rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:scale-[1.04] hover:bg-zinc-200"
              >
                Start over
              </button>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur">
              <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${outfit.accent}`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -right-10 top-6 h-36 w-36 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-black/20 blur-2xl" />

                <div className="relative flex h-full flex-col justify-end p-6">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-white/70">
                    Built around your item
                  </p>
                  <h2 className="max-w-[14ch] text-3xl font-bold leading-[1] tracking-tight text-white">
                    {ANCHOR_LABELS[anchorItem]} Match
                  </h2>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/85">
                    {outfit.imageLabel}
                  </p>
                </div>
              </div>

              <div className="border-b border-white/10 px-5 py-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <MiniPill>{DATE_LABELS[dateType]}</MiniPill>
                  <MiniPill>{BUDGET_LABELS[budget]}</MiniPill>
                  <MiniPill>{ANCHOR_LABELS[anchorItem]}</MiniPill>
                  <MiniPill>{country}</MiniPill>
                  <MiniPill>{DELIVERY_LABELS[delivery]}</MiniPill>
                </div>

                <p className="text-base italic leading-relaxed text-zinc-300">
                  Built to work cleanly around your {ANCHOR_LABELS[anchorItem].toLowerCase()}.
                </p>

                <div className="mt-4 inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Estimated spend</p>
                    <p className="mt-1 text-lg font-semibold text-white">{outfit.estimatedTotal}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{anchorExplanation}</p>
              </div>

              <div className="border-b border-white/10 px-5 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Suggested matching pieces
                  </p>
                  <p className="text-xs text-zinc-500">{outfit.items.length} pieces</p>
                </div>

                <div className="space-y-3">
                  {outfit.items.map((item, i) => (
                    <div
                      key={i}
                      className="group overflow-hidden rounded-[22px] border border-white/10 bg-zinc-950/60 transition duration-200 hover:scale-[1.015] hover:border-white/20"
                    >
                      <div className="flex">
                        <ProductImage src={item.image} alt={item.label} accent={outfit.accent} />

                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              {item.brand ? (
                                <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                                  {item.brand}
                                </p>
                              ) : null}
                              <p className="text-sm leading-relaxed text-zinc-100">{item.label}</p>
                            </div>

                            <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white">
                              {item.price}
                            </div>
                          </div>

                          {item.note ? (
                            <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.note}</p>
                          ) : null}

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300 transition hover:scale-[1.05] hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                          >
                            View item
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-5">
                <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Your details</p>

                <div className="grid gap-3">
                  <div className="rounded-[20px] border border-white/10 bg-zinc-950/60 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Built around</p>
                    <p className="mt-2 text-base font-semibold text-zinc-100">{ANCHOR_LABELS[anchorItem]}</p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-zinc-950/60 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Shopping from</p>
                    <p className="mt-2 text-base font-semibold text-zinc-100">{country}</p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-zinc-950/60 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Date is</p>
                    <p className="mt-2 text-base font-semibold text-zinc-100">{DELIVERY_LABELS[delivery]}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}