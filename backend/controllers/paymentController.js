const Razorpay = require("razorpay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: "Order creation failed" });
    }
    res.json(order);
  } catch (error) {
    console.error("Razorpay createOrder error:", error);
    res.status(500).json({
      message: "Order creation failed",
      error: error?.message || "Unknown error",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({
      message: "Verification failed",
      error: error?.message || "Unknown error",
    });
  }
};

module.exports = { createOrder, verifyPayment };
