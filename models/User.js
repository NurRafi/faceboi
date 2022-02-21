// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB database.
// Model names are in capital (coding convention)

const mongoose = require("mongoose");

// Schema names are in capital
// Build User Schema
// Inside mongoose.Schema() are the properties
// We can indicate any restrictions too, for example the minimum number of chars
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true, // Because a user must have a username
        min: 3,
        max: 20,
        unique: true // All usernames must be different
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: "" // When a user is created, set a default profile picture
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array, // User IDs in this array. For example two people are following a user with usernames: [nur, rafi]
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 58 // Second longest city name is 58 characters long
    },
    country: {
        type: String,
        max: 56 // The United Kingdom of Great Britain and Northern Ireland
    },
    // Note: The better option would be to create an info model inside of User model.
    relationship: {
        type: Number,
        enum: [1, 2, 3] // 1 means single, 2 means married, 3 means divorced
    }
}, {timestamps: true}); // It's an option to add/update the timestamp when a user is created/updated

// To use the userSchema, we need to export it.
// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for the example below, the model User is for the users collection in the database.
module.exports = mongoose.model("User", UserSchema);