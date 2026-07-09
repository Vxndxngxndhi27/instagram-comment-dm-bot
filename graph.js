const axios = require("axios");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IG_BUSINESS_ID = process.env.IG_BUSINESS_ID;

async function sendInstagramDM(commentId, message) {

  try {

    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${IG_BUSINESS_ID}/messages`,
      {
        recipient: {
          comment_id: commentId
        },
        message: {
          text: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ DM Sent");
    console.log(response.data);

  } catch (err) {

    console.log("❌ DM Error");

    if (err.response) {
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }
  }

}

module.exports = {
  sendInstagramDM
};
