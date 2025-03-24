// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { runBot } = require('./bot');

const app = express();
app.use(bodyParser.json());

// Optional: Add a root route for testing
app.get('/', (req, res) => {
  res.send('Purchase Bot is running on Render ✅');
});

app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;
    await runBot(data);
    res.status(200).send('Bot started successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Bot failed');
  }
});

// ✅ FIX: Use the port provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
