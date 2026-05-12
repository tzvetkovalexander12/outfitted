import { searchProducts } from "./productSearch";

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
export type BudgetTier = Budget;
export type ProductSource = "manual" | "feed" | "api" | "scrape";
export type ProductRole = "top" | "bottom" | "shoes" | "layer" | "outerwear" | "accessory";

/**
 * Raw catalog or feed row before normalization.
 * Use `normalizeProduct` before recommendation/search logic.
 */
export interface ExternalProduct {
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
  name?: string;
  role?: ProductRole;
  imageUrl?: string;
  productUrl?: string;
  currency?: string;
  budgetTier?: BudgetTier;
  colors?: string[];
  occasions?: string[];
  vibes?: string[];
  styleTags?: string[];
  source?: ProductSource;
}

/**
 * Normalized product for search and recommendations. Core merchandising fields are always set.
 */
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  role: ProductRole;
  brand: string;
  label: string;
  imageUrl: string;
  productUrl: string;
  price: string;
  currency: string;
  budgetTier: BudgetTier;
  budget: Budget;
  colors: string[];
  occasions: string[];
  vibes: string[];
  styleTags: string[];
  source: ProductSource;
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

function pickRandomProduct<T extends Product>(products: readonly T[]): T | undefined {
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

function isRealChelseaBoot(product: Product): boolean {
  if (product.category !== "chelsea boots") return false;
  const label = product.label.toLowerCase();
  const url = product.url.toLowerCase();
  return label.includes("chelsea") || url.includes("chelsea");
}

function isBeltAccessory(product: Product): boolean {
  if (product.category !== "minimal accessory") return false;
  const label = product.label.toLowerCase();
  const url = product.url.toLowerCase();
  return label.includes("belt") || url.includes("belt");
}

function inferRole(category: ProductCategory): ProductRole {
  if (category === "white t-shirt" || category === "black t-shirt" || category === "oxford shirt") {
    return "top";
  }
  if (category === "chinos" || category === "tailored trousers" || category === "blue jeans" || category === "black jeans") {
    return "bottom";
  }
  if (category === "white sneakers" || category === "black sneakers" || category === "loafers" || category === "chelsea boots") {
    return "shoes";
  }
  if (category === "overshirt" || category === "blazer") return "layer";
  if (category === "minimal accessory") return "accessory";
  return "outerwear";
}

function inferColors(product: ExternalProduct): string[] {
  const text = `${product.label} ${product.note}`.toLowerCase();
  const palette = ["black", "white", "beige", "blue", "brown", "grey", "gray", "tan", "stone"];
  const colors = palette.filter((color) => text.includes(color));
  return colors.length > 0 ? colors : ["neutral"];
}

function inferOccasions(category: ProductCategory): string[] {
  if (category === "blazer" || category === "loafers" || category === "chelsea boots") {
    return ["date", "dinner", "party", "work"];
  }
  if (category === "overshirt" || category === "hoodie") return ["casual-day", "vacation", "date"];
  if (category === "tailored trousers" || category === "oxford shirt") return ["date", "dinner", "work"];
  return ["casual-day", "vacation", "date", "dinner"];
}

function inferVibes(category: ProductCategory): string[] {
  if (category === "blazer" || category === "chelsea boots" || category === "tailored trousers") {
    return ["bold", "expensive-looking", "minimal"];
  }
  if (category === "minimal accessory") return ["minimal", "bold", "expensive-looking", "safe"];
  if (category === "blue jeans" || category === "hoodie") return ["safe", "minimal"];
  return ["safe", "minimal", "bold"];
}

function inferStyleTags(product: ExternalProduct): string[] {
  const tags = new Set<string>([
    product.category,
    product.brand.toLowerCase(),
    ...inferColors(product),
  ]);
  if (product.category === "blazer" || product.category === "tailored trousers") tags.add("sharper");
  if (product.category === "overshirt" || product.category === "hoodie") tags.add("relaxed");
  if (product.category === "minimal accessory") tags.add("finishing");
  return Array.from(tags);
}

export function normalizeProduct(external: ExternalProduct): Product {
  return {
    id: external.id,
    category: external.category,
    brand: external.brand,
    label: external.label,
    price: external.price,
    budget: external.budget,
    region: external.region,
    url: external.url,
    image: external.image,
    note: external.note,
    isAffiliate: external.isAffiliate,
    name: external.name ?? external.label,
    role: external.role ?? inferRole(external.category),
    imageUrl: external.imageUrl ?? external.image,
    productUrl: external.productUrl ?? external.url,
    currency: external.currency ?? "EUR",
    budgetTier: external.budgetTier ?? external.budget,
    colors: external.colors ?? inferColors(external),
    occasions: external.occasions ?? inferOccasions(external.category),
    vibes: external.vibes ?? inferVibes(external.category),
    styleTags: external.styleTags ?? inferStyleTags(external),
    source: external.source ?? "manual",
  };
}

/**
 * Keeps accessory picks varied across consecutive results in one session.
 * We only remember whether the previous selected accessory was a belt.
 */
let lastSelectedAccessoryWasBelt = false;

export const PRODUCTS: ExternalProduct[] = [
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
    note: "Adds clean contrast and keeps the outfit easy to wear.",
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
    note: "Adds clean contrast and keeps the outfit easy to wear.",
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
    note: "Adds clean contrast and keeps the outfit easy to wear.",
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
    note: "Keeps the outfit sharp and creates a darker, more evening-ready base.",
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
    note: "Keeps the outfit sharp and creates a darker, more evening-ready base.",
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
    note: "Keeps the outfit sharp and creates a darker, more evening-ready base.",
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
    note: "Adds structure and makes the outfit feel more polished.",
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
    note: "Adds structure and makes the outfit feel more polished.",
    isAffiliate: true,
  },
  {
    id: "massimo-dutti-oxford-shirt-001",
    category: "oxford shirt",
    brand: "Massimo Dutti",
    label: "Regular Fit Oxford Shirt",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.massimodutti.com/gb/regular-fit-oxford-shirt-l01993255?pelement=57401769&banner=true",
    image: "https://static.massimodutti.net/3/static2/itxwebstandard/logo/logo.png",
    note: "Adds structure and makes the outfit feel more polished.",
    isAffiliate: true,
  },
  {
    id: "reiss-oxford-soft-blue-001",
    category: "oxford shirt",
    brand: "Reiss",
    label: "Soft Blue Oxford Shirt",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.reiss.com/style/st378878/d40078",
    image:
      "https://cdn.platform.next/common/items/default/default/itemimages/3_4Ratio/product/lge/D40078s.jpg?im=Resize,width=750",
    note: "Adds structure and makes the outfit feel more polished.",
    isAffiliate: true,
  },
  {
    id: "reiss-oxford-white-001",
    category: "oxford shirt",
    brand: "Reiss",
    label: "White Oxford Shirt",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.reiss.com/style/st378878/d43750",
    image:
      "https://cdn.platform.next/common/items/default/default/itemimages/3_4Ratio/product/lge/D43750s.jpg?im=Resize,width=750",
    note: "Adds structure and makes the outfit feel more polished.",
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
    note: "Adds a relaxed layer without making the outfit too formal.",
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
    note: "Adds a relaxed layer without making the outfit too formal.",
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
    note: "Adds a relaxed layer without making the outfit too formal.",
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
    note: "Adds a relaxed layer without making the outfit too formal.",
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
    note: "Keeps the outfit clean while staying casual.",
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
    note: "Keeps the outfit clean while staying casual.",
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
    note: "Keeps the outfit clean while staying casual.",
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
    note: "Sharpens the silhouette and makes the outfit feel more refined.",
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
    note: "Sharpens the silhouette and makes the outfit feel more refined.",
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
    note: "Sharpens the silhouette and makes the outfit feel more refined.",
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
    note: "Lightens the outfit and keeps it casual.",
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
    note: "Lightens the outfit and keeps it casual.",
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
    note: "Lightens the outfit and keeps it casual.",
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
    note: "Keeps the look grounded and easy to wear.",
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
    note: "Keeps the look grounded and easy to wear.",
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
    note: "Adds polish without feeling overdressed.",
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
    note: "Adds polish without feeling overdressed.",
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
    note: "Adds polish without feeling overdressed.",
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
    note: "Gives the outfit a sharper finish and stronger silhouette.",
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
    note: "Gives the outfit a sharper finish and stronger silhouette.",
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
    note: "Gives the outfit a sharper finish and stronger silhouette.",
    isAffiliate: true,
  },
  {
    id: "clarks-newford-easy-chelsea-001",
    category: "chelsea boots",
    brand: "Clarks",
    label: "Newford Easy Chelsea Boots",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.clarks.com/en-gb/newford-easy/26183379-p",
    image:
      "https://cdn.media.amplience.net/i/clarks/26183379_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=75",
    note: "Gives the outfit a sharper finish and stronger silhouette.",
    isAffiliate: true,
  },
  {
    id: "zara-leather-chelsea-boots-black-001",
    category: "chelsea boots",
    brand: "Zara",
    label: "Black Leather Chelsea Boots",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/leather-chelsea-boots-p12028720.html?v1=495702943&v2=2436333",
    image:
      "https://static.zara.net/assets/public/bb97/4730/a0ce4ee29ce4/708623fff7e4/12028720800-a3/12028720800-a3.jpg?ts=1761304450180&w=560",
    note: "Gives the outfit a sharper finish and stronger silhouette.",
    isAffiliate: true,
  },
  {
    id: "zara-leather-chelsea-boots-brown-001",
    category: "chelsea boots",
    brand: "Zara",
    label: "Brown Leather Chelsea Boots",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/leather-chelsea-boots-p12000720.html?v1=495694118&v2=2436333",
    image:
      "https://static.zara.net/assets/public/b5e2/8bd8/e2d1476e9809/b35c927844f5/12000720002-a2/12000720002-a2.jpg?ts=1765365449937&w=560",
    note: "Gives the outfit a sharper finish and stronger silhouette.",
    isAffiliate: true,
  },
  {
    id: "zara-pointed-chelsea-boots-001",
    category: "chelsea boots",
    brand: "Zara",
    label: "Pointed Chelsea Boots",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.zara.com/uk/en/pointed-chelsea-boots-p12060720.html?v1=495669696&v2=2436333",
    image:
      "https://static.zara.net/assets/public/2a7e/b432/00304bd18d43/448a72725c57/12060720800-a2/12060720800-a2.jpg?ts=1768831691541&w=560",
    note: "Gives the outfit a sharper finish and stronger silhouette.",
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
    note: "Adds structure and makes the outfit feel intentional.",
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
    note: "Adds structure and makes the outfit feel intentional.",
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
    note: "Adds structure and makes the outfit feel intentional.",
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
    note: "Makes the outfit more relaxed and comfortable.",
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
    note: "Makes the outfit more relaxed and comfortable.",
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
    note: "Makes the outfit more relaxed and comfortable.",
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
    note: "Makes the outfit more relaxed and comfortable.",
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
    note: "Adds a small finishing detail without overpowering the outfit.",
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
    note: "Adds a small finishing detail without overpowering the outfit.",
    isAffiliate: true,
  },
  {
    id: "hm-necklace-bracelet-black-001",
    category: "minimal accessory",
    brand: "H&M",
    label: "Black Necklace and Bracelet Set",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1294541002.html",
    image:
      "https://image.hm.com/assets/hm/1c/eb/1ceb542b546b179f0302ea1a99c653a9904f4fab.jpg?imwidth=1260",
    note: "Adds a small finishing detail without overpowering the outfit.",
    isAffiliate: true,
  },
  {
    id: "zara-embossed-leather-belt-001",
    category: "minimal accessory",
    brand: "Zara",
    label: "Embossed Leather Belt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/embossed-leather-belt-p05919411.html?v1=500524833&v2=2436444",
    image:
      "https://static.zara.net/assets/public/ba50/b7e0/0ed843fca37e/2e9b29dcc7af/05919411800-a1/05919411800-a1.jpg?ts=1769771570758&w=560",
    note: "Adds a small finishing detail without overpowering the outfit.",
    isAffiliate: true,
  },
  {
    id: "zara-sheepskin-leather-belt-001",
    category: "minimal accessory",
    brand: "Zara",
    label: "Leather Belt With Sheepskin Finish",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/sheepskin-finish-leather-belt-p02823402.html?v1=495693873&v2=2436444",
    image:
      "https://static.zara.net/assets/public/c679/41fe/75d34bfebcff/c6977e0c6015/02823402800-e1/02823402800-e1.jpg?ts=1763456138005&w=560",
    note: "Adds a small finishing detail without overpowering the outfit.",
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
    note: "Keeps the outfit grounded and easy to style.",
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
    note: "Keeps the outfit grounded and easy to style.",
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
    note: "Keeps the outfit grounded and easy to style.",
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
    note: "Keeps the outfit grounded and easy to style.",
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
    note: "Keeps the outfit grounded and easy to style.",
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
    note: "Keeps the outfit grounded and easy to style.",
    isAffiliate: true,
  },

  // CURATED IMPORT (bookmark export): shirts, layers, denim, trainers, trousers
  {
    id: "asos-liquor-n-poker-boxy-micro-check-shirt-black-brown",
    category: "oxford shirt",
    brand: "Liquor N Poker",
    label: "Black & Brown Check Shirt",
    name: "Black & Brown Check Shirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.asos.com/liquor-n-poker/liquor-n-poker-boxy-micro-check-shirt-black-brown/prd/210348960#colourWayId-210348962",
    image:
      "https://images.asos-media.com/products/liquor-n-poker-boxy-micro-check-shirt-black-brown/210348960-1-multi?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Clean structure with a bold micro-check pattern that works for evenings out or laid-back plans.",
    isAffiliate: false,
    colors: ["black", "brown"],
    occasions: ["casual-day", "party", "dinner", "date"],
    vibes: ["bold", "safe"],
    styleTags: ["check", "boxy", "casual", "statement-light"],
    budgetTier: "mid",
  },
  {
    id: "zara-regular-fit-seersucker-shirt-ecru-green",
    category: "oxford shirt",
    brand: "Zara",
    label: "Ecru Green Seersucker Shirt",
    name: "Ecru Green Seersucker Shirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/regular-fit-seersucker-shirt-p00526458.html?v1=522390991&v2=2431994",
    image:
      "https://static.zara.net/assets/public/ae07/c73c/4f4d486e83c2/89269c60d757/00526458058-p/00526458058-p.jpg?ts=1777991759834&w=1024",
    note: "Clean seersucker texture that reads minimal and pulled-together for warm days or smarter casual plans.",
    isAffiliate: false,
    colors: ["ecru", "green"],
    occasions: ["casual-day", "vacation", "dinner", "date"],
    vibes: ["minimal", "expensive-looking", "safe"],
    styleTags: ["seersucker", "textured", "summer", "smart-casual"],
    budgetTier: "mid",
  },
  {
    id: "zara-regular-fit-seersucker-shirt-neutral",
    category: "oxford shirt",
    brand: "Zara",
    label: "Neutral Seersucker Shirt",
    name: "Neutral Seersucker Shirt",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/regular-fit-seersucker-shirt-p00526458.html?v1=522390990&v2=2431994",
    image:
      "https://static.zara.net/assets/public/497f/89b6/ed034a7cbf6e/bc1f921957de/00526458069-p/00526458069-p.jpg?ts=1777974010408&w=560",
    note: "Clean seersucker finish that stays versatile across casual days, travel, and smarter evenings.",
    isAffiliate: false,
    colors: ["neutral"],
    occasions: ["casual-day", "vacation", "dinner", "date"],
    vibes: ["minimal", "safe", "expensive-looking"],
    styleTags: ["seersucker", "textured", "smart-casual"],
    budgetTier: "mid",
  },
  {
    id: "asos-design-grey-rib-harrington-jacket",
    category: "overshirt",
    brand: "ASOS DESIGN",
    label: "Grey Rib Harrington Jacket",
    name: "Grey Rib Harrington Jacket",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-co-ord-oversized-zip-through-harrington-jacket-in-grey-rib/prd/210389296#colourWayId-210389297",
    image:
      "https://images.asos-media.com/products/asos-design-co-ord-oversized-zip-through-harrington-jacket-in-grey-rib/210389296-1-lunarrock?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Adds a relaxed zip-through layer with subtle rib texture without pushing the outfit too formal.",
    isAffiliate: false,
    colors: ["grey"],
    occasions: ["casual-day", "date", "party"],
    vibes: ["minimal", "safe", "bold"],
    styleTags: ["harrington", "ribbed", "casual layer", "relaxed"],
    budgetTier: "affordable",
  },
  {
    id: "hm-light-beige-linen-blend-overshirt",
    category: "overshirt",
    brand: "H&M",
    label: "Light Beige Linen Overshirt",
    name: "Light Beige Linen Overshirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1332244002.html",
    image:
      "https://image.hm.com/assets/hm/4e/a9/4ea90da0ec8997f13de7c27463b962ed62c7af03.jpg?imwidth=1260",
    note: "Adds a lightweight linen-blend layer that keeps outfits airy for holidays and easy daytime wear.",
    isAffiliate: false,
    colors: ["light beige"],
    occasions: ["casual-day", "vacation", "date"],
    vibes: ["minimal", "safe", "expensive-looking"],
    styleTags: ["linen-blend", "lightweight", "summer", "easy structure"],
    budgetTier: "affordable",
  },
  {
    id: "hm-linen-blend-overshirt",
    category: "overshirt",
    brand: "H&M",
    label: "Neutral Linen Overshirt",
    name: "Neutral Linen Overshirt",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www2.hm.com/en_gb/productpage.1332244001.html",
    image:
      "https://image.hm.com/assets/hm/69/63/696305d8dd34bea082ee663db8ba3cea8f7f6db2.jpg?imwidth=1260",
    note: "Adds an easy linen-blend layer for relaxed outfits while keeping the silhouette tidy.",
    isAffiliate: false,
    colors: ["neutral"],
    occasions: ["casual-day", "vacation", "date"],
    vibes: ["minimal", "safe"],
    styleTags: ["linen-blend", "lightweight", "easy structure"],
    budgetTier: "affordable",
  },
  {
    id: "zara-cropped-cotton-cupro-jacket",
    category: "overshirt",
    brand: "Zara",
    label: "Cropped Cotton Jacket",
    name: "Cropped Cotton Jacket",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/cropped-fit-cotton---cupro-jacket-p07484467.html?v1=521943852&v2=2536906",
    image:
      "https://static.zara.net/assets/public/0ca3/000e/e60d44079d55/7e30e7acc61e/07484467407-p/07484467407-p.jpg?ts=1777962383078&w=560",
    note: "Adds a cropped, structured layer that sharpens casual looks without feeling stiff.",
    isAffiliate: false,
    colors: ["brown"],
    occasions: ["casual-day", "date", "dinner"],
    vibes: ["minimal", "expensive-looking", "bold"],
    styleTags: ["cropped", "structured", "smart-casual", "light layer"],
    budgetTier: "mid",
  },
  {
    id: "zara-denim-zip-up-jacket",
    category: "overshirt",
    brand: "Zara",
    label: "Denim Zip Jacket",
    name: "Denim Zip Jacket",
    price: "Check price",
    budget: "mid",
    region: "Europe",
    url: "https://www.zara.com/uk/en/denim-jacket-with-zip-p03991489.html?v1=527048953&v2=2536906",
    image:
      "https://static.zara.net/assets/public/446a/cbcd/cd3d44b2b6de/cf919328a610/03991489400-p/03991489400-p.jpg?ts=1778140038296&w=560",
    note: "Adds a zip-front denim layer that keeps everyday outfits grounded and easy to style.",
    isAffiliate: false,
    colors: ["blue"],
    occasions: ["casual-day", "party", "date"],
    vibes: ["safe", "bold", "minimal"],
    styleTags: ["denim", "zip-up", "casual layer"],
    budgetTier: "mid",
  },
  {
    id: "arket-white-leather-trainers",
    category: "white sneakers",
    brand: "ARKET",
    label: "White Leather Trainers",
    name: "White Leather Trainers",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.arket.com/en-eu/product/leather-trainers-white-1277664001/",
    image:
      "https://media.arket.com/assets/006/fc/31/fc31a79f2ca42135e4a31f9c320eb214704b45fc_m-1.jpg",
    note: "Lightens the outfit with a clean leather sneaker that stays minimal and versatile.",
    isAffiliate: false,
    colors: ["white"],
    occasions: ["casual-day", "date", "dinner", "vacation"],
    vibes: ["minimal", "expensive-looking", "safe"],
    styleTags: ["clean", "leather", "premium sneaker", "minimal"],
    budgetTier: "premium",
  },
  {
    id: "asos-design-black-tapered-jeans",
    category: "black jeans",
    brand: "ASOS DESIGN",
    label: "Black Tapered Jeans",
    name: "Black Tapered Jeans",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-tapered-jeans-in-black/prd/209182918#colourWayId-209182926",
    image:
      "https://images.asos-media.com/products/asos-design-tapered-jeans-in-black/209182918-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Keeps the lower half sharp with clean black denim that pairs easily with hoodies or smarter tops.",
    isAffiliate: false,
    colors: ["black"],
    occasions: ["casual-day", "date", "dinner", "party"],
    vibes: ["safe", "minimal", "bold"],
    styleTags: ["tapered", "clean black denim", "casual sharp"],
    budgetTier: "affordable",
  },
  {
    id: "asos-design-black-smart-straight-trousers",
    category: "tailored trousers",
    brand: "ASOS DESIGN",
    label: "Black Smart Trousers",
    name: "Black Smart Trousers",
    price: "Check price",
    budget: "affordable",
    region: "Europe",
    url: "https://www.asos.com/asos-design/asos-design-smart-co-ord-straight-trousers-in-black/prd/209079581",
    image:
      "https://images.asos-media.com/products/asos-design-smart-co-ord-straight-trousers-in-black/209079581-1-black?$n_750w$&wid=750&hei=750&fit=crop",
    note: "Sharpens the silhouette with a straight, relaxed-smart trouser that works for dinners, dates, or work.",
    isAffiliate: false,
    colors: ["black"],
    occasions: ["dinner", "date", "work", "party"],
    vibes: ["minimal", "expensive-looking", "safe"],
    styleTags: ["smart", "straight", "clean lower half", "relaxed-sharp"],
    budgetTier: "affordable",
  },
  {
    id: "cos-black-signature-straight-leg-jeans",
    category: "black jeans",
    brand: "COS",
    label: "Black Straight-Leg Jeans",
    name: "Black Straight-Leg Jeans",
    price: "Check price",
    budget: "premium",
    region: "Europe",
    url: "https://www.cos.com/en-ie/men/menswear/jeans/regular-fit/product/signature-straight-leg-jeans-black-1232254017",
    image:
      "https://media.cos.com/assets/001/13/e2/13e272270bbe407b236e07e3cb91664df095fd3d_xxl-1.jpg?imwidth=800",
    note: "Keeps black denim feeling refined with a straight signature cut that stays minimal and wardrobe-ready.",
    isAffiliate: false,
    colors: ["black"],
    occasions: ["casual-day", "date", "dinner", "party"],
    vibes: ["minimal", "expensive-looking", "safe"],
    styleTags: ["straight-leg", "premium denim", "clean", "minimal"],
    budgetTier: "premium",
  },
];

