import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Absolute path to service account key
const serviceAccountPath = path.join(
  process.cwd(),
  "serviceAccountKey.json"
);

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
}

export const db = admin.firestore();
