import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const env = process.env.NODE_ENV || 'dev';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 2. Mock Database / State
const statusInfo = {
  env: process.env.NODE_ENV,
  version: "1.0.0",
  db_connected: true
};

// --- ENDPOINTS ---

/**
 * GET /health
 * Simple check to see if the server is alive and which env is running
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "UP",
    environment: env,
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /config
 * Returns specific metadata based on the environment
 */
app.get('/config', (req, res) => {
  res.status(200).json({
    api_url: process.env.API_BASE_URL || "localhost:3000",
    debug_mode: env !== 'prod', // Disable debugging in production
    features: env === 'prod' ? ['auth', 'payments'] : ['auth', 'payments', 'beta-testing']
  });
});

/**
 * POST /data
 * Echo endpoint to test payload handling
 */
app.post('/data', (req, res) => {
  const { name } = req.body;
  res.status(201).json({
    message: `Data received for ${name} on ${env} environment`,
    received: true
  });
});

app.get("/vivek", (req, res) => {
    const vivek = {
        name: "Vivek Kumar Singh",
        age: 18,
        complexion: "brown",
        cgpa: 5.92
    };

    res.status(200).json({
        vivek,
        message: "Info fetched successfully"
    });
});
/**
 * GET /error-test
 * Endpoint to demonstrate environment-specific error detail
 */
app.get('/error-test', (req, res) => {
  try {
    throw new Error("Database connection failed!");
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      // Only show stack trace in dev and stag
      details: env === 'prod' ? null : err.message
    });
  }
});

// 3. Start Server
app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 Server running in [${env.toUpperCase()}] mode`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});