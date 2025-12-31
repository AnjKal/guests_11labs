export const API_URL = 'http://localhost:5000';

export interface ChatResponse {
    reply: string;
}

export async function chatWithAI(
    message: string,
    sessionId: string,
    context?: any
): Promise<string> {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId,
                message,
                context,
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data: ChatResponse = await response.json();
        return data.reply;
    } catch (error) {
        console.error('Error calling AI service:', error);
        throw error;
    }
}
