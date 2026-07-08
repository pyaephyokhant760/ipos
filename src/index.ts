import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./router/customer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", UserRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});