const axios = require("axios");

module.exports.handle = async function(user) {
  // this is a fake task doing an HTTP request on a fake endpoint for the example's sake.
  // in a real project, you should make a request to an endpoint in your application or
  // to your payment gateway API.
  await axios.put("https://httpbin.org/anything/refund", { body: user });

  console.log(`A refund has been granted to user ${user.email}.`);
};
