// load dependencies
const { workflow } = require('zenaton');

// load definitions
const workflowDefinition = require("./workflows/ReferAFriend");

workflow("ReferAFriend", workflowDefinition);
