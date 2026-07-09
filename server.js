const express = require("express");

const { sendInstagramDM } = require("./graph");
const { getReply } = require("./keywords");

const app = express();

app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Webhook Verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook Verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Webhook Receiver
app.post("/webhook", async (req, res) => {
  console.log("========== NEW WEBHOOK ==========");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    if (req.body.object === "instagram") {
      for (const entry of req.body.entry) {
        for (const change of entry.changes) {

          if (change.field !== "comments") continue;

          const comment = change.value;

          console.log("Comment:");
          console.log(comment.text);

          const reply = getReply(comment.text);

          if (!reply) {
            console.log("No keyword found.");
            continue;
          }

          console.log("Keyword matched.");
          console.log("Sending DM to:");
          console.log(comment.from.username);

          await sendInstagramDM(
            comment.id,
            reply
          );
        }
      }
    }

    res.sendStatus(200);

  } catch (err) {

    console.error(err);

    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Instagram Comment Bot Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Started");
});
