"use client";

import { useMemo, useState, type ReactNode } from "react";

type DateType = "coffee" | "dinner" | "drinks";
type Budget = "affordable" | "mid" | "premium";
type Country = "UK" | "Germany" | "France";
type DeliverySpeed = "3days" | "1week" | "2weeks";

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

const OUTFITS: OutfitMap = {
  coffee: {
    affordable: {
      title: "Clean Casual",
      vibe: "Safe choice — hard to mess up. Looks like you dress well without thinking about it.",
      estimatedTotal: "~€50 total",
      accent: "from-stone-200 via-zinc-300 to-zinc-500",
      imageLabel: "Soft neutrals · clean white tee · easy daytime look",
      description:
        "Understated and easy. The kind of outfit that looks like you did not try — but you did.",
      items: [
        {
          label: "White Supima cotton crew-neck T-shirt",
          brand: "Uniqlo",
          url: "https://www.uniqlo.com/uk/en/products/E455365-000/00?colorDisplayCode=00&sizeDisplayCode=003",
          price: "€20",
          image: "/products/uniqlo-white-tee.jpg",
          note: "Strong base layer",
        },
        {
          label: "Skinny fit chino trousers in ecru",
          brand: "Zara Men",
          url: "https://www.zara.com/uk/en/skinny-fit-chino-trousers-p01934408.html",
          price: "€20",
          image: "/products/zara-ecru-chinos.jpg",
          note: "Light, relaxed tone",
        },
        {
          label: "VL Court Base Shoes",
          brand: "adidas",
          url: "https://www.adidas.co.uk/vl-court-base-shoes/JI1776.html",
          price: "€10+",
          image: "/products/adidas-white-trainers.jpg",
          note: "Simple and clean finish",
        },
      ],
    },
    mid: {
      title: "Considered Casual",
      vibe: "Shows effort without overdressing. The kind of guy who just gets it.",
      estimatedTotal: "~€175 total",
      accent: "from-neutral-100 via-stone-300 to-stone-500",
      imageLabel: "Elevated basics · off-white tones · refined casual",
      description:
        "Elevated basics with better fabric and fit. Looks effortless because the details are right.",
      items: [
        {
          label: "Relaxed fit off-white T-shirt",
          brand: "COS",
          url: "https://www.cos.com/en-gb/men/menswear/tshirts/relaxed-fit/product/mesh-panel-knitted-t-shirt-mole-off-white-1281661001",
          price: "€45",
          image: "/products/cos-off-white-tee.jpg",
          note: "Better drape",
        },
        {
          label: "Washed cotton slim-fit chinos in stone",
          brand: "Reiss Pitch",
          url: "https://www.reiss.com/style/st453404/d74487",
          price: "€70",
          image: "/products/reiss-stone-chinos.jpg",
          note: "Sharper fit",
        },
        {
          label: "Leather trainers in white",
          brand: "ARKET",
          url: "https://www.arket.com/en-eu/product/leather-trainers-white-1277664001/",
          price: "€60",
          image: "/products/arket-white-trainers.jpg",
          note: "Minimal and versatile",
        },
        {
          label: "Slim leather card wallet",
          brand: "Bellroy Card Sleeve",
          url: "https://bellroy.com/products/card-sleeve-wallet/leather/charcoal",
          price: "€35",
          image: "/products/bellroy-wallet-charcoal.jpg",
          note: "Small polish detail",
        },
        {
          label: "Native 40mm brushed steel mesh watch",
          brand: "Nordgreen",
          url: "https://www.nordgreen.com/products/native-40mm-brushed-steel-case-brushed-steel-mesh-band",
          price: "€95",
          image: "/products/nordgreen-native-watch.jpg",
          note: "Quiet accessory",
        },
      ],
    },
    premium: {
      title: "Quiet Luxury",
      vibe: "Nothing loud. Everything precise. She will notice the fabric before the brand.",
      estimatedTotal: "~€520 total",
      accent: "from-amber-100 via-stone-300 to-neutral-700",
      imageLabel: "Cashmere knit · refined denim · suede boots",
      description:
        "Tonal, considered, and immaculate. The outfit that earns a second look.",
      items: [
        {
          label: "Slim-fit cashmere crew-neck knit",
          brand: "Johnstons of Elgin",
          url: "https://www.johnstons.com/en-gb/mens/knitwear/crew-neck/slim-fit-cashmere-crew-neck-KAA01987HA73.html",
          price: "€240",
          image: "/products/johnstons-cashmere-knit.jpg",
          note: "Luxury texture",
        },
        {
          label: "Regular fit jeans 2021M",
          brand: "Acne Studios",
          url: "https://www.acnestudios.com/us/en/regular-fit-jeans-2021m/",
          price: "€180",
          image: "/products/acne-2021m-jeans.jpg",
          note: "Premium denim",
        },
        {
          label: "Dark tan suede Chelsea boots",
          brand: "Crockett & Jones Chepstow",
          url: "https://www.crockett-jones.com/products/chepstow-4-tan-suede",
          price: "€100+",
          image: "/products/crockett-tan-chelsea.jpg",
          note: "Strong finishing piece",
        },
        {
          label: "Pioneer 42mm leather-strap watch",
          brand: "Nordgreen",
          url: "https://www.nordgreen.com/products/pioneer-42mm-brushed-steel-case-black-leather-band",
          price: "€120",
          image: "/products/nordgreen-pioneer-watch.jpg",
          note: "Clean wrist detail",
        },
      ],
    },
  },
  dinner: {
    affordable: {
      title: "Smart Sharp",
      vibe: "Dinner-ready without looking like you tried too hard. Reliable, clean, confident.",
      estimatedTotal: "~€90 total",
      accent: "from-slate-200 via-slate-400 to-slate-700",
      imageLabel: "White Oxford · dark chinos · simple black shoes",
      description:
        "Structured and intentional. You look like you dress this way all the time.",
      items: [
        {
          label: "White regular fit Oxford shirt",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1013956002.html",
          price: "€25",
          image: "/products/hm-white-oxford.jpg",
          note: "Classic move",
        },
        {
          label: "Dark blue slim fit cotton chinos",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1311240004.html",
          price: "€30",
          image: "/products/hm-dark-blue-chinos.jpg",
          note: "Easy structure",
        },
        {
          label: "Black Derby shoes",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1261294001.html",
          price: "€35",
          image: "/products/hm-black-derby.jpg",
          note: "Simple formal edge",
        },
      ],
    },
    mid: {
      title: "Modern Dinner",
      vibe: "Tailored but not stiff. Smart but not trying too hard. The exact right balance.",
      estimatedTotal: "~€270 total",
      accent: "from-zinc-200 via-zinc-500 to-zinc-900",
      imageLabel: "Merino polo · charcoal tailoring · clean blazer",
      description:
        "Sharp silhouette with just enough personality to start a conversation.",
      items: [
        {
          label: "Slim-fit merino wool polo shirt",
          brand: "Massimo Dutti",
          url: "https://www.massimodutti.com/gb/men/knitwear/polo-shirts/slim-fit-merino-wool-polo-shirt-l00916425",
          price: "€70",
          image: "/products/md-merino-polo.jpg",
          note: "Softer than a shirt",
        },
        {
          label: "Slim tapered wool-blend trousers in charcoal",
          brand: "Reiss Belief",
          url: "https://www.reiss.com/p/slim-tapered-wool-blend-trousers-belief-charcoal-23803021",
          price: "€80",
          image: "/products/reiss-charcoal-trousers.jpg",
          note: "Strong shape",
        },
        {
          label: "Leather monk-strap shoes",
          brand: "Massimo Dutti",
          url: "https://www.massimodutti.com/gb/men/shoes/formal-shoes/leather-monk-strap-shoes-l16308531",
          price: "€75",
          image: "/products/md-monk-strap.jpg",
          note: "More character than derbies",
        },
        {
          label: "Unstructured wool blazer in charcoal",
          brand: "ARKET",
          url: "https://www.arket.com/en-gb/men/blazers/product.unstructured-wool-blazer-charcoal.1228290001.html",
          price: "€110",
          image: "/products/arket-charcoal-blazer.jpg",
          note: "Adds polish fast",
        },
      ],
    },
    premium: {
      title: "Editorial Dinner",
      vibe: "You walk in and the room notices. Nothing overdone — just completely right.",
      estimatedTotal: "~€680 total",
      accent: "from-neutral-300 via-stone-500 to-black",
      imageLabel: "Black tailoring · silk blend · evening confidence",
      description:
        "Sharp enough for anywhere. Relaxed enough to feel like yourself.",
      items: [
        {
          label: "Relaxed black silk-blend shirt",
          brand: "Sandro Paris",
          url: "https://www.sandro-paris.com/en-gb/man/tops/shirts/silk-blend-relaxed-shirt-SHPCM01006.html",
          price: "€190",
          image: "/products/sandro-black-shirt.jpg",
          note: "Soft, luxurious texture",
        },
        {
          label: "Tordon tailored wool trousers",
          brand: "Tiger of Sweden",
          url: "https://www.tigerofsweden.com/gb/men/trousers-and-shorts/trousers/tordon-trousers-T65994001.html",
          price: "€170",
          image: "/products/tiger-wool-trousers.jpg",
          note: "Tailored anchor",
        },
        {
          label: "Audley black calf Oxfords",
          brand: "Crockett & Jones",
          url: "https://www.crockett-jones.com/products/audley-1-black-calf",
          price: "€220",
          image: "/products/cj-audley-oxford.jpg",
          note: "Serious finishing shoe",
        },
        {
          label: "Unstructured black wool blazer",
          brand: "COS",
          url: "https://www.cos.com/en-gb/men/blazers/product.unstructured-wool-blazer-black.1228293001.html",
          price: "€130",
          image: "/products/cos-black-blazer.jpg",
          note: "Refined outer layer",
        },
        {
          label: "Philosopher 40mm silver link watch",
          brand: "Nordgreen",
          url: "https://nordgreen.com/products/philosopher-40mm-silver-watch-with-black-dial-and-silver-5-link-strap",
          price: "€120",
          image: "/products/nordgreen-philosopher-watch.jpg",
          note: "Quiet statement",
        },
      ],
    },
  },
  drinks: {
    affordable: {
      title: "Bar-Ready",
      vibe: "Effortless and direct. Looks like you just threw it on — and it works completely.",
      estimatedTotal: "~€75 total",
      accent: "from-zinc-300 via-zinc-600 to-black",
      imageLabel: "Black layers · dark denim · clean low-profile trainers",
      description:
        "Dark tones, clean silhouette. The kind of outfit that suits any bar.",
      items: [
        {
          label: "Black loose fit sweatshirt",
          brand: "H&M",
          url: "https://www2.hm.com/en_gb/productpage.1308076013.html",
          price: "€25",
          image: "/products/hm-black-sweatshirt.jpg",
          note: "Relaxed top layer",
        },
        {
          label: "Straight leg black jeans",
          brand: "Levi's 501",
          url: "https://www.levi.com/GB/en_GB/clothing/men/jeans/straight/501-original-fit-mens-jeans/p/005010165",
          price: "€35",
          image: "/products/levis-501-black.jpg",
          note: "Reliable denim",
        },
        {
          label: "Black low-profile trainers",
          brand: "ASOS DESIGN",
          url: "https://www.asos.com/asos-design/asos-design-trainers-in-black/prd/200732344",
          price: "€15+",
          image: "/products/asos-black-trainers.jpg",
          note: "Easy finish",
        },
      ],
    },
    mid: {
      title: "Night Out Sharp",
      vibe: "Dark, considered, and a little bit cool. This is how you dress when you know what you are doing.",
      estimatedTotal: "~€240 total",
      accent: "from-emerald-200 via-zinc-600 to-black",
      imageLabel: "Dark overshirt · black tailoring · sleek night-out palette",
      description:
        "Clean lines, confident palette. Dressed for wherever the night ends up going.",
      items: [
        {
          label: "Dark olive brushed cotton overshirt",
          brand: "COS",
          url: "https://www.cos.com/en-gb/men/shirts/overshirts/product.relaxed-fit-overshirt-dark-green.1228294001.html",
          price: "€75",
          image: "/products/cos-olive-overshirt.jpg",
          note: "Adds shape and texture",
        },
        {
          label: "Slim tapered trousers in black",
          brand: "Reiss Belief",
          url: "https://www.reiss.com/p/slim-tapered-trousers-belief-black-23803020",
          price: "€80",
          image: "/products/reiss-black-trousers.jpg",
          note: "Smarter than jeans",
        },
        {
          label: "Leather loafers with track sole",
          brand: "Massimo Dutti",
          url: "https://www.massimodutti.com/gb/men/shoes/loafers/leather-loafers-with-track-sole-l16203527",
          price: "€85",
          image: "/products/md-track-sole-loafers.jpg",
          note: "Dressy with edge",
        },
        {
          label: "White Supima cotton crew-neck T-shirt",
          brand: "Uniqlo",
          url: "https://www.uniqlo.com/uk/en/products/E455365-000/00?colorDisplayCode=00&sizeDisplayCode=003",
          price: "€20",
          image: "/products/uniqlo-white-tee.jpg",
          note: "Clean contrast",
        },
        {
          label: "Black leather card wallet",
          brand: "Bellroy Card Sleeve",
          url: "https://bellroy.com/products/card-sleeve-wallet/leather/black",
          price: "€35",
          image: "/products/bellroy-wallet-black.jpg",
          note: "Useful detail",
        },
      ],
    },
    premium: {
      title: "Polished Edge",
      vibe: "Dark, intentional, immaculate. The kind of look people try to describe after you have left.",
      estimatedTotal: "~€590 total",
      accent: "from-zinc-200 via-zinc-700 to-zinc-950",
      imageLabel: "Merino roll-neck · tailored black pieces · silver ring detail",
      description:
        "Monochrome, architectural, and quiet. Nothing needs to be explained.",
      items: [
        {
          label: "Slim-fit merino roll-neck knit",
          brand: "Johnstons of Elgin",
          url: "https://www.johnstons.com/en-gb/mens/knitwear/roll-neck/slim-fit-merino-roll-neck-KAA01988HA73.html",
          price: "€180",
          image: "/products/johnstons-rollneck.jpg",
          note: "Sharp evening piece",
        },
        {
          label: "Slim tailored trousers",
          brand: "Sandro",
          url: "https://www.sandro-paris.com/en-gb/man/trousers-and-shorts/trousers/slim-tailored-trousers-SHPPA00632.html",
          price: "€160",
          image: "/products/sandro-tailored-trousers.jpg",
          note: "Clean line",
        },
        {
          label: "Black Chelsea boots",
          brand: "Ted Baker",
          url: "https://www.tedbaker.com/uk/mens/shoes-and-boots/chelsea-boots/chelsea-boot-black-275880",
          price: "€140",
          image: "/products/ted-baker-chelsea.jpg",
          note: "Strong silhouette",
        },
        {
          label: "Cushion ring in silver",
          brand: "Tom Wood",
          url: "https://tomwood.eu/collections/rings/products/cushion-ring-silver",
          price: "€75",
          image: "/products/tom-wood-cushion-ring.jpg",
          note: "Tasteful statement",
        },
        {
          label: "Black leather cardholder",
          brand: "Mismo M/S",
          url: "https://www.mismo.dk/products/ms-card-holder-black-black",
          price: "€35+",
          image: "/products/mismo-cardholder.jpg",
          note: "Premium carry detail",
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

function MiniPill({ children }: { children: ReactNode }) {
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
  const safePlaceholder = "/products/uniqlo-white-tee.jpg";
  const finalFallback = "/next.svg";
  // Re-enable real product images one-by-one only after verifying each file exists and renders correctly.
  const realImagesEnabled = new Set<string>([
    "/products/uniqlo-white-tee.jpg",
  ]);
  const resolvedSrc = realImagesEnabled.has(src) ? src : safePlaceholder;

  return (
    <div className={`relative h-28 w-24 shrink-0 overflow-hidden bg-gradient-to-br ${accent}`}>
      <div className="absolute inset-0 bg-black/10" />
      <img
        src={resolvedSrc}
        alt={alt}
        onError={(event) => {
          const img = event.currentTarget;
          if (!img.dataset.fallbackApplied) {
            img.dataset.fallbackApplied = "true";
            img.src = finalFallback;
          }
        }}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export default function Home() {
  const [dateType, setDateType] = useState<DateType | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [delivery, setDelivery] = useState<DeliverySpeed | null>(null);

  const outfit = dateType && budget ? OUTFITS[dateType][budget] : null;
  const showResult = Boolean(dateType && budget && country && delivery && outfit);

  function resetAll() {
    setDateType(null);
    setBudget(null);
    setCountry(null);
    setDelivery(null);
  }

  const stepNumber = !dateType ? 1 : !budget ? 2 : !country ? 3 : !delivery ? 4 : 5;

  const selectedSummary = useMemo(() => {
    return {
      date: dateType ? DATE_LABELS[dateType] : null,
      budget: budget ? BUDGET_LABELS[budget] : null,
      country,
      delivery: delivery ? DELIVERY_LABELS[delivery] : null,
    };
  }, [dateType, budget, country, delivery]);

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
                Dress well.
                <br />
                Decide fast.
              </h1>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg shadow-lg shadow-black/20">
              ✦
            </div>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            Answer four quick questions. Get one strong outfit recommendation with pricing and links.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <MiniPill>Mobile-first</MiniPill>
            <MiniPill>Curated outfits</MiniPill>
            <MiniPill>Visual shopping</MiniPill>
          </div>
        </div>

        {stepNumber < 5 && (
          <div className="mb-7">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Step {stepNumber} of 4
              </p>

              <p className="text-xs text-zinc-500">
                {Math.round(((stepNumber - 1) / 4) * 100)}% complete
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
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
          selectedSummary.country ||
          selectedSummary.delivery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedSummary.date ? <MiniPill>{selectedSummary.date}</MiniPill> : null}
            {selectedSummary.budget ? <MiniPill>{selectedSummary.budget}</MiniPill> : null}
            {selectedSummary.country ? <MiniPill>{selectedSummary.country}</MiniPill> : null}
            {selectedSummary.delivery ? <MiniPill>{selectedSummary.delivery}</MiniPill> : null}
          </div>
        )}

        {!dateType && (
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What kind of date is it?</h2>
              <p className="mt-2 text-sm text-zinc-400">Choose the setting first. That sets the tone.</p>
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
              <p className="mt-2 text-sm text-zinc-400">
                Pick the level of effort you want your clothes to do for you.
              </p>
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

        {dateType && budget && !country && (
          <section className="space-y-4">
            <button
              onClick={() => setBudget(null)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
            >
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Where are you shopping from?</h2>
              <p className="mt-2 text-sm text-zinc-400">
                This helps frame the shopping links and delivery expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {COUNTRY_OPTIONS.map((c) => (
                <StepCard key={c} title={c} onClick={() => setCountry(c)} />
              ))}
            </div>
          </section>
        )}

        {dateType && budget && country && !delivery && (
          <section className="space-y-4">
            <button
              onClick={() => setCountry(null)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:scale-[1.04] hover:border-white/20 hover:text-white"
            >
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">When is the date?</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Choose your timeline so the recommendation feels realistic.
              </p>
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

        {showResult && outfit && country && delivery && dateType && budget && (
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
                    Your outfit
                  </p>
                  <h2 className="max-w-[12ch] text-3xl font-bold leading-[1] tracking-tight text-white">
                    {outfit.title}
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
                  <MiniPill>{country}</MiniPill>
                  <MiniPill>{DELIVERY_LABELS[delivery]}</MiniPill>
                </div>

                <p className="text-base italic leading-relaxed text-zinc-300">{outfit.vibe}</p>

                <div className="mt-4 inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Estimated spend
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">{outfit.estimatedTotal}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{outfit.description}</p>
              </div>

              <div className="border-b border-white/10 px-5 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Shop the outfit
                  </p>
                  <p className="text-xs text-zinc-500">{outfit.items.length} pieces</p>
                </div>

                <div className="space-y-3">
                  {outfit.items.map((item) => (
                    <div
                      key={`${item.label}-${item.url}`}
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
                <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Your details
                </p>

                <div className="grid gap-3">
                  <div className="rounded-[20px] border border-white/10 bg-zinc-950/60 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Shopping from
                    </p>
                    <p className="mt-2 text-base font-semibold text-zinc-100">{country}</p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-zinc-950/60 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Date is
                    </p>
                    <p className="mt-2 text-base font-semibold text-zinc-100">
                      {DELIVERY_LABELS[delivery]}
                    </p>
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