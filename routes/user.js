// All user functions are here except authentication which is in auth.js.

// Create a router
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello from user route!");
})

// To use it in index.js
// The module is a variable that represents the current module, and exports is an object that will be exposed as a module.
module.exports = router;