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
        return res.status(403).json("You can update only your account."); // 403: Forbidden
    }// Checking if the user updating is the user that needs to be updated. "/:id is a parameter" (Verification)
}); // We can choose any user ids. PUT because Update

// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account.");
    }
});

// Get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you allready follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});

// To use it in index.js
// The module is a variable that represents the current module, and exports is an object that will be exposed as a module.
module.exports = router;