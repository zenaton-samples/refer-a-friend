module.exports.handle = function*(user) {
  // initialize the counter of friends that have purchased a deal.
  let nb_friends = 0;

  this.log(`Starting workflow ReferAFriend for user ${user.email}.`);

  // loop until 3 friends purchased a deal.
  do {
    // wait for the deal_purchased event. every time we receive this event, we increment the counter.
    yield this.wait.event("deal_purchased").forever();
    nb_friends++;
    this.log(`A friend of user ${user.email} has purchased a deal.`);
  } while (nb_friends < 3);

  // trigger the refund to the user in your application.
  yield this.run.task("Refund", user);

  // send an email to user.
  yield this.run.task("SendMail", user);
};
