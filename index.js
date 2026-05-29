const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "markson123";
const SIM_AI_WEBHOOK = "https://www.sim.ai/api/webhooks/trigger/885c2e3f-d149-41f1-9708-4c5db6e87f09";

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  try {
    await axios.post(SIM_AI_WEBHOOK, req.body);
  } catch (e) {
    console.error('Error:', e.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server ready on port ' + PORT));
