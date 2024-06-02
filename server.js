import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";

import cors from "cors";

// import { fileURLToPath } from "url";

dotenv.config();

connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "./client/dist")));

//authentication
app.use("/auth", authRoutes);

//category crud
app.use("/category", categoryRoutes);

//product crud
app.use("/product", productRoutes);

//cart crud

// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server started ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
