const client = require("../client");

client.select
  .workflow("ReferAFriend")
  .send("deal_purchased", {
    deal_name: "awesome cheese cake",
    email: "friend_1@example.com"
  });
