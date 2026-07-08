const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env FIRST

const connectDB = require("./config/db");

const app = express();

connectDB();

// ✅ Data Imported Successfully!
// 👤 Admin: admin@shopnest.com / password123
// 👤 Test User: user@shopnest.com / password123

// app.use(cors());
// Set CORS for frontend URL / allow single-node deploy
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("ShopToday Backend is working properly!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
