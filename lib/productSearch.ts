import type { BudgetTier, Product, ProductCategory, ProductRole } from "./products";

export type ProductSearchRequirement = {
  role?: ProductRole;
  category?: string;
  query?: string;
  colors?: string[];
  occasion?: string;
  vibe?: string;
  budgetTier?: BudgetTier;
  excludeCategories?: string[];
  limit?: number;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Local search abstraction.
 * TODO: Swap `products` source for DB/feed/API once ingestion is added.
 */
export function searchProducts(
  requirements: ProductSearchRequirement,
  products: Product[]
): Product[] {
  const limit = requirements.limit ?? 6;
  const excluded = new Set((requirements.excludeCategories ?? []).map((x) => x.toLowerCase()));

  let matches = products.filter((product) => !excluded.has(product.category.toLowerCase()));

  if (requirements.role) {
    matches = matches.filter((product) => product.role === requirements.role);
  }

  if (requirements.category) {
    const category = requirements.category.toLowerCase().trim() as ProductCategory | string;
    matches = matches.filter((product) => product.category === category);
  }

  if (requirements.budgetTier) {
    const budgetMatches = matches.filter((product) => product.budgetTier === requirements.budgetTier);
    if (budgetMatches.length > 0) matches = budgetMatches;
  }

  if (requirements.query) {
    const query = requirements.query.toLowerCase().trim();
    matches = matches.filter((product) => {
      const haystack = `${product.name} ${product.brand} ${product.styleTags.join(" ")}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  if (requirements.colors && requirements.colors.length > 0) {
    const colors = requirements.colors.map((color) => color.toLowerCase());
    matches = matches.filter((product) =>
      product.colors.some((color) => colors.includes(color.toLowerCase()))
    );
  }

  if (requirements.occasion) {
    const occasion = requirements.occasion.toLowerCase();
    matches = matches.filter((product) =>
      product.occasions.some((value) => value.toLowerCase() === occasion)
    );
  }

  if (requirements.vibe) {
    const vibe = requirements.vibe.toLowerCase();
    matches = matches.filter((product) => product.vibes.some((value) => value.toLowerCase() === vibe));
  }

  return shuffle(matches).slice(0, limit);
}
