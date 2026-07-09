const axios = require("axios");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

async function sendInstagramDM(igUserId, message) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${igUserId}/messages`,
      {
        recipient: {
          id: igUserId
        },
        message: {
          text: message
        }
      },
      {
        params: {
          access_token: PAGE_ACCESS_TOKEN
        }
      }
    );

    console.log("DM Sent");
    console.log(response.data);

  } catch (err) {
    console.error("DM Error");

    if (err.response) {
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

module.exports = {
  sendInstagramDM
};
