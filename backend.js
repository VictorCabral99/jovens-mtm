const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

webpush.setVapidDetails(
  "mailto:voce@exemplo.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscriptions = [{ title: "Teste", body: "Mensagem de teste" }];

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post("/send", async (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });
  console.log(payload)
  await Promise.all(
    subscriptions.map(sub =>
      webpush.sendNotification(sub, payload).catch(console.error)
    )
  );

  res.json({ enviado: subscriptions.length });
});

app.get("/vapid-public-key", (req, res) => {
  res.json({ key: process.env.VAPID_PUBLIC_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));