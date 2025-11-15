const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
const ApiError = require("./app/api-error");

async function startServer() {
  try {
    // 🟢 Kết nối MongoDB
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the database!");

    // ⚙️ Middleware xử lý lỗi 404 (route không tồn tại)
    app.use((req, res, next) => {
      next(new ApiError(404, "Resource not found"));
    });

    // ⚙️ Middleware xử lý lỗi chung
    app.use((err, req, res, next) => {
      res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
      });
    });

    // 🚀 Khởi động server
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}

startServer();
