const express = require("express");
const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configurar Winston para logging en JSON
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "app.log"),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// Si no estamos en producción, también loguear en consola
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logging de requests
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("Request processed", {
      timestamp: new Date().toISOString(),
      level: "info",
      message: `${req.method} ${req.path} - ${res.statusCode}`,
      path: req.path,
      method: req.method,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
    });
  });

  next();
});

// Endpoint principal
app.get("/", (req, res) => {
  logger.info("Homepage accessed", {
    timestamp: new Date().toISOString(),
    level: "info",
    message: "Homepage accessed successfully",
    path: "/",
  });
  res.json({
    message: "OK",
    timestamp: new Date().toISOString(),
    service: "ELK Lab App",
  });
});

// Endpoint de error
app.get("/error", (req, res) => {
  logger.error("Error endpoint accessed", {
    timestamp: new Date().toISOString(),
    level: "error",
    message: "Error endpoint triggered",
    path: "/error",
    error: "Simulated error for testing",
  });
  res.status(500).json({
    error: "Internal Server Error",
    message: "This is a simulated error for testing purposes",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint de health check
app.get("/health", (req, res) => {
  logger.info("Health check", {
    timestamp: new Date().toISOString(),
    level: "info",
    message: "Health check performed",
    path: "/health",
  });
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint para generar logs de diferentes niveles
app.get("/logs/:level", (req, res) => {
  const level = req.params.level;
  const message = `Log level ${level} generated`;

  logger.log(level, message, {
    timestamp: new Date().toISOString(),
    level: level,
    message: message,
    path: `/logs/${level}`,
    customField: "This is a custom field for testing",
  });

  res.json({
    message: `Generated ${level} log`,
    timestamp: new Date().toISOString(),
  });
});

// Manejo de rutas no encontradas (middleware catch-all, compatible con Express 5)
app.use((req, res) => {
  logger.warn("Route not found", {
    timestamp: new Date().toISOString(),
    level: "warn",
    message: `Route ${req.originalUrl} not found`,
    path: req.originalUrl,
  });
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});

app.listen(PORT, () => {
  logger.info("Server started", {
    timestamp: new Date().toISOString(),
    level: "info",
    message: `Server running on port ${PORT}`,
    path: "startup",
  });
  console.log(`🚀 ELK Lab App running on http://localhost:${PORT}`);
  console.log(`📊 Logs being written to: ${path.join(logsDir, "app.log")}`);
});
