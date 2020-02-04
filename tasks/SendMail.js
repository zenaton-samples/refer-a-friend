const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.handle = async function(user) {
  // send an email using the Sendgrid SDK.
  await sendgrid.send({
    personalizations: [{ to: [{ email: user.email }] }],
    content: [
      {
        type: "text/plain",
        value: "Congratulations, you have received a refund..."
      }
    ],
    subject: "Deal refund",
    from: { email: "zenaton-tutorial@zenaton.com" }
  });
};
