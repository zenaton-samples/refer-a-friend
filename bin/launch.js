const { run } = require("../client");

const params = {
  id: 123,
  email: "foo@example.com",
  deal: "awesome cheese cake"
};

run.workflow("ReferAFriend", params);
