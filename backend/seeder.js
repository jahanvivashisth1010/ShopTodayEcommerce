const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@shopnest.com",
      password: hashedPassword,
      role: "admin",
      verified: true, // admin ko manually verified rakho
    });

    const testUser = await User.create({
      name: "Test User",
      email: "user@shopnest.com",
      password: hashedPassword,
      role: "user",
      verified: true, // testing ke liye already verified
    });

    const products = [
      {
        name: "Wireless Noise-Cancelling Headphones",
        description:
          "Immersive sound experience with advanced active noise cancellation.",
        price: 299.99,
        category: "Electronics",
        stock: 15,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.8,
        numReviews: 24,
      },
      {
        name: "Minimalist Modern Chair",
        description:
          "A stylish and comfortable addition to any contemporary living room.",
        price: 150.0,
        category: "Furniture",
        stock: 30,
        imageUrl:
          "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.2,
        numReviews: 12,
      },
      {
        name: "Professional DSLR Camera",
        description:
          "Capture stunning moments with high-resolution clarity and speed.",
        price: 1199.99,
        category: "Electronics",
        stock: 8,
        imageUrl:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.9,
        numReviews: 50,
      },
      {
        name: "Classic White Sneakers",
        description:
          "Versatile and comfortable, a staple for any casual outfit.",
        price: 85.0,
        category: "Clothing",
        stock: 50,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.5,
        numReviews: 89,
      },
      {
        name: "Smart Fitness Watch",
        description:
          "Track your heart rate, sleep, and workouts with this sleek smartwatch.",
        price: 199.99,
        category: "Electronics",
        stock: 40,
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.4,
        numReviews: 67,
      },
      {
        name: "Leather Messenger Bag",
        description:
          "Handcrafted genuine leather bag, perfect for work or travel.",
        price: 129.99,
        category: "Accessories",
        stock: 20,
        imageUrl:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.6,
        numReviews: 33,
      },
      {
        name: "Ceramic Coffee Mug Set",
        description:
          "Set of 4 handmade ceramic mugs, perfect for your morning coffee.",
        price: 34.99,
        category: "Home & Kitchen",
        stock: 60,
        imageUrl:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.3,
        numReviews: 41,
      },
      {
        name: "Denim Jacket",
        description:
          "Classic unisex denim jacket, a timeless wardrobe essential.",
        price: 95.0,
        category: "Clothing",
        stock: 25,
        imageUrl:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.1,
        numReviews: 18,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ Data Imported Successfully!");
    console.log(`👤 Admin: admin@shopnest.com / password123`);
    console.log(`👤 Test User: user@shopnest.com / password123`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("🗑️  Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data destroy: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
