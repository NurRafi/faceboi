// All user functions are here except authentication which is in auth.js.

// User model
const User = require("../models/User")

// Create a router
const router = require("express").Router();

const bcrypt = require("bcrypt");

/*
router.get("/", (req, res) => {
    res.send("Hello from user route!");
})
*/

// Update user
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.user.isAdmin) { // Equal value and equal type. req.user is experimental tech

        if (req.body.password) // If user wants to change password
        {
            try {
                const salt = await bcrypt.genSalt(5);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}); // Finds user and updates everything with body elements
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {
        return res.status(403).json("You can update only your accound."); // 403: Forbidden
    }// Checking if the user updating is the user that needs to be updated. "/:id is a parameter" (Verification)
}); // We can choose any user ids. PUT because Update

// Delete user

// Get user

// Follow a user

// Unfollow a user

// To use it in index.js
// The module is a variable that represents the current module, and exports is an object that will be exposed as a module.
module.exports = router;