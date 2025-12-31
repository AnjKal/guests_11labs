import { db } from "../config/firebase";
import { Session } from "../types/session";

export async function getSession(
  sessionId: string
): Promise<Session> {
  const ref = db.collection("sessions").doc(sessionId);
  const snap = await ref.get();

  if (!snap.exists) {
    return { messages: [] };
  }

  return snap.data() as Session;
}

export async function saveSession(
  sessionId: string,
  session: Session
) {
  const ref = db.collection("sessions").doc(sessionId);
  await ref.set(session, { merge: true });
}
