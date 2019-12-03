const sendgridConnectorId = "";
const emailFrom = "zenaton-tutorial@zenaton.com";

module.exports.handle = function*(user) {
  // Setup connectors
  const http = this.connector("http");
  const sendgrid = this.connector("sendgrid", sendgridConnectorId);

  // Initialize the counter of friend that have purchased a deal.
  let nb_friends = 0;

  // Loop until 3 friends purchase a deal.
  do {
    // Wait for the deal_purchased event
    yield this.wait.event("deal_purchased").forever();
    nb_friends++;
  } while (nb_friends < 3);

  // Trigger the refund to the user in your application.
  yield* refund(http, user);

  // Send an email to user
  yield* sendMail(sendgrid, emailFrom, user.email);
};

// call to fake server - IRL you should probably use your own endpoint
function* refund(http, user) {
  yield http.put("https://httpbin.org/anything/refund", { body: user });
}

// Example of sendMail implementation using Sendgrid
function* sendMail(sendgrid, from, to) {
  /*
  const payload = {
    body: {
      personalizations: [{ to: [{ email: to }]}],
      content: [{ type: "text/plain", value: "Congratulations, you have received a refund..." }],
      subject: "Deal refund",
      from: { email: from },
    }
  };

  sendgrid.post("/mail/send", payload);
  */
}
