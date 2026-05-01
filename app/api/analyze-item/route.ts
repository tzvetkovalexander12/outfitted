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

First, choose exactly ONE "outfitDirection" from these three strings only:
- "casual clean"
- "smart casual"
- "evening polished"

How to choose outfitDirection (vary naturally—do not default to the same direction every time):
- If the uploaded item is already formal or tailored, do NOT always choose "evening polished". Prefer "smart casual" or "casual clean" when they fit the vibe.
- For tailored trousers, black jeans, or other structured pieces, "casual clean" is allowed and often a strong choice.
- Match the overall vibe of the piece, but introduce variety across different uploads so results feel fresh.

The recommendedPieces array MUST align with the chosen outfitDirection. Examples of coherent sets (illustrative only):
- casual clean: e.g. white t-shirt, overshirt, white sneakers
- smart casual: e.g. oxford shirt, loafers, minimal accessory
- evening polished: e.g. blazer, loafers, oxford shirt

The recommendedPieces array MUST only use these exact lowercase strings (no other values):
${ALLOWED_CATEGORIES}

Return ONLY valid JSON with this shape:
{
  "itemType": "",
  "mainColor": "",
  "style": "",
  "outfitDirection": "casual clean",
  "recommendedPieces": [],
  "reason": ""
}

outfitDirection must be exactly one of: "casual clean", "smart casual", "evening polished".

Include at most 3 items in recommendedPieces (never more than 3).
Do not recommend the same category as the uploaded item (e.g. if the photo is a white t-shirt, omit "white t-shirt" from recommendedPieces).
Keep "reason" short—one or two sentences on why these pieces complement the upload and fit the direction.
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
