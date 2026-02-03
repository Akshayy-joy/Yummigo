import app from "./app";
import pool from "./config/db";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test DB connection
    await pool.query("SELECT 1");
    console.log("Database ready");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server ❌ ", error);
    process.exit(1);
  }
}

startServer();
