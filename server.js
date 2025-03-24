require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { runBot } = require('./bot');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;
    await runBot(data); // Pass webhook payload to bot
    res.status(200).send('Bot started successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Bot failed');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
