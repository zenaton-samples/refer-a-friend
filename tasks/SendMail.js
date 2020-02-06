const sendgrid = require('@sendgrid/mail');

/**
 * Retrieve the Sendgrid API key from the environment.
 *
 * @returns {(string|undefined)}
 */
const getSentryApiKey = function() {
  if (typeof process.env.SENDGRID_API_KEY === "string" && process.env.SENDGRID_API_KEY.length > 0) {
    return process.env.SENDGRID_API_KEY;
  }

  return undefined;
};

module.exports.handle = async function(user) {
  const sendgridApiKey = getSentryApiKey();
  // if the sendgrid api key is not provided, we don't send any email.
  if (!sendgridApiKey) {
    console.log(`Email notification to ${user.email} has not been sent because no Sendgrid API key was provided.`);

    return false;
  }

  sendgrid.setApiKey(sendgridApiKey);

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

  return true;
};
