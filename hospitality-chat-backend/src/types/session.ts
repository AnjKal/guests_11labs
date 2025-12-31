export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type Session = {
  messages: ChatMessage[];
  locationContext?: string;
};
