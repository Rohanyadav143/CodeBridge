import express from "express";
import "dotenv/config";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";

const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/inngest",
  serve({
    client: inngest,
    functions,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is running...",
  });
});

if (process.env.SERVER_STATUS === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

export default app;
