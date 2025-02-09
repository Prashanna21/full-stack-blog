import express from "express";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webHookRouter from "./routes/webhook.route.js";
import connectDB from "./lib/connectDB.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);
app.use(express.json());

app.get("/auth-state", (req, res) => {
  const authState = req.auth;
  res.json(authState);
});

app.get("/protected", (req, res) => {
  const { userId } = req.auth;
  console.log(userId);
  if (!userId) {
    return res.status(401).json("not authenticated");
  }
  res.status(200).json("Content");
});

app.get("/protected2", requireAuth(), (req, res) => {
  res.status(200).json("Content");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);

app.use((error, req, res, next) => {
  console.error("Error occurred:", error.message);
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong",
    status: error.status || 500,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running");
});
