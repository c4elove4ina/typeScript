import express, { Application } from "express";
import cors from "cors";
import personRoutes from "./routes/personRoutes";

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/", personRoutes);

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