export const NORMALIZED_PRODUCTS: Product[] = PRODUCTS.map(normalizeProduct);

/** Context for bottoms/shoes when the uploaded item is a dark hoodie (linen / pale-chino guard). */
export type OutfitRecommendationContext = {
  uploadedItemType?: string;
  uploadedItemColor?: string;
  occasion?: string;
  vibe?: string;
};

function normalizeCtx(s?: string): string {
  return (s ?? "").toLowerCase().trim();
}

function isHoodieOrSweatshirtType(itemType?: string): boolean {
  const t = normalizeCtx(itemType);
  return t.includes("hoodie") || t.includes("sweatshirt");
}

function isDarkHoodieUpload(itemType?: string, itemColor?: string): boolean {
  if (!isHoodieOrSweatshirtType(itemType)) return false;
  const c = normalizeCtx(itemColor);
  const t = normalizeCtx(itemType);
  if (["black", "charcoal", "navy", "dark", "graphite", "ink"].some((x) => c.includes(x))) {
    return true;
  }
  if (t.includes("black") || t.includes("dark") || t.includes("navy")) return true;
  return false;
}

/** Light linen suit-style trouser — not the default with a dark hoodie unless warm-weather context. */
function isLightLinenBottom(product: Product): boolean {
  const text = `${product.label} ${product.note}`.toLowerCase();
  if (!text.includes("linen")) return false;
  if (product.colors.some((c) => /black|navy|charcoal|graphite|ink/i.test(c))) {
    return false;
  }
  if (/\bblack\b|\bcharcoal\b|\bnavy\b|\bink\b|\bdark (grey|gray|blue|brown)\b/.test(text)) {
    return false;
  }
  return true;
}

function isLightBeigeChino(product: Product): boolean {
  if (product.category !== "chinos") return false;
  const text = `${product.label} ${product.note}`.toLowerCase();
  if (/\bblack\b|\bcharcoal\b|\bnavy\b|\bdark\b/.test(text)) return false;
  return (
    /\b(beige|ecru|tan|cream|sand|oat|stone)\b/.test(text) ||
    /light (beige|stone|tan|khaki)/.test(text)
  );
}

function allowsWarmWeatherLightBottoms(occasion?: string, vibe?: string): boolean {
  const o = normalizeCtx(occasion);
  const v = normalizeCtx(vibe);
  if (o === "vacation") return true;
  if (o === "casual-day") return true;
  if (o === "dinner" && v === "expensive-looking") return true;
  return false;
}

function shouldDeferLightBottomsForDarkHoodie(ctx?: OutfitRecommendationContext): boolean {
  if (!ctx) return false;
  if (!isDarkHoodieUpload(ctx.uploadedItemType, ctx.uploadedItemColor)) return false;
  if (allowsWarmWeatherLightBottoms(ctx.occasion, ctx.vibe)) return false;
  return true;
}

function filterPrioritizedForDarkHoodie(
  category: ProductCategory,
  prioritized: Product[],
  ctx: OutfitRecommendationContext | undefined
): Product[] {
  if (!shouldDeferLightBottomsForDarkHoodie(ctx)) return prioritized;

  if (category === "tailored trousers") {
    const withoutLightLinen = prioritized.filter((p) => !isLightLinenBottom(p));
    return withoutLightLinen.length > 0 ? withoutLightLinen : prioritized;
  }

  if (category === "chinos") {
    const withoutPale = prioritized.filter((p) => !isLightBeigeChino(p));
    return withoutPale.length > 0 ? withoutPale : prioritized;
  }

  return prioritized;
}

