const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./Routes/index");
const useragent = require("express-useragent");
const device = require("express-device");
const app = express();
const port = 5001;

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(useragent.express());
app.use(device.capture());
// CORS configuration
app.use(
  cors({
    // origin: "http://localhost:3000", // React app URL
    origin: "http://103.147.56.81:5001", // React app URL
    credentials: true, // Allow cookies and credentials
  })
);

// Handle preflight requests
app.options("*", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "http://103.147.56.81:5001");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// Serve static files (for downloads)
app.use(
  "/static/public/image/",
  express.static(path.join(__dirname, "public/image/"), {
    setHeaders: (res) => {
      // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
      res.set("Access-Control-Allow-Origin", "http://103.147.56.81:5001");
      res.set("Access-Control-Allow-Credentials", "true");
    },
  })
);

// API routes
app.use("/", routes);

// Health check route
app.get("/check", (req, res) => {
  res.send("Running Server");
});

// Serve React frontend
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Running Server on port ${port}`);
});
