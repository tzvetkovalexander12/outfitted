export type StylingContext = {
  uploadedItemType?: string;
  uploadedItemColor?: string;
  occasion?: string;
  vibe?: string;
  budget?: string;
  selectedCategories?: string[];
  aiReason?: string;
};

export type ProductNoteContext = StylingContext & {
  productName?: string;
  brand?: string;
  category?: string;
  role?: string;
  productNote?: string;
};

function normalize(value?: string): string {
  return (value ?? "").toLowerCase().trim();
}

function isHoodieItem(itemType?: string): boolean {
  const item = normalize(itemType);
  return item.includes("hoodie") || item.includes("sweatshirt");
}

export function getStylistDirection(context: StylingContext): string {
  const provided = context.aiReason?.trim();
  if (provided && provided.length >= 24) return provided;

  const itemType = normalize(context.uploadedItemType) || "uploaded piece";
  const occasion = normalize(context.occasion);
  const vibe = normalize(context.vibe);
  const hoodieBase = isHoodieItem(context.uploadedItemType);
  const itemColor = normalize(context.uploadedItemColor);
  const hasTailoredTrousers = (context.selectedCategories ?? []).some(
    (category) => normalize(category) === "tailored trousers"
  );

  if (hoodieBase && (occasion === "date" || occasion === "dinner")) {
    if (hasTailoredTrousers && itemColor === "black") {
      return "Your hoodie keeps a relaxed-sharp base. A cleaner, darker lower half balances the look so it feels intentional and wearable — polished off-duty, not a suit formula.";
    }
    if (hasTailoredTrousers) {
      return "Your hoodie keeps the base relaxed, and the trouser sharpens the lower half with cleaner lines. The point is relaxed-sharp and date-ready, not office-formal.";
    }
    return "Your hoodie stays relaxed, then the lower half gets tidier so the outfit feels more intentional for date context — polished off-duty, not formal.";
  }
  if (
    hoodieBase &&
    (occasion === "casual-day" || occasion === "vacation" || vibe === "safe" || vibe === "minimal")
  ) {
    return "This keeps the hoodie easy and wearable, then cleans up the surrounding pieces. The result feels relaxed-sharp, intentional, and more considered than a basic hoodie combo.";
  }
  if (occasion === "vacation") {
    return "This leans relaxed and breathable — comfort-first pieces that still read considered when you are away from home.";
  }
  if (vibe === "expensive-looking") {
    return `This leans into a cleaner, sharper version of your ${itemType}. The outfit uses better shape and restraint so it feels polished without looking overdone.`;
  }
  if (vibe === "bold") {
    return `Your ${itemType} sets the base, then one stronger piece drives the look. The rest is kept clean so the outfit feels confident, styled, and easy to wear.`;
  }

  return `Your ${itemType} sets the base, and the rest of the outfit is built to balance it for ${occasion || "your selected context"}. The final look stays wearable while feeling intentional and put together.`;
}

export function getStylingContrastNote(context: StylingContext): string | null {
  const occasion = normalize(context.occasion);
  const vibe = normalize(context.vibe);
  const hoodieBase = isHoodieItem(context.uploadedItemType);
  const itemColor = normalize(context.uploadedItemColor);
  const hasTailoredTrousers = (context.selectedCategories ?? []).some(
    (category) => normalize(category) === "tailored trousers"
  );
  const hasWhiteSneakers = (context.selectedCategories ?? []).some(
    (category) => normalize(category) === "white sneakers"
  );

  if (hoodieBase && (occasion === "date" || occasion === "dinner")) {
    if (hasTailoredTrousers && itemColor === "black" && hasWhiteSneakers) {
      return "These trousers give the lower half a cleaner line under the hoodie. The mix stays casual, but the proportions feel more intentional than default denim — relaxed-sharp, not dressy.";
    }
    if (hasTailoredTrousers) {
      return "These bottoms sharpen the hoodie by tidying the lower half. The point is relaxed-sharp and wearable, not formal.";
    }
    return "Blue jeans would work, but they can read too basic here. A darker or sharper lower half keeps the hoodie casual while making the whole look more intentional.";
  }
  if (hoodieBase && vibe === "expensive-looking") {
    return "The point is not to make the hoodie formal. It is cleaner contrast so the outfit feels intentional and relaxed-sharp.";
  }
  if (vibe === "minimal") {
    return "Minimal does not mean plain. The outfit relies on cleaner shapes and fewer distractions.";
  }
  if (vibe === "bold") {
    return "Bold works best when one or two pieces lead the outfit. The rest should support the statement instead of competing.";
  }
  if (occasion === "vacation") {
    return "Vacation calls for relaxed structure and easy layers — pieces that feel breathable and low-effort without looking careless.";
  }

  return null;
}

export function getUpgradeMove(context: StylingContext): string | null {
  const occasion = normalize(context.occasion);
  const vibe = normalize(context.vibe);
  const hoodieBase = isHoodieItem(context.uploadedItemType);

  if (hoodieBase && (occasion === "date" || occasion === "dinner")) {
    return "Swap clean sneakers for Chelsea boots if you want the outfit to feel more date-night ready.";
  }
  if (hoodieBase && (occasion === "casual-day" || vibe === "safe" || vibe === "minimal")) {
    return "Add an overshirt if you want the hoodie to feel more layered and intentional.";
  }
  if (vibe === "minimal") {
    return "Keep accessories small. One clean watch or simple chain is enough.";
  }
  if (vibe === "expensive-looking") {
    return "Choose cleaner textures and sharper shoes before adding loud pieces.";
  }
  if (occasion === "party" || vibe === "bold") {
    return "Let one piece carry the attention, then keep the rest clean.";
  }

  return "Use one cleaner shoe or layer upgrade to make the look feel sharper without overcomplicating it.";
}

function getCategoryRoleNote(context: ProductNoteContext): string | null {
  const category = normalize(context.category);
  const hoodieBase = isHoodieItem(context.uploadedItemType);
  const occasion = normalize(context.occasion);
  const vibe = normalize(context.vibe);
  const affordable = normalize(context.budget) === "affordable";

  if (category === "black jeans") {
    if (hoodieBase && occasion !== "casual-day") {
      return "Cleaner than blue denim here. They keep the hoodie casual while making the outfit sharper.";
    }
    return "Sharpens the lower half while keeping the outfit easy to wear.";
  }
  if (category === "blue jeans") {
    if (hoodieBase && occasion !== "casual-day" && !(vibe === "safe" && affordable)) {
      return "Blue denim keeps this more familiar, but it is softer than the sharper options for this direction.";
    }
    return "Keeps the look casual and familiar. Best when the outfit direction is safe or relaxed.";
  }
  if (category === "tailored trousers") {
    if (hoodieBase)
      return "Cleaner lower half under a hoodie — sharper lines without turning the outfit into office tailoring.";
    return "Adds a cleaner shape so the outfit feels more intentional without becoming too formal.";
  }
  if (category === "white sneakers") {
    if (hoodieBase) return "Keeps the hoodie casual, while the clean shape keeps the overall look intentional.";
    return "Keeps the outfit relaxed, but the clean shape makes it feel more considered.";
  }
  if (category === "black sneakers") {
    return "Keeps the outfit grounded and easy while supporting a darker base.";
  }
  if (category === "chelsea boots") {
    if (hoodieBase) return "They add polish to the hoodie without turning the outfit corporate.";
    return "Adds polish without making the outfit feel corporate.";
  }
  if (category === "loafers") {
    return "Sharpens the outfit with a smarter finish while staying lighter than boots.";
  }
  if (category === "overshirt") {
    if (hoodieBase) return "This adds structure around the hoodie while keeping the outfit relaxed and easy.";
    return "Adds structure and layering without making the outfit feel overdressed.";
  }
  if (category === "blazer") {
    if (hoodieBase) return "This works as relaxed-sharp contrast: the hoodie keeps it casual, the blazer adds shape.";
    return "Adds shape and contrast. Best when the outfit is meant to feel relaxed-sharp.";
  }
  if (category === "minimal accessory") {
    return "Finishes the outfit quietly without pulling attention away from the main piece.";
  }
  if (category === "oxford shirt") {
    return "Adds a cleaner layer that makes the outfit feel sharper without looking forced.";
  }
  if (category === "white t-shirt" || category === "black t-shirt") {
    return "Keeps the base simple so the rest of the outfit can carry the direction.";
  }

  return null;
}

export function getProductStylistNote(context: ProductNoteContext): string {
  const specific = context.productNote?.trim();
  if (specific) return specific;

  const roleNote = getCategoryRoleNote(context);
  if (roleNote) return roleNote;

  const itemType = normalize(context.uploadedItemType) || "main piece";
  return `Supports the direction around your ${itemType} so the look stays intentional and clean.`;
}
