// All authentication functions are here.

const router = require("express").Router();
const User = require("../models/User");

// Register a user
router.get("/register", async (req, res) => {
    // A new instance of a model is called a document
    // The process below is an async function, that is why we need to write async above
    // And, await below because we wait for the function to complete.
    const user = await new User({
        username: "nur",
        email: "nurrafi@protonmail.com",
        password: "123456"
    });

    await user.save(); // Writing in the database (async)
    res.send("User created.");
});

module.exports = router;