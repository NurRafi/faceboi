// Create a router
const router = require("express").Router();

// To use it in index.js
// The module is a variable that represents the current module, and exports is an object that will be exposed as a module.
module.exports = router;

router.get("/", (req, res) => {
    res.send("Hello from user route!");
})