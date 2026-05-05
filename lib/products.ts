export type ProductCategory =
  | "white t-shirt"
  | "black t-shirt"
  | "oxford shirt"
  | "overshirt"
  | "chinos"
  | "tailored trousers"
  | "white sneakers"
  | "black sneakers"
  | "loafers"
  | "chelsea boots"
  | "blazer"
  | "hoodie"
  | "minimal accessory"
  | "blue jeans"
  | "black jeans";

export type Budget = "affordable" | "mid" | "premium";

export interface Product {
  id: string;
  category: ProductCategory;
  brand: string;
  label: string;
  price: string;
  budget: Budget;
  region: "Europe";
  url: string;
  image: string;
  note: string;
  isAffiliate: boolean;
}

/** Normalized strings must match these keys exactly for lookups. */
const PRODUCT_CATEGORY_KEYS = new Set<string>([
  "white t-shirt",
  "black t-shirt",
  "oxford shirt",
  "overshirt",
  "chinos",
  "tailored trousers",
  "white sneakers",
  "black sneakers",
  "loafers",
  "chelsea boots",
  "blazer",
  "hoodie",
  "minimal accessory",
  "blue jeans",
  "black jeans",
]);

function normalizeCategoryString(raw: string): string {
  return raw.toLowerCase().trim();
}

function toProductCategory(normalized: string): ProductCategory | null {
  if (!PRODUCT_CATEGORY_KEYS.has(normalized)) return null;
  return normalized as ProductCategory;
}

function pickRandomProduct(products: Product[]): Product | undefined {
  if (products.length === 0) return undefined;
  const index = Math.floor(Math.random() * products.length);
  return products[index];
}

function isStrongOxfordShirt(product: Product): boolean {
  if (product.category !== "oxford shirt") return false;
  const label = product.label.toLowerCase();
  const note = product.note.toLowerCase();
  return (
    label.includes("oxford") ||
    label.includes("formal shirt") ||
    label.includes("dress shirt") ||
    note.includes("clean") ||
    note.includes("crisp")
  );
}

