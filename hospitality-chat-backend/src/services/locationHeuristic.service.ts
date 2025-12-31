export function extractLocationHeuristically(messages: any[]): string | null {
  const lastUserMsg = [...messages]
    .reverse()
    .find(m => m.role === "user");

  if (!lastUserMsg) return null;

  const text = lastUserMsg.content.trim();

  // Treat short, place-like replies as location
  if (
    text.length <= 40 &&
    /^[a-zA-Z\s]+$/.test(text)
  ) {
    return text;
  }

  return null;
}
