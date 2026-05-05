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