export const PRODUCTS: Product[] = [
  // WHITE T-SHIRT
  {
    id: "zara-white-tshirt-001",
    category: "white t-shirt",
    brand: "Zara",
    label: "White medium-weight tee",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.zara.com/uk/en/basic-medium-weight-t-shirt--02-p01887411.html?v1=499201787",
    image:
      "https://rdl.ink/render/https%3A%2F%2Fwww.zara.com%2Fuk%2Fen%2Fbasic-medium-weight-t-shirt--02-p01887411.html%3Fv1%3D499201787",
    note: "Adds clean contrast without making the outfit too formal.",
    isAffiliate: true,
  },
  {
    id: "hm-white-tshirt-001",
    category: "white t-shirt",
    brand: "H&M",
    label: "White relaxed tee",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1309319011.html",
    image:
      "https://image.hm.com/assets/hm/59/c5/59c543d309e2c05afd304218944b43cf04197fa7.jpg?imwidth=1260",
    note: "Brightens the top half and keeps the palette feeling fresh and easy.",
    isAffiliate: true,
  },
  {
    id: "asos-white-tshirt-001",
    category: "white t-shirt",
    brand: "ASOS DESIGN",
    label: "White heavyweight boxy T-shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-breathemax-heavyweight-boxy-oversized-t-shirt-in-white-cotton-blend/prd/208538183#colourWayId-208538184",
    image:
      "https://images.asos-media.com/products/asos-design-breathemax-heavyweight-boxy-oversized-t-shirt-in-white-cotton-blend/208538183-1-white?$n_750w$&wid=750&hei=750&fit=crop",
    note: "A relaxed white layer that still reads clean next to tailored pieces.",
    isAffiliate: true,
  },

  // BLACK T-SHIRT
  {
    id: "only-sons-black-tshirt-001",
    category: "black t-shirt",
    brand: "Only & Sons",
    label: "Black structured oversized tee",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/only-sons/only-sons-structured-oversized-t-shirt-in-black/prd/209987692#colourWayId-209987697",
    image:
      "https://images.asos-media.com/products/only-sons-structured-oversized-t-shirt-in-black/209987692-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Anchors the outfit with a dark, understated tone.",
    isAffiliate: true,
  },
  {
    id: "river-island-black-tshirt-001",
    category: "black t-shirt",
    brand: "River Island",
    label: "Black oversized tee",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/river-island/river-island-oversized-t-shirt-in-black/prd/207019044#colourWayId-207019045",
    image:
      "https://images.asos-media.com/products/river-island-oversized-t-shirt-in-black/207019044-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Softens smarter trousers without losing a deliberate silhouette.",
    isAffiliate: true,
  },
  {
    id: "zara-black-tshirt-001",
    category: "black t-shirt",
    brand: "Zara",
    label: "Black medium-weight tee",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.zara.com/uk/en/basic-medium-weight-t-shirt--02-p01887411.html?v1=499201788",
    image:
      "https://rdl.ink/render/https%3A%2F%2Fwww.zara.com%2Fuk%2Fen%2Fbasic-medium-weight-t-shirt--02-p01887411.html%3Fv1%3D499201788",
    note: "Keeps the upper body streamlined when the rest is more relaxed.",
    isAffiliate: true,
  },

  // OXFORD SHIRT
  {
    id: "hm-oxford-white-001",
    category: "oxford shirt",
    brand: "H&M",
    label: "White Oxford shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1013956002.html",
    image:
      "https://image.hm.com/assets/hm/3c/2b/3c2b35771bab50136271b484dc1a120c81b3b021.jpg?imwidth=1260",
    note: "Adds structure at the chest without jumping straight into formal tailoring.",
    isAffiliate: true,
  },
  {
    id: "hm-oxford-white-002",
    category: "oxford shirt",
    brand: "H&M",
    label: "Regular white Oxford shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.0989216003.html",
    image:
      "https://media.arket.com/assets/006/e3/d6/e3d687cfbd232ebe7c70380280a5734d35c1cf92.jpg?imwidth=1260",
    note: "Lends a crisp line that works for both workday and weekend.",
    isAffiliate: true,
  },
  {
    id: "zara-shirt-pocket-001",
    category: "overshirt",
    brand: "Zara",
    label: "Relaxed pocket overshirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/relaxed-fit-shirt-with-pockets-p05679132.html?v1=532748110&v2=2431994",
    image:
      "https://static.zara.net/assets/public/e9bd/a3e2/5a3f40c89852/e826cdefc0fd/05679132403-p/05679132403-p.jpg?ts=1777381531750&w=560",
    note: "Adds a softer drape as a light layer while keeping the look polished.",
    isAffiliate: true,
  },

  // OVERSHIRT
  {
    id: "zara-overshirt-001",
    category: "overshirt",
    brand: "Zara",
    label: "Relaxed pocket overshirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/relaxed-fit-overshirt-with-pockets-p08062415.html?v1=507703418&v2=2432270",
    image:
      "https://static.zara.net/assets/public/cefb/beae/5da04c2e8991/9036c08050d0/08062415832-p/08062415832-p.jpg?ts=1773682910922&w=560",
    note: "Adds structure while keeping the look relaxed.",
    isAffiliate: true,
  },
  {
    id: "asos-shacket-001",
    category: "overshirt",
    brand: "ASOS DESIGN",
    label: "Beige pocket shacket",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-shacket-with-chest-pockets-in-beige/prd/209752390#colourWayId-209752394",
    image:
      "https://images.asos-media.com/products/asos-design-shacket-with-chest-pockets-in-beige/209752390-1-beige?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Brings warmth and texture without feeling like a heavy jacket.",
    isAffiliate: true,
  },
  {
    id: "zara-overshirt-002",
    category: "overshirt",
    brand: "Zara",
    label: "Beige pocket overshirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/regular-fit-overshirt-with-pockets-p08574850.html?v1=495680604&v2=2431989",
    image:
      "https://static.zara.net/assets/public/f97b/ecb2/c5d34eaf8377/9418fd595aa7/08574850800-p/08574850800-p.jpg?ts=1771592514779&w=1024",
    note: "Layers neutrals so the outfit feels intentional, not busy.",
    isAffiliate: true,
  },

  // CHINOS
  {
    id: "zara-chinos-001",
    category: "chinos",
    brand: "Zara",
    label: "Textured chinos",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/comfort-textured-chino-trousers-p00706650.html?v1=520387464&v2=2432064",
    image:
      "https://static.zara.net/assets/public/815f/7c82/1bff4dbeb754/c3be631d1ff1/00706650800-000-p/00706650800-000-p.jpg?ts=1772701728148&w=560",
    note: "Balances smarter tops with a trouser that still feels everyday.",
    isAffiliate: true,
  },
  {
    id: "hm-chinos-beige-001",
    category: "chinos",
    brand: "H&M",
    label: "Light beige slim chinos",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1311240002.html",
    image:
      "https://image.hm.com/assets/hm/c4/59/c459a56c307a618b5c9507eaa476ac20b709d651.jpg?imwidth=1260",
    note: "Keeps the lower half light so darker or sharper tops can lead.",
    isAffiliate: true,
  },
  {
    id: "hm-chinos-blue-001",
    category: "chinos",
    brand: "H&M",
    label: "Navy slim chinos",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1311240004.html",
    image:
      "https://image.hm.com/assets/hm/c0/5d/c05da9eea8799751e4a35ddbaa90b98b55a10fc6.jpg?imwidth=1260",
    note: "Nudges the outfit toward smart-casual without looking stiff.",
    isAffiliate: true,
  },

  // TAILORED TROUSERS
  {
    id: "hm-linen-trousers-001",
    category: "tailored trousers",
    brand: "H&M",
    label: "Beige linen trousers",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1253406001.html",
    image:
      "https://image.hm.com/assets/hm/87/02/8702e247cd8f4e5968d87ace7696c0b4a1aca2b2.jpg?imwidth=1260",
    note: "Gives a tailored line that still breathes in warmer weather.",
    isAffiliate: true,
  },
  {
    id: "zara-linen-suit-trousers-001",
    category: "tailored trousers",
    brand: "Zara",
    label: "Linen suit trousers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/100-linen-suit-trousers-p04410411.html?v1=504031158&v2=2432075",
    image:
      "https://static.zara.net/assets/public/996f/b7dd/fcb34affad3d/57d4c7fccf61/04410411052-p/04410411052-p.jpg?ts=1772636202803&w=560",
    note: "Refines the leg line when you want polish without a full suit.",
    isAffiliate: true,
  },
  {
    id: "zara-linen-twill-trousers-001",
    category: "tailored trousers",
    brand: "Zara",
    label: "Linen twill trousers",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/100-linen-twill-suit-trousers-aaron-levine-x-zara-p01564313.html?v1=536252851&v2=2432075",
    image:
      "https://static.zara.net/assets/public/2382/512f/22e746edbc62/dcea81a9a5c0/01564313800-p/01564313800-p.jpg?ts=1776844483397&w=560",
    note: "Elevates the whole outfit when the occasion calls for sharper trousers.",
    isAffiliate: true,
  },

  // WHITE SNEAKERS
  {
    id: "nike-af1-white-001",
    category: "white sneakers",
    brand: "Nike",
    label: "Air Force 1 triple white",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.asos.com/nike/nike-air-force-1-07-trainers-in-triple-white/prd/202389207#colourWayId-202389212",
    image:
      "https://images.asos-media.com/products/nike-air-force-1-07-trainers-in-triple-white/202389207-1-white?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Lightens darker pieces and keeps the outfit casual.",
    isAffiliate: true,
  },
  {
    id: "asos-white-trainers-001",
    category: "white sneakers",
    brand: "ASOS DESIGN",
    label: "White lace-up trainers",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-lace-up-trainers-in-white/prd/208879855#colourWayId-208879856",
    image:
      "https://images.asos-media.com/products/asos-design-lace-up-trainers-in-white/208879855-1-white?$n_750w$&wid=750&hei=750&fit=crop",
    note: "A clean white finish that grounds relaxed tailoring.",
    isAffiliate: true,
  },
  {
    id: "zara-white-trainers-001",
    category: "white sneakers",
    brand: "Zara",
    label: "Chunky white trainers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/monochrome-chunky-trainers-p12215520.html?v1=495716308&v2=2436324",
    image:
      "https://static.zara.net/assets/public/dc01/a48f/ece04e519032/e645ba939c7d/12215520001-a2/12215520001-a2.jpg?ts=1770648618432&w=560",
    note: "Adds a bit of weight at the foot so the silhouette feels balanced.",
    isAffiliate: true,
  },

  // BLACK SNEAKERS
  {
    id: "jack-jones-black-trainers-001",
    category: "black sneakers",
    brand: "Jack & Jones",
    label: "Triple black trainers",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/jack-jones/jack-jones-faux-leather-trainer-in-triple-black/prd/210257265#colourWayId-210257273",
    image:
      "https://images.asos-media.com/products/jack-jones-faux-leather-trainer-in-triple-black/210257265-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Keeps the line sleek when you want a darker, minimal shoe.",
    isAffiliate: true,
  },
  {
    id: "zara-black-trainers-001",
    category: "black sneakers",
    brand: "Zara",
    label: "Black minimal trainers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/essential-sneakers-p12200720.html?v1=495698289&v2=2436336",
    image:
      "https://static.zara.net/assets/public/9632/b745/1e3247e3b9a9/85a77c8e2a30/12200720800-a2/12200720800-a2.jpg?ts=1770882512996&w=560",
    note: "Stays quiet so the rest of the outfit can do the talking.",
    isAffiliate: true,
  },

  // LOAFERS
  {
    id: "zara-leather-loafers-001",
    category: "loafers",
    brand: "Zara",
    label: "Leather penny loafers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/leather-penny-loafers-with-track-sole-p12688720.html?v1=545224585&v2=2436382",
    image:
      "https://static.zara.net/assets/public/3b31/26af/26a4436bb407/0d945f163cc1/12688720800-e1/12688720800-e1.jpg?ts=1776424630182&w=560",
    note: "Makes the look smarter without feeling overdressed.",
    isAffiliate: true,
  },
  {
    id: "clarks-linton-loafers-001",
    category: "loafers",
    brand: "Clarks",
    label: "Navy leather loafers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarksoutlet.co.uk/linton-easy/26188680-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26188680_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Bridges casual pieces with a more considered, put-together shoe.",
    isAffiliate: true,
  },
  {
    id: "clarks-banbury-lo-001",
    category: "loafers",
    brand: "Clarks",
    label: "Banbury loafers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarks.com/en-gb/banbury-lo/26183661-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26183661_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "A classic loafer line that nudges the outfit toward the office without stiff tailoring.",
    isAffiliate: true,
  },

  // CHELSEA BOOTS FALLBACK
  {
    id: "zara-derby-fallback-001",
    category: "chelsea boots",
    brand: "Zara",
    label: "Leather derby shoes",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/leather-derby-shoes-p12407820.html?v1=543528966&v2=2436382",
    image:
      "https://static.zara.net/assets/public/020c/0bba/04664516905d/43cbcb793b9c/12407820800-e1/12407820800-e1.jpg?ts=1776174620660&w=560",
    note: "Adds polish at the hem when you want a smarter shoe than trainers.",
    isAffiliate: true,
  },
  {
    id: "clarks-banbury-derby-fallback-001",
    category: "chelsea boots",
    brand: "Clarks",
    label: "Banbury derby shoes",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarks.com/en-gb/banbury-derby/26183659-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26183659_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Grounds the outfit with a restrained, office-friendly shoe line.",
    isAffiliate: true,
  },
  {
    id: "clarks-hail-tough-fallback-001",
    category: "chelsea boots",
    brand: "Clarks",
    label: "Black slip-ons",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.clarksoutlet.co.uk/hail-tough/26167000-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26167000_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Keeps things simple and dark at the foot for an easy smart-casual finish.",
    isAffiliate: true,
  },

  // BLAZER
  {
    id: "zara-blazer-double-breasted-001",
    category: "blazer",
    brand: "Zara",
    label: "Double-breasted blazer",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/comfort-fit-double-breasted-blazer-p04457232.html?v1=507285462&v2=2436301",
    image:
      "https://static.zara.net/assets/public/f930/d229/048f4f55abd8/dcd7f7283c6d/04457232500-p/04457232500-p.jpg?ts=1770110528838&w=560",
    note: "Adds polish and sharpens the silhouette.",
    isAffiliate: true,
  },
  {
    id: "zara-wool-blend-blazer-001",
    category: "blazer",
    brand: "Zara",
    label: "Wool-blend suit blazer",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/comfort-wool-blend-suit-blazer-p01564116.html?v1=535627421&v2=2436304",
    image:
      "https://static.zara.net/assets/public/ddf0/4876/46774fcea3e4/ad20ad7d1c26/01564116814-p/01564116814-p.jpg?ts=1777030201259&w=560",
    note: "Sharpens the shoulders and chest when the rest of the outfit is minimal.",
    isAffiliate: true,
  },
  {
    id: "zara-wool-textured-blazer-001",
    category: "blazer",
    brand: "Zara",
    label: "Wool textured blazer",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/100-wool-textured-suit-blazer-p01408904.html?v1=527738433&v2=2436311",
    image:
      "https://static.zara.net/assets/public/bb1a/8ab6/1b41478e8ae7/1f385b9a127f/01408904800-p/01408904800-p.jpg?ts=1777028944675&w=560",
    note: "Adds polish and sharpens the silhouette with richer texture.",
    isAffiliate: true,
  },

  // HOODIE
  {
    id: "zara-quarter-zip-001",
    category: "hoodie",
    brand: "Zara",
    label: "Quarter-zip sweatshirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/basic-quarter-zip-sweatshirt-p00761311.html?v1=495669917&v2=2432232",
    image:
      "https://static.zara.net/assets/public/5bd0/2ee7/1d3e46eaadc4/b659b105ece5/00761311800-p/00761311800-p.jpg?ts=1762277338633&w=560",
    note: "Makes the outfit more relaxed and casual.",
    isAffiliate: true,
  },
  {
    id: "asos-grey-hoodie-001",
    category: "hoodie",
    brand: "ASOS DESIGN",
    label: "Grey heavyweight oversized hoodie",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-premium-heavyweight-oversized-hoodie-in-400gsm-in-grey-marl/prd/208548236#colourWayId-208548247",
    image:
      "https://images.asos-media.com/products/asos-design-premium-heavyweight-oversized-hoodie-in-400gsm-in-grey-marl/208548236-1-greymarl?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Makes the outfit more relaxed and casual with a soft, heavy drape.",
    isAffiliate: true,
  },
  {
    id: "hm-hoodie-black-001",
    category: "hoodie",
    brand: "H&M",
    label: "Black loose hoodie",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.0970819001.html",
    image:
      "https://image.hm.com/assets/hm/47/4f/474fdd8a236c8d920ab4456eef014a1715d3eb1c.jpg?imwidth=1260",
    note: "Makes the outfit more relaxed and casual while staying understated.",
    isAffiliate: true,
  },
  {
    id: "hm-hoodie-loose-001",
    category: "hoodie",
    brand: "H&M",
    label: "Loose-fit hoodie",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.0970819131.html",
    image:
      "https://image.hm.com/assets/hm/b1/ec/b1ec99a4b8702b35fce0e94a0008aeb19bb0a9a6.jpg?imwidth=1260",
    note: "Pulls the whole look toward easy weekend energy.",
    isAffiliate: true,
  },

  // MINIMAL ACCESSORY
  {
    id: "zara-pendant-chain-001",
    category: "minimal accessory",
    brand: "Zara",
    label: "Stone Pendant Chain",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.zara.com/uk/en/stone-pendant-chain-p08435481.html?v1=515012468&v2=2436451",
    image:
      "https://static.zara.net/assets/public/2c30/e285/198b44eb9c19/2cfed7c12279/08435481805-a1/08435481805-a1.jpg?ts=1773403204734&w=560",
    note: "Adds a small finishing detail without overpowering the outfit.",
    isAffiliate: true,
  },
  {
    id: "asos-ring-001",
    category: "minimal accessory",
    brand: "ASOS DESIGN",
    label: "Silver star-pattern ring",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-waterproof-stainless-steel-star-and-pattern-ring-in-silver/prd/210352185#colourWayId-210352186",
    image:
      "https://images.asos-media.com/products/asos-design-waterproof-stainless-steel-star-and-pattern-ring-in-silver/210352185-1-silver?$n_750w$&wid=750&hei=750&fit=crop",
    note: "A quiet glint of metal that finishes the look without extra noise.",
    isAffiliate: true,
  },
  {
    id: "asos-sunglasses-001",
    category: "minimal accessory",
    brand: "ASOS DESIGN",
    label: "Black slim sunglasses",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-slim-rectangle-sunglasses-in-black-with-smoke-lens/prd/209643251#colourWayId-209643264",
    image:
      "https://images.asos-media.com/products/asos-design-slim-rectangle-sunglasses-in-black-with-smoke-lens/209643251-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Frames the face and adds a quiet, confident finish.",
    isAffiliate: true,
  },

  // BLUE JEANS
  {
    id: "levis-501-dark-wash-001",
    category: "blue jeans",
    brand: "Levi's",
    label: "501 jeans, dark wash",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.levi.com/GB/en_GB/clothing/men/jeans/501-original-jeans/p/005010194",
    image:
      "https://lscoglobal.scene7.com/is/image/lscoglobal/MB_00501-0194_GLO_CM_DA?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1320&hei=1320",
    note: "A versatile blue that works with both light and dark upper layers.",
    isAffiliate: true,
  },
  {
    id: "hm-blue-jeans-001",
    category: "blue jeans",
    brand: "H&M",
    label: "Blue regular jeans",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1309974005.html",
    image:
      "https://image.hm.com/assets/hm/30/46/304652290385fa43550f889f4a51e70123ee8b47.jpg?imwidth=1260",
    note: "Keeps the lower half easy and classic next to smarter tops.",
    isAffiliate: true,
  },
  {
    id: "zara-straight-jeans-001",
    category: "blue jeans",
    brand: "Zara",
    label: "Straight-fit jeans",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/straight-fit-jeans-p08062430.html?v1=503121056&v2=2432131",
    image:
      "https://static.zara.net/assets/public/f99e/5c7a/f25345609f01/77438bdb269b/04365430400-p/04365430400-p.jpg?ts=1768925434806&w=560",
    note: "Defines a straighter leg line that feels current but not trend-chasing.",
    isAffiliate: true,
  },

  // BLACK JEANS
  {
    id: "levis-501-black-001",
    category: "black jeans",
    brand: "Levi's",
    label: "501 Original Jeans - Black",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.levi.com/GB/en_GB/clothing/men/jeans/501-original-jeans/p/005010165",
    image:
      "https://lscoglobal.scene7.com/is/image/lscoglobal/MB_00501-0165_LSE_CM_DA?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1200&hei=630",
    note: "Holds a strong, simple base when you want less colour noise below.",
    isAffiliate: true,
  },
  {
    id: "hm-regular-jeans-001",
    category: "black jeans",
    brand: "H&M",
    label: "Black regular jeans",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1309974003.html",
    image:
      "https://image.hm.com/assets/hm/39/96/39966692dce4819fd2cb12b0f53e2edc41b69b40.jpg?imwidth=1260",
    note: "A dark wash that pairs cleanly with white, stone, and black up top.",
    isAffiliate: true,
  },
  {
    id: "zara-baggy-jeans-001",
    category: "black jeans",
    brand: "Zara",
    label: "Black baggy jeans",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/baggy-fit-jeans-p04048407.html?v1=498644966&v2=2432131",
    image:
      "https://static.zara.net/assets/public/d6b6/a2a8/58dd45cfa25e/b395a2ef40b5/04806409800-p/04806409800-p.jpg?ts=1770288516641&w=560",
    note: "Softens the silhouette for a more laid-back, street-leaning look.",
    isAffiliate: true,
  },
];

export function getProductsForCategories(
  categories: string[],
  budget: Budget
): Product[] {
  const selected: Product[] = [];
  const seen = new Set<string>();

  for (const rawCategory of categories) {
    if (selected.length >= 4) break;

    const normalized = normalizeCategoryString(rawCategory);
    const category = toProductCategory(normalized);
    if (!category) continue;

    const budgetMatches = PRODUCTS.filter(
      (product) =>
        product.category === category &&
        product.budget === budget &&
        !seen.has(product.id)
    );

    const pool =
      budgetMatches.length > 0
        ? budgetMatches
        : PRODUCTS.filter(
            (product) =>
              product.category === category && !seen.has(product.id)
          );

    const selectionPool =
      category === "oxford shirt"
        ? pool.filter(isStrongOxfordShirt).length > 0
          ? pool.filter(isStrongOxfordShirt)
          : pool
        : pool;

    const next = pickRandomProduct(selectionPool);
    if (!next) continue;

    selected.push(next);
    seen.add(next.id);
  }

  return selected;
}
