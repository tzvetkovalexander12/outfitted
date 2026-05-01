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

export const PRODUCTS: Product[] = [
  // WHITE T-SHIRT
  {
    id: "zara-white-tshirt-001",
    category: "white t-shirt",
    brand: "Zara",
    label: "Basic Medium Weight T-Shirt /02 - White",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.zara.com/uk/en/basic-medium-weight-t-shirt--02-p01887411.html?v1=499201787",
    image:
      "https://static.zara.net/assets/public/9408/d169/8ccd49a980d1/da1d17371317/01887411800-p/01887411800-p.jpg?ts=1766492296589&w=1024",
    note: "Clean everyday base",
    isAffiliate: true,
  },
  {
    id: "hm-white-tshirt-001",
    category: "white t-shirt",
    brand: "H&M",
    label: "White Relaxed Fit T-shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1309319011.html",
    image:
      "https://image.hm.com/assets/hm/59/c5/59c543d309e2c05afd304218944b43cf04197fa7.jpg?imwidth=1260",
    note: "Simple white layer",
    isAffiliate: true,
  },
  {
    id: "asos-white-tshirt-001",
    category: "white t-shirt",
    brand: "ASOS DESIGN",
    label: "Breathemax Heavyweight Boxy Oversized T-Shirt in White",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-breathemax-heavyweight-boxy-oversized-t-shirt-in-white-cotton-blend/prd/208538183#colourWayId-208538184",
    image:
      "https://rdl.ink/render/https%3A%2F%2Fwww.asos.com%2Fasos-design%2Fasos-design-breathemax-heavyweight-boxy-oversized-t-shirt-in-white-cotton-blend%2Fprd%2F208538183%23colourWayId-208538184",
    note: "Boxy white tee",
    isAffiliate: true,
  },

  // BLACK T-SHIRT
  {
    id: "only-sons-black-tshirt-001",
    category: "black t-shirt",
    brand: "Only & Sons",
    label: "Structured Oversized T-Shirt in Black",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/only-sons/only-sons-structured-oversized-t-shirt-in-black/prd/209987692#colourWayId-209987697",
    image:
      "https://images.asos-media.com/products/only-sons-structured-oversized-t-shirt-in-black/209987692-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Clean dark base",
    isAffiliate: true,
  },
  {
    id: "river-island-black-tshirt-001",
    category: "black t-shirt",
    brand: "River Island",
    label: "Oversized T-Shirt in Black",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/river-island/river-island-oversized-t-shirt-in-black/prd/207019044#colourWayId-207019045",
    image:
      "https://images.asos-media.com/products/river-island-oversized-t-shirt-in-black/207019044-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Relaxed black tee",
    isAffiliate: true,
  },
  {
    id: "zara-black-tshirt-001",
    category: "black t-shirt",
    brand: "Zara",
    label: "Basic Medium Weight T-Shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.zara.com/uk/en/basic-medium-weight-t-shirt--02-p01887411.html?v1=499201788",
    image:
      "https://rdl.ink/render/https%3A%2F%2Fwww.zara.com%2Fuk%2Fen%2Fbasic-medium-weight-t-shirt--02-p01887411.html%3Fv1%3D499201788",
    note: "Simple fitted dark tee",
    isAffiliate: true,
  },

  // OXFORD SHIRT
  {
    id: "hm-oxford-white-001",
    category: "oxford shirt",
    brand: "H&M",
    label: "White Regular Fit Oxford Shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1013956002.html",
    image:
      "https://image.hm.com/assets/hm/3c/2b/3c2b35771bab50136271b484dc1a120c81b3b021.jpg?imwidth=1260",
    note: "Sharpens the outfit",
    isAffiliate: true,
  },
  {
    id: "hm-oxford-white-002",
    category: "oxford shirt",
    brand: "H&M",
    label: "White Regular Oxford Shirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.0989216003.html",
    image:
      "https://media.arket.com/assets/006/e3/d6/e3d687cfbd232ebe7c70380280a5734d35c1cf92.jpg?imwidth=1260",
    note: "Clean smart layer",
    isAffiliate: true,
  },
  {
    id: "zara-shirt-pocket-001",
    category: "oxford shirt",
    brand: "Zara",
    label: "Relaxed Fit Shirt With Pockets",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/relaxed-fit-shirt-with-pockets-p05679132.html?v1=532748110&v2=2431994",
    image:
      "https://static.zara.net/assets/public/e9bd/a3e2/5a3f40c89852/e826cdefc0fd/05679132403-p/05679132403-p.jpg?ts=1777381531750&w=560",
    note: "Relaxed shirt alternative",
    isAffiliate: true,
  },

  // OVERSHIRT
  {
    id: "zara-overshirt-001",
    category: "overshirt",
    brand: "Zara",
    label: "Relaxed Fit Overshirt With Pockets",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/relaxed-fit-overshirt-with-pockets-p08062415.html?v1=507703418&v2=2432270",
    image:
      "https://static.zara.net/assets/public/cefb/beae/5da04c2e8991/9036c08050d0/08062415832-p/08062415832-p.jpg?ts=1773682910922&w=560",
    note: "Adds structure fast",
    isAffiliate: true,
  },
  {
    id: "asos-shacket-001",
    category: "overshirt",
    brand: "ASOS DESIGN",
    label: "Shacket With Chest Pockets in Beige",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-shacket-with-chest-pockets-in-beige/prd/209752390#colourWayId-209752394",
    image:
      "https://images.asos-media.com/products/asos-design-shacket-with-chest-pockets-in-beige/209752390-1-beige?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Soft neutral layer",
    isAffiliate: true,
  },
  {
    id: "zara-overshirt-002",
    category: "overshirt",
    brand: "Zara",
    label: "Regular Fit Overshirt With Pockets - Beige",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/regular-fit-overshirt-with-pockets-p08574850.html?v1=495680604&v2=2431989",
    image:
      "https://static.zara.net/assets/public/f97b/ecb2/c5d34eaf8377/9418fd595aa7/08574850800-p/08574850800-p.jpg?ts=1771592514779&w=1024",
    note: "Clean beige overshirt",
    isAffiliate: true,
  },

  // CHINOS
  {
    id: "zara-chinos-001",
    category: "chinos",
    brand: "Zara",
    label: "Comfort Textured Chino Trousers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/comfort-textured-chino-trousers-p00706650.html?v1=520387464&v2=2432064",
    image:
      "https://static.zara.net/assets/public/815f/7c82/1bff4dbeb754/c3be631d1ff1/00706650800-000-p/00706650800-000-p.jpg?ts=1772701728148&w=560",
    note: "Textured clean base",
    isAffiliate: true,
  },
  {
    id: "hm-chinos-beige-001",
    category: "chinos",
    brand: "H&M",
    label: "Light Beige Slim Fit Cotton Chinos",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1311240002.html",
    image:
      "https://image.hm.com/assets/hm/c4/59/c459a56c307a618b5c9507eaa476ac20b709d651.jpg?imwidth=1260",
    note: "Easy neutral trousers",
    isAffiliate: true,
  },
  {
    id: "hm-chinos-blue-001",
    category: "chinos",
    brand: "H&M",
    label: "Dark Blue Slim Fit Cotton Chinos",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1311240004.html",
    image:
      "https://image.hm.com/assets/hm/c0/5d/c05da9eea8799751e4a35ddbaa90b98b55a10fc6.jpg?imwidth=1260",
    note: "Smarter casual base",
    isAffiliate: true,
  },

  // TAILORED TROUSERS
  {
    id: "hm-linen-trousers-001",
    category: "tailored trousers",
    brand: "H&M",
    label: "Light Beige Regular Fit Linen Trousers",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1253406001.html",
    image:
      "https://image.hm.com/assets/hm/87/02/8702e247cd8f4e5968d87ace7696c0b4a1aca2b2.jpg?imwidth=1260",
    note: "Relaxed tailored base",
    isAffiliate: true,
  },
  {
    id: "zara-linen-suit-trousers-001",
    category: "tailored trousers",
    brand: "Zara",
    label: "100% Linen Suit Trousers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/100-linen-suit-trousers-p04410411.html?v1=504031158&v2=2432075",
    image:
      "https://static.zara.net/assets/public/996f/b7dd/fcb34affad3d/57d4c7fccf61/04410411052-p/04410411052-p.jpg?ts=1772636202803&w=560",
    note: "Soft tailored shape",
    isAffiliate: true,
  },
  {
    id: "zara-linen-twill-trousers-001",
    category: "tailored trousers",
    brand: "Zara",
    label: "100% Linen Twill Suit Trousers",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/100-linen-twill-suit-trousers-aaron-levine-x-zara-p01564313.html?v1=536252851&v2=2432075",
    image:
      "https://static.zara.net/assets/public/2382/512f/22e746edbc62/dcea81a9a5c0/01564313800-p/01564313800-p.jpg?ts=1776844483397&w=560",
    note: "Elevated tailored trouser",
    isAffiliate: true,
  },

  // WHITE SNEAKERS
  {
    id: "nike-af1-white-001",
    category: "white sneakers",
    brand: "Nike",
    label: "Air Force 1 '07 Trainers in Triple White",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.asos.com/nike/nike-air-force-1-07-trainers-in-triple-white/prd/202389207#colourWayId-202389212",
    image:
      "https://images.asos-media.com/products/nike-air-force-1-07-trainers-in-triple-white/202389207-1-white?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Classic white sneaker",
    isAffiliate: true,
  },
  {
    id: "asos-white-trainers-001",
    category: "white sneakers",
    brand: "ASOS DESIGN",
    label: "Lace Up Trainers in White",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-lace-up-trainers-in-white/prd/208879855#colourWayId-208879856",
    image:
      "https://images.asos-media.com/products/asos-design-lace-up-trainers-in-white/208879855-1-white?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Simple white finish",
    isAffiliate: true,
  },
  {
    id: "zara-white-trainers-001",
    category: "white sneakers",
    brand: "Zara",
    label: "Monochrome Chunky Trainers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/monochrome-chunky-trainers-p12215520.html?v1=495716308&v2=2436324",
    image:
      "https://static.zara.net/assets/public/dc01/a48f/ece04e519032/e645ba939c7d/12215520001-a2/12215520001-a2.jpg?ts=1770648618432&w=560",
    note: "Chunkier sneaker option",
    isAffiliate: true,
  },

  // BLACK SNEAKERS
  {
    id: "jack-jones-black-trainers-001",
    category: "black sneakers",
    brand: "Jack & Jones",
    label: "Faux Leather Trainer in Triple Black",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/jack-jones/jack-jones-faux-leather-trainer-in-triple-black/prd/210257265#colourWayId-210257273",
    image:
      "https://images.asos-media.com/products/jack-jones-faux-leather-trainer-in-triple-black/210257265-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Low-profile black trainer",
    isAffiliate: true,
  },
  {
    id: "zara-black-trainers-001",
    category: "black sneakers",
    brand: "Zara",
    label: "Minimalist Trainers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/essential-sneakers-p12200720.html?v1=495698289&v2=2436336",
    image:
      "https://static.zara.net/assets/public/9632/b745/1e3247e3b9a9/85a77c8e2a30/12200720800-a2/12200720800-a2.jpg?ts=1770882512996&w=560",
    note: "Minimal sneaker option",
    isAffiliate: true,
  },

  // LOAFERS
  {
    id: "zara-leather-loafers-001",
    category: "loafers",
    brand: "Zara",
    label: "Leather Loafers With Track Sole",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/leather-penny-loafers-with-track-sole-p12688720.html?v1=545224585&v2=2436382",
    image:
      "https://static.zara.net/assets/public/3b31/26af/26a4436bb407/0d945f163cc1/12688720800-e1/12688720800-e1.jpg?ts=1776424630182&w=560",
    note: "Dressy with edge",
    isAffiliate: true,
  },
  {
    id: "clarks-linton-loafers-001",
    category: "loafers",
    brand: "Clarks",
    label: "Linton Easy Navy Leather Loafers",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarksoutlet.co.uk/linton-easy/26188680-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26188680_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Soft smart-casual loafer",
    isAffiliate: true,
  },
  {
    id: "clarks-banbury-lo-001",
    category: "loafers",
    brand: "Clarks",
    label: "Banbury Lo",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarks.com/en-gb/banbury-lo/26183661-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26183661_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Clean smart shoe",
    isAffiliate: true,
  },

  // CHELSEA BOOTS FALLBACK
  {
    id: "zara-derby-fallback-001",
    category: "chelsea boots",
    brand: "Zara",
    label: "Leather Derby Shoes",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/leather-derby-shoes-p12407820.html?v1=543528966&v2=2436382",
    image:
      "https://static.zara.net/assets/public/020c/0bba/04664516905d/43cbcb793b9c/12407820800-e1/12407820800-e1.jpg?ts=1776174620660&w=560",
    note: "Smart shoe fallback until Chelsea boots are added",
    isAffiliate: true,
  },
  {
    id: "clarks-banbury-derby-fallback-001",
    category: "chelsea boots",
    brand: "Clarks",
    label: "Banbury Derby",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarks.com/en-gb/banbury-derby/26183659-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26183659_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Smart shoe fallback until Chelsea boots are added",
    isAffiliate: true,
  },
  {
    id: "clarks-hail-tough-fallback-001",
    category: "chelsea boots",
    brand: "Clarks",
    label: "Hail Tough Black Slip Ons",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.clarksoutlet.co.uk/hail-tough/26167000-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26167000_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Smart shoe fallback until Chelsea boots are added",
    isAffiliate: true,
  },

  // BLAZER
  {
    id: "zara-blazer-double-breasted-001",
    category: "blazer",
    brand: "Zara",
    label: "Comfort Fit Double-Breasted Blazer",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/comfort-fit-double-breasted-blazer-p04457232.html?v1=507285462&v2=2436301",
    image:
      "https://static.zara.net/assets/public/f930/d229/048f4f55abd8/dcd7f7283c6d/04457232500-p/04457232500-p.jpg?ts=1770110528838&w=560",
    note: "Strong polished layer",
    isAffiliate: true,
  },
  {
    id: "zara-wool-blend-blazer-001",
    category: "blazer",
    brand: "Zara",
    label: "Comfort Wool Blend Suit Blazer",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/comfort-wool-blend-suit-blazer-p01564116.html?v1=535627421&v2=2436304",
    image:
      "https://static.zara.net/assets/public/ddf0/4876/46774fcea3e4/ad20ad7d1c26/01564116814-p/01564116814-p.jpg?ts=1777030201259&w=560",
    note: "Elevated tailored option",
    isAffiliate: true,
  },
  {
    id: "zara-wool-textured-blazer-001",
    category: "blazer",
    brand: "Zara",
    label: "100% Wool Textured Suit Blazer",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/100-wool-textured-suit-blazer-p01408904.html?v1=527738433&v2=2436311",
    image:
      "https://static.zara.net/assets/public/bb1a/8ab6/1b41478e8ae7/1f385b9a127f/01408904800-p/01408904800-p.jpg?ts=1777028944675&w=560",
    note: "Premium blazer texture",
    isAffiliate: true,
  },

  // HOODIE
  {
    id: "zara-quarter-zip-001",
    category: "hoodie",
    brand: "Zara",
    label: "Basic Quarter-Zip Sweatshirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/basic-quarter-zip-sweatshirt-p00761311.html?v1=495669917&v2=2432232",
    image:
      "https://static.zara.net/assets/public/5bd0/2ee7/1d3e46eaadc4/b659b105ece5/00761311800-p/00761311800-p.jpg?ts=1762277338633&w=560",
    note: "Clean casual layer",
    isAffiliate: true,
  },
  {
    id: "asos-grey-hoodie-001",
    category: "hoodie",
    brand: "ASOS DESIGN",
    label: "Premium Heavyweight Oversized Hoodie in Grey Marl",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-premium-heavyweight-oversized-hoodie-in-400gsm-in-grey-marl/prd/208548236#colourWayId-208548247",
    image:
      "https://images.asos-media.com/products/asos-design-premium-heavyweight-oversized-hoodie-in-400gsm-in-grey-marl/208548236-1-greymarl?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Relaxed heavyweight hoodie",
    isAffiliate: true,
  },
  {
    id: "hm-hoodie-black-001",
    category: "hoodie",
    brand: "H&M",
    label: "Black Loose Fit Hoodie",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.0970819001.html",
    image:
      "https://image.hm.com/assets/hm/47/4f/474fdd8a236c8d920ab4456eef014a1715d3eb1c.jpg?imwidth=1260",
    note: "Easy dark casual layer",
    isAffiliate: true,
  },
  {
    id: "hm-hoodie-loose-001",
    category: "hoodie",
    brand: "H&M",
    label: "Loose Fit Hoodie",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.0970819131.html",
    image:
      "https://image.hm.com/assets/hm/b1/ec/b1ec99a4b8702b35fce0e94a0008aeb19bb0a9a6.jpg?imwidth=1260",
    note: "Relaxed everyday hoodie",
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
    note: "Small statement detail",
    isAffiliate: true,
  },
  {
    id: "asos-ring-001",
    category: "minimal accessory",
    brand: "ASOS DESIGN",
    label: "Waterproof Stainless Steel Star and Pattern Ring in Silver",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-waterproof-stainless-steel-star-and-pattern-ring-in-silver/prd/210352185#colourWayId-210352186",
    image:
      "https://images.asos-media.com/products/asos-design-waterproof-stainless-steel-star-and-pattern-ring-in-silver/210352185-1-silver?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Subtle silver detail",
    isAffiliate: true,
  },
  {
    id: "asos-sunglasses-001",
    category: "minimal accessory",
    brand: "ASOS DESIGN",
    label: "Slim Rectangle Sunglasses in Black",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-slim-rectangle-sunglasses-in-black-with-smoke-lens/prd/209643251#colourWayId-209643264",
    image:
      "https://images.asos-media.com/products/asos-design-slim-rectangle-sunglasses-in-black-with-smoke-lens/209643251-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Clean finishing accessory",
    isAffiliate: true,
  },

  // BLUE JEANS
  {
    id: "levis-501-dark-wash-001",
    category: "blue jeans",
    brand: "Levi's",
    label: "501 Original Jeans - Dark Wash",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.levi.com/GB/en_GB/clothing/men/jeans/501-original-jeans/p/005010194",
    image:
      "https://lscoglobal.scene7.com/is/image/lscoglobal/MB_00501-0194_GLO_CM_DA?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1320&hei=1320",
    note: "Classic blue denim",
    isAffiliate: true,
  },
  {
    id: "hm-blue-jeans-001",
    category: "blue jeans",
    brand: "H&M",
    label: "Denim Blue Regular Jeans",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1309974005.html",
    image:
      "https://image.hm.com/assets/hm/30/46/304652290385fa43550f889f4a51e70123ee8b47.jpg?imwidth=1260",
    note: "Affordable blue jeans",
    isAffiliate: true,
  },
  {
    id: "zara-straight-jeans-001",
    category: "blue jeans",
    brand: "Zara",
    label: "Straight Fit Jeans",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/straight-fit-jeans-p08062430.html?v1=503121056&v2=2432131",
    image:
      "https://static.zara.net/assets/public/f99e/5c7a/f25345609f01/77438bdb269b/04365430400-p/04365430400-p.jpg?ts=1768925434806&w=560",
    note: "Clean straight denim",
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
    note: "Reliable black denim",
    isAffiliate: true,
  },
  {
    id: "hm-regular-jeans-001",
    category: "black jeans",
    brand: "H&M",
    label: "Regular Jeans",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1309974003.html",
    image:
      "https://image.hm.com/assets/hm/39/96/39966692dce4819fd2cb12b0f53e2edc41b69b40.jpg?imwidth=1260",
    note: "Affordable dark denim",
    isAffiliate: true,
  },
  {
    id: "zara-baggy-jeans-001",
    category: "black jeans",
    brand: "Zara",
    label: "Baggy Fit Jeans",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/baggy-fit-jeans-p04048407.html?v1=498644966&v2=2432131",
    image:
      "https://static.zara.net/assets/public/d6b6/a2a8/58dd45cfa25e/b395a2ef40b5/04806409800-p/04806409800-p.jpg?ts=1770288516641&w=560",
    note: "Relaxed dark denim",
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

    const next = pickRandomProduct(pool);
    if (!next) continue;

    selected.push(next);
    seen.add(next.id);
  }

  return selected;
}
