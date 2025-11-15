const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error"); // ✅ import lớp ApiError

const app = express();

app.use(cors());
app.use(express.json());

// Route mặc định
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Import router
const contactsRouter = require("./app/routes/contact.route");

// Sử dụng router cho đường dẫn /api/contacts
app.use("/api/contacts", contactsRouter);

// ✅ Middleware xử lý lỗi 404 (route không tồn tại)
app.use((req, res, next) => {
  // Gọi next() để chuyển sang middleware xử lý lỗi tập trung
  return next(new ApiError(404, "Resource not found"));
});

// ✅ Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
