import { extractLocationHeuristically } from "./locationHeuristic.service";

export async function resolveFinalLocationContext(
  context: any,
  messages: any[]
): Promise<string | null> {
  // 1️⃣ Explicit frontend GPS
  if (context?.location?.type === "gps") {
    return `Location: Latitude ${context.location.lat}, Longitude ${context.location.lng}`;
  }

  // 2️⃣ Explicit text location from frontend
  if (context?.location?.type === "text") {
    return `Location: ${context.location.value}`;
  }

  // 3️⃣ Heuristic from conversation (NO GEMINI)
  const heuristic = extractLocationHeuristically(messages);
  if (heuristic) {
    return `Location: ${heuristic}`;
  }

  return null;
}
