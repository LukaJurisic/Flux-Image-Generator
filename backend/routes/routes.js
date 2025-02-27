const express = require('express');
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.send('Hello from the API route!');
});

// Example POST route
router.post('/data', (req, res) => {
  const receivedData = req.body;
  res.json({ message: 'Data processed successfully', data: receivedData });
});

module.exports = router;