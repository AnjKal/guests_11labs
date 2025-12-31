import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
