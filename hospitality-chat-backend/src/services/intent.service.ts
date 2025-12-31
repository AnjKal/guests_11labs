import axios from "axios";

export async function isHospitalityRelated(
  message: string
): Promise<boolean> {
  const prompt = `
You are a strict but practical intent classifier.

Decide whether the following message is related to:
- hospitality
- travel or tourism
- hotels or accommodation
- restaurants or cafes
- local attractions
- itineraries (half-day, full-day, weekend)
- short trips or weekend getaways
- concierge-style assistance for travelers

Message:
"${message}"

If the message is about ANY of the above, answer YES.
If it is about unrelated topics like coding, science, math, politics,
medicine, finance, or general knowledge, answer NO.

Answer ONLY with:
YES or NO
`;

  try {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
        timeout: 8000
      }
    );

    const answer =
      res.data.candidates[0].content.parts[0].text
        .trim()
        .toUpperCase();

    return answer.startsWith("YES");
  } catch (err) {
    // Fail-safe: if classifier fails, ALLOW (better UX than false reject)
    console.warn("Intent classifier failed, defaulting to ALLOW");
    return true;
  }
}
