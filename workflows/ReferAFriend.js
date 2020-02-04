module.exports.handle = function*(user) {
  // initialize the counter of friend that have purchased a deal.
  let nb_friends = 0;

  // loop until 3 friends purchased a deal.
  do {
    // wait for the deal_purchased event. every time we receive this event, we increment the counter.
    yield this.wait.event("deal_purchased").forever();
    nb_friends++;
  } while (nb_friends < 3);

  // trigger the refund to the user in your application.
  yield this.run.task("Refund", user);

  // send an email to user.
  yield this.run.task("SendMail", user);
};
