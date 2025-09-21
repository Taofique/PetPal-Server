import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import petRoutes from "./routes/PetRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import careLogRoutes from "./routes/careLogRoutes.js";
import feedPostRoutes from "./routes/feedRoutes.js";
import sitterRoutes from "./routes/sitterRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import sequelize from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/care", careLogRoutes);
app.use("/api/feed", feedPostRoutes);
app.use("/api/sitter", sitterRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      console.error("Stack:", err.stack);
    } else {
      console.error("Non-Error thrown:", JSON.stringify(err, null, 2));
    }
    process.exit(1);
  }
};

startServer();
