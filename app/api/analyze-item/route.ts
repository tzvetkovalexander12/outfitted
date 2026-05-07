import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ALLOWED_CATEGORIES = `[
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
  "black jeans"
]`;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const rawEventType = formData.get("eventType");
    const rawVibeType = formData.get("vibeType");
    const eventType =
      typeof rawEventType === "string" && rawEventType.trim().length > 0
        ? rawEventType.trim()
        : "casual-day";
    const vibeType =
      typeof rawVibeType === "string" && rawVibeType.trim().length > 0
        ? rawVibeType.trim()
        : "minimal";

    if (!image || !(image instanceof File)) {
      return NextResponse.json({ error: "No image" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Analyze this clothing item for a men's outfit matching app.

The user uploaded one clothing item.
They are dressing for:
EVENT: ${eventType}
They want the vibe:
VIBE: ${vibeType}

First, choose exactly ONE "outfitDirection" from these three strings only:
- "casual clean"
- "smart casual"
- "evening polished"

Event meaning:
- casual-day: everyday, easy, wearable
- dinner: polished but not too formal
- party: social, sharper, more personality
- work: smart, clean, appropriate
- vacation: relaxed, practical, stylish
- date: intentional, confident, balanced

Vibe meaning:
- safe: reliable, easy to wear, low risk
- minimal: clean, simple, understated
- bold: more contrast, stronger pieces, more personality
- expensive-looking: polished, refined, premium-looking without being loud

How to choose outfitDirection:
- Return outfitDirection as exactly one of: "casual clean", "smart casual", "evening polished".
- casual-day and vacation often lean "casual clean".
- dinner, date, and work often lean "smart casual".
- party and expensive-looking can lean "evening polished".
- Do not force this mapping. Pick what best fits the uploaded item + event + vibe.

The recommendedPieces array MUST only use these exact lowercase strings (no other values):
${ALLOWED_CATEGORIES}

recommendedPieces must:
- match the uploaded item
- match the event
- match the vibe
- NOT be the same type of item as the uploaded item
- include 3 pieces maximum
- only use exact allowed category values

Special hoodie/sweatshirt guidance:
- If the uploaded item is a hoodie or sweatshirt, treat it as a casual base.
- Build around that base by doing at least one of:
  1) keep it relaxed but cleaner,
  2) sharpen the lower half,
  3) add one intentional layer/accessory.
- Never make hoodie/sweatshirt results feel like a random formal outfit.
- Never recommend "hoodie" in recommendedPieces when the uploaded item is a hoodie/sweatshirt.

Hoodie/sweatshirt + date general rule:
- The look should feel relaxed but intentional, not like basic casual-day.
- Avoid "blue jeans" unless VIBE is "safe" and affordability is important.
- Prefer "black jeans" or "tailored trousers" for the lower half.
- Prefer "white sneakers", "black sneakers", "chelsea boots", or "minimal accessory" based on vibe.
- Do not overuse belts as the default third item.

Hoodie + overshirt rule:
- Hoodie + "overshirt" is usually good for casual-day, vacation, safe, and minimal.

Hoodie + blazer rule:
- Only recommend "blazer" with hoodie when EVENT is "date", "party", or "dinner" AND VIBE is "bold" or "expensive-looking".
- If you use a blazer with hoodie, treat blazer as a relaxed sharp layer.
- Avoid formal suit styling with bulky hoodies.

Hoodie/sweatshirt + date vibe-specific patterns:
- safe:
  - usually: "black jeans" + ("white sneakers" or "black sneakers") + "minimal accessory"
  - safe should feel easy, wearable, low-risk, and cleaner than casual-day.
- minimal:
  - usually: ("black jeans" or "tailored trousers") + "white sneakers" + "minimal accessory"
  - minimal should feel clean, simple, tonal, and not over-styled.
- bold:
  - usually: "black jeans" + "chelsea boots" + ("blazer" or "minimal accessory")
  - bold should add stronger silhouette or contrast, not just trousers + belt.
- expensive-looking:
  - usually: "tailored trousers" + "chelsea boots" + ("minimal accessory" or "blazer")
  - should feel tonal, polished, refined.
  - prefer black chelsea boots with a black hoodie unless the outfit is clearly warm/neutral.
  - avoid linen-looking tailored trousers with a black hoodie unless the context is vacation/summer.

Vibe differentiation rule:
- For same uploaded item + same event + same budget, outputs across vibes must be clearly different.
- For hoodie + date + mid-range, keep this differentiation:
  - safe: black jeans + white sneakers + minimal accessory
  - minimal: tailored trousers or black jeans + white sneakers + minimal accessory
  - bold: black jeans + chelsea boots + blazer or minimal accessory
  - expensive-looking: tailored trousers + chelsea boots + blazer or minimal accessory

Minimal accessory guidance:
- "minimal accessory" can be belt, necklace/bracelet, ring, or sunglasses.
- Do not default to belt repeatedly when a stronger clothing category would better differentiate the outfit.

Return ONLY valid JSON with this shape:
{
  "itemType": "",
  "mainColor": "",
  "style": "",
  "outfitDirection": "casual clean",
  "recommendedPieces": [],
  "reason": ""
}

Keep "reason" specific and short (1-2 sentences):
- mention the uploaded item
- mention the event
- mention the vibe
- explain why the recommended pieces work together
- avoid generic color-only advice
- sound like a concise stylist explanation

If the uploaded item is a hoodie or sweatshirt and EVENT is "date", the reason should explicitly mention:
- the hoodie keeps a relaxed base
- which piece(s) sharpen or clean up the outfit for date context
- how this supports the selected vibe
- avoiding a too-basic casual look

Do not give generic advice like "these colors match". Explain silhouette, contrast, formality, occasion, and why the pieces work around the uploaded item.

Bad example:
"White matches black and creates a clean look."

Good example:
"Your black tailored trousers already create a sharp base for dinner. A clean shirt and blazer add polish, while loafers finish the outfit without making it feel overdone."
              `,
            },
            {
              type: "input_image",
              image_url: `data:${image.type};base64,${base64}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    const text = response.output_text
      .replace(/```json|```/g, "")
      .trim();

    return NextResponse.json({
      analysis: JSON.parse(text),
    });
  } catch (err) {
    console.error("ANALYZE ITEM API ERROR:", err);

    return NextResponse.json(
      {
        error: "AI failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
