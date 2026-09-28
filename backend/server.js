const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const jobRoutes = require("./routes/jobRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminSubscriptionRoutes = require("./routes/adminSubscriptionRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const adminTestimonialRoutes = require("./routes/adminTestimonialRoutes");

const errorHandler = require("./middleware/error");
const {
  startApplicationEmailScheduler,
} = require("./jobs/applicationEmailScheduler");

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================
// API ROUTES
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin/subscriptions", adminSubscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin/testimonials", adminTestimonialRoutes);

// ==========================
// HEALTH CHECK
// ==========================

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ==========================
// REACT FRONTEND
// ==========================

const frontendPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendPath));

app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

// ==========================
// ERROR HANDLER
// ==========================

app.use(errorHandler);

// ==========================
// 404
// ==========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================
// SERVER
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 http://localhost:${PORT}`);
  startApplicationEmailScheduler();
});
