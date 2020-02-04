// load dependencies
const { workflow, task } = require('zenaton');

// define tasks
task("Refund", require("./tasks/Refund"));
task("SendMail", require("./tasks/SendMail"));

// define workflows
workflow("ReferAFriend", require("./workflows/ReferAFriend"));
