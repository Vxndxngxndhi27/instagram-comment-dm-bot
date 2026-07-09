const replies = {
  pass: `🎉 Thanks for your interest!

Here is the booking link:

https://yourwebsite.com

If you have any questions, just reply here.`,

  price: `💰 Ticket prices are available here:

https://yourwebsite.com`,

  location: `📍 Event location:

Borivali, Mumbai`
};

function getReply(comment) {

  const text = comment.toLowerCase();

  for (const keyword of Object.keys(replies)) {

    if (text.includes(keyword)) {

      return replies[keyword];

    }

  }

  return null;
}

module.exports = {
  getReply
};
