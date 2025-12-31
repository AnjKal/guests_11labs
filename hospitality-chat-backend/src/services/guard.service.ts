export function isAllowedQuery(
  message: string,
  hasContext: boolean
): boolean {
  if (hasContext) return true; // allow follow-ups

  const ALLOWED = [
    "hotel", "restaurant", "food", "places",
    "itinerary", "travel", "nearby", "cafe",
    "visit", "plan", "dinner", "lunch", "breakfast"
  ];

  const m = message.toLowerCase();
  return ALLOWED.some(k => m.includes(k));
}
