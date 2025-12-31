import axios from "axios";
import { SYSTEM_PROMPT } from "../prompts/system.prompt";

/* -------------------------------------------
   Normalize Gemini response into clean text
--------------------------------------------*/
function normalizeResponse(raw: string): string {
  const text = raw
    .replace(/[#*_`•]/g, "")      // remove markdown & symbols
    .replace(/\s+/g, " ")         // normalize spaces
    .trim();

  const lower = text.toLowerCase();

  const planIndex = lower.indexOf("plan:");
  const whyIndex = lower.indexOf("why this plan works:");

  const title =
    planIndex > 0
      ? text.substring(0, planIndex).trim()
      : "Your Plan";

  const planPart =
    planIndex > 0
      ? text.substring(
          planIndex + "plan:".length,
          whyIndex > 0 ? whyIndex : undefined
        )
      : "";

  const whyPart =
    whyIndex > 0
      ? text.substring(whyIndex + "why this plan works:".length)
      : "";

  // Extract time-based plan items
  const planItems =
    planPart.match(
      /\d{1,2}:\d{2}\s?(AM|PM)?\s?[–-]\s?[^0-9]+/gi
    ) || [];

  // Extract reasons
  const whyItems = whyPart
    .split("-")
    .map(s => s.trim())
    .filter(Boolean);

  let output = `${title}\n\nPlan:\n`;

  if (planItems.length) {
    planItems.forEach(item => {
      output += item.trim() + "\n";
    });
  } else {
    output += "Flexible plan based on nearby attractions.\n";
  }

  if (whyItems.length) {
    output += `\nWhy this plan works:\n`;
    whyItems.forEach(reason => {
      output += `- ${reason}\n`;
    });
  }

  return output.trim();
}

/* -------------------------------------------
   Call Gemini
--------------------------------------------*/
export async function callLLM(
  messages: any[],
  locationContext: string
): Promise<string> {
  const prompt = `
${SYSTEM_PROMPT}

${locationContext || ""}

Conversation:
${messages.map(m => `${m.role}: ${m.content}`).join("\n")}
`;

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const config = {
    params: { key: process.env.GEMINI_API_KEY },
    headers: { "Content-Type": "application/json" },
    timeout: 15000
  };

  try {
    const res = await axios.post(url, payload, config);

    const rawText =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    // 🔥 GUARANTEED CLEAN OUTPUT
    return normalizeResponse(rawText);
  } catch (err: any) {
    console.error("Gemini error:", err?.response?.status || err.message);

    // Fallback (clean plain text)
    return `
General Recommendation

Plan:
09:00 AM - Visit a popular nearby attraction
11:30 AM - Explore local streets or markets
01:00 PM - Lunch at a nearby restaurant
04:00 PM - Relax at a cafe
07:00 PM - Dinner at a well-rated place

Why this plan works:
- Simple and flexible
- Covers food and sightseeing
- Suitable for a relaxed day
`.trim();
  }
}
