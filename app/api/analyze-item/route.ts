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
  const isDev = process.env.NODE_ENV === "development";
  const startedAt = Date.now();
  const devLog = (label: string, durationMs: number) => {
    if (!isDev) return;
    console.log(`[analyze-item] ${label}: ${durationMs}ms`);
  };

  devLog("request received", 0);

  try {
    const formDataStart = Date.now();
    const formData = await req.formData();
    devLog("formData parsed", Date.now() - formDataStart);

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

    const fileBufferStart = Date.now();
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    devLog("file buffer created", Date.now() - fileBufferStart);

    const base64Start = Date.now();
    const base64 = buffer.toString("base64");
    devLog("base64 conversion completed", Date.now() - base64Start);

    const openAiStart = Date.now();
    devLog("OpenAI request started", Date.now() - startedAt);
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

Human intent:
People want to look good, avoid awkwardness, and feel confident in the situation — not just coordinate colors.
Be specific and socially aware. Sound like a calm stylist, not a matching algorithm.

Explain outfit logic with silhouette, balance, proportion, polish for the occasion, and texture when useful.
Do not lean on color matching as the main explanation.

Effort balance:
- Piece reads casual → sharpen one or two areas (often lower half, shoes, or one layer).
- Piece reads smart/sharp → relax one area so it does not feel stiff or overdressed.
- Piece reads loud/busy → keep supporting pieces quieter.
- Piece reads plain → add interest via silhouette, texture, shoes, or layering — usually ONE lead area; the rest supports.

Social risk:
Unless VIBE is "bold" or "expensive-looking", avoid styling that is trendy-but-risky for normal plans (costume-y, try-hard flash, extreme proportions). Keep looks wearable in real life.

First, choose exactly ONE "outfitDirection" from these three strings only:
- "casual clean"
- "smart casual"
- "evening polished"

Event meaning:
- casual-day: easy and wearable, still considered — not sloppy
- dinner: polished but comfortable — not a stiff formal costume
- party: personality and energy — not every piece competing for attention
- work: appropriate, reliable, clean — professional without loud trends
- vacation: relaxed, breathable, low-effort — practical ease
- date: attractive and intentional — confident, not desperate or overdressed

Vibe meaning:
- safe: clean and wearable — not boring; dependable but still intentional
- minimal: intentional restraint — not plain; fewer variables, clearer shapes
- bold: one or two strong choices — not chaos; the rest supports the lead
- expensive-looking: cleaner shape, better texture, less visual noise — not flashy logos or gimmicks

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
- For the same uploaded item + same event, outputs across vibes must be clearly different.
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

Keep "reason" to 1-2 short sentences max. It becomes the user's stylist direction — make it human.

Include where natural: what the uploaded item naturally feels like, what the outfit improves or balances, how EVENT changes the styling, and why the wearer would feel confident — without sounding like an essay.

Forbidden weak filler (never use): phrases like "matches your outfit", "great for your style", "versatile choice", "perfect for the vibe", or empty praise.
Instead say what a piece DOES (sharpens the lower half, adds polish without formality, keeps focus on the uploaded item, balances proportion).

Response style and concision rules (strict):
- Return JSON only.
- Be concise and avoid unnecessary explanation.
- stylistDirection: max 35 words.
- whyThisDirection: max 30 words.
- each product note: max 18 words.
- upgradeMove: max 20 words.
- Use short sentences.
- Avoid long comma-heavy sentences.
- Avoid repeating the same idea across sections.
- Do not over-explain.
- Keep the tone confident, human, and stylist-led.
- Focus on the single strongest reason.
- Keep reasoning specific, not generic.

Good shortened examples:
- Stylist direction:
  "The black hoodie keeps the base relaxed. For date night, the trousers sharpen the lower half while clean sneakers keep it casual."
- Why this direction:
  "Blue jeans would work, but they can feel basic here. A cleaner lower half makes the hoodie feel intentional."
- Product note:
  "Sharpens the lower half without making the hoodie feel formal."
- Product note:
  "Keeps the outfit relaxed while making the look feel cleaner."
- Upgrade move:
  "Swap sneakers for Chelsea boots to make it more date-night ready."

Bad example to avoid:
"The black hoodie keeps a relaxed, easy base while tailored trousers sharpen and elevate the lower half to fit date night, while white sneakers and a minimal accessory add subtle polish and intentional restraint."
Why bad: too long, too many ideas, too many commas.

Bad example to avoid:
"These trousers sharpen the hoodie by cleaning up the lower half, while the lighter trouser softens the dark hoodie and makes the outfit feel more styled, while clean sneakers keep it casual."
Why bad: repeats "while" and over-explains.

When contrast is useful, briefly explain what is avoided.
Good: "Cleaner than blue denim, so the hoodie feels sharper without losing the casual base."
Bad: "This matches your outfit."

If the uploaded item is a hoodie or sweatshirt and EVENT is "date", the reason should explicitly mention:
- the hoodie keeps a relaxed base
- which piece(s) sharpen or clean up the outfit for date context
- how this supports the selected vibe
- avoiding a too-basic casual look

Do not give generic advice like "these colors match". Explain silhouette, contrast, formality, occasion, and why the pieces work around the uploaded item.

Bad examples:
"White matches black and creates a clean look."
"This is a versatile choice that works great for your style."

Good example:
"Your black tailored trousers already create a sharp base for dinner. A clean shirt and blazer add polish, while loafers finish the outfit without making it feel overdone."
              `,
            },
            {
              type: "input_image",
              image_url: `data:${image.type};base64,${base64}`,
              detail: "low",
            },
          ],
        },
      ],
    });
    devLog("OpenAI response received", Date.now() - openAiStart);

    const parseStart = Date.now();
    const text = response.output_text
      .replace(/```json|```/g, "")
      .trim();
    const parsed = JSON.parse(text);
    devLog("response parsed", Date.now() - parseStart);

    const total = Date.now() - startedAt;
    devLog("API response returned", total);
    devLog("total", total);

    return NextResponse.json({
      analysis: parsed,
    });
  } catch (err) {
    devLog("failed before response", Date.now() - startedAt);
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