export function getProductsForCategories(
  categories: string[],
  budget: Budget,
  context?: OutfitRecommendationContext
): Product[] {
  const selected: Product[] = [];
  const seen = new Set<string>();

  for (const rawCategory of categories) {
    if (selected.length >= 4) break;

    const normalized = normalizeCategoryString(rawCategory);
    const category = toProductCategory(normalized);
    if (!category) continue;

    // TODO: Replace local search with database/feed search when live product ingestion lands.
    const searchResults = searchProducts(
      {
        category,
        budgetTier: budget,
        limit: 8,
      },
      NORMALIZED_PRODUCTS
    ).filter((product) => !seen.has(product.id));

    const prioritized =
      category === "oxford shirt"
        ? searchResults.filter(isStrongOxfordShirt).length > 0
          ? searchResults.filter(isStrongOxfordShirt)
          : searchResults
        : category === "chelsea boots"
          ? searchResults.filter(isRealChelseaBoot).length > 0
            ? searchResults.filter(isRealChelseaBoot)
            : searchResults
          : category === "minimal accessory"
            ? searchResults.filter((product) => !isBeltAccessory(product)).length > 0
              ? searchResults.filter((product) => !isBeltAccessory(product))
              : searchResults
            : searchResults;

    const prioritizedForPick = filterPrioritizedForDarkHoodie(
      category,
      prioritized,
      context
    );

    let next: Product | undefined;

    if (category === "minimal accessory") {
      const nonBeltAccessories = prioritizedForPick.filter((product) => !isBeltAccessory(product));
      next =
        lastSelectedAccessoryWasBelt && nonBeltAccessories.length > 0
          ? pickRandomProduct(nonBeltAccessories)
          : pickRandomProduct(prioritizedForPick);

      if (next) lastSelectedAccessoryWasBelt = isBeltAccessory(next);
    } else {
      next = pickRandomProduct(prioritizedForPick);
    }

    if (!next) continue;

    selected.push(next);
    seen.add(next.id);
  }

  return selected;
}
