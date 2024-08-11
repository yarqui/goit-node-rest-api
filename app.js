import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

const { SERVER_PORT = 3000 } = process.env;
import { connectDB } from "./db/database.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const startServer = async () => {
  await connectDB();
  app.listen(Number(SERVER_PORT), () => {
    console.log(`Server is running. Use our API on port: ${SERVER_PORT}`);
  });
};

startServer();
