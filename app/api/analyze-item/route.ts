import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

The recommendedPieces array MUST only use these exact values:
[
  "white t-shirt",
  "black t-shirt",
  "oxford shirt",
  "overshirt",
  "hoodie",
  "chinos",
  "black jeans",
  "blue jeans",
  "tailored trousers",
  "white sneakers",
  "black sneakers",
  "loafers",
  "chelsea boots",
  "blazer",
  "minimal accessory"
]

Return ONLY valid JSON:
{
  "itemType": "",
  "mainColor": "",
  "style": "",
  "recommendedPieces": [],
  "reason": ""
}

Pick 3 recommendedPieces max.
Do not recommend the same type of item as the uploaded item.
Keep the reason short.
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