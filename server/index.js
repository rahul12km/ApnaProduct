import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import { checkoutRouter } from "./routes/checkout.js";

config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", checkoutRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Database connected successfully"));

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
