import express from "express";
import { getSession, saveSession } from "../services/memory.service";
import { callLLM } from "../services/llm.service";
import { resolveFinalLocationContext } from "../services/location.service";
import { Session } from "../types/session";

const router = express.Router();

router.post("/", async (req, res) => {
  const { sessionId, message, context } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({
      reply: "Invalid request. Please try again."
    });
  }

  const session: Session = await getSession(sessionId);
  const messages = session.messages || [];
  const hasContext = messages.length > 0;

  /* ----------------------------
     1️⃣ Handle greetings (NO LLM)
  -----------------------------*/
  if (/^(hi|hello|hey|hai)$/i.test(message.trim())) {
    const reply = hasContext
      ? "Hi again 😊 What would you like to explore?"
      : "Hello 😊 I can help with food, places, and short travel plans.";

    messages.push({ role: "user", content: message });
    messages.push({ role: "assistant", content: reply });

    await saveSession(sessionId, { ...session, messages });
    return res.json({ reply });
  }

  /* ----------------------------
     2️⃣ Save user message
  -----------------------------*/
  messages.push({ role: "user", content: message });

  /* ------------------------------------------------
     3️⃣ Accept short replies as LOCATION (FIX)
     Example: "Coorg", "Ooty", "Bangalore"
  -------------------------------------------------*/
  const lastAssistant = [...messages]
    .reverse()
    .find(m => m.role === "assistant");

  const isLocationReply =
    lastAssistant &&
    /(tell me your (city|location|area))/i.test(lastAssistant.content) &&
    message.trim().split(" ").length <= 3;

  if (isLocationReply) {
    session.locationContext = `
Guest location provided by user:
${message.trim()}

Use this as nearby context.
`;
  }

  /* ----------------------------
     4️⃣ Resolve location (NO LLM)
  -----------------------------*/
  let locationContext =
    session.locationContext ||
    (await resolveFinalLocationContext(context, messages));

  if (locationContext && !session.locationContext) {
    session.locationContext = locationContext;
  }

  /* ----------------------------
     5️⃣ Ask location ONLY ONCE
  -----------------------------*/
  const alreadyAsked = messages.some(
    m =>
      m.role === "assistant" &&
      /(tell me your (city|location|area))/i.test(m.content)
  );

  if (!locationContext && !alreadyAsked) {
    const reply =
      "Sure 🙂 To suggest nearby places, could you tell me your city or area?";

    messages.push({ role: "assistant", content: reply });
    await saveSession(sessionId, { ...session, messages });
    return res.json({ reply });
  }

  /* ----------------------------
     6️⃣ SINGLE GEMINI CALL ONLY
  -----------------------------*/
  const reply = await callLLM(messages.slice(-6), locationContext);

  messages.push({ role: "assistant", content: reply });

  await saveSession(sessionId, { ...session, messages });
  return res.json({ reply });
});

export default router;
