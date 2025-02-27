require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS (allow requests from your frontend)
const corsOptions = {
  origin: 'http://localhost:3000', // Next.js default port
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Import routes
const routes = require('./routes/routes');
app.use('/api', routes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
