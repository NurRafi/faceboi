// We need this every time we use Express
const express = require("express");
const app = express();

const mongoose = require("mongoose"); // MongoDB models
const dotenv = require("dotenv"); // Hide secrets
const helmet = require("helmet"); // Secure Express using HTTP headers
const morgan = require("morgan"); // Logging middleware
const nodemon = require("nodemon"); // Live / Hot reload

dotenv.config(); // We need this and .env file for secrets

// Connect with MongoDB
mongoose.connect(process.env.MONGO_URL).then((value) => {
    console.log("Connected to MongoDB server on Cloud Atlas.");
    console.log(value);
}); // Secret URL defined in .env

// Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
// The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
// Middleware functions can perform the following tasks:
// 1. Execute any code.
// 2. Make changes to the request and the response objects.
// 3. End the request-response cycle.
// 4. Call the next middleware in the stack.
app.use(express.json()); // Body parser to parse POST request
app.use(helmet());
app.use(morgan("common")); // "common" = Standard Apache common log output. There are many options for Morgan. Check out: https://expressjs.com/en/resources/middleware/morgan.html

app.get("/", (req, res) => {
    res.send("Welcome to homepage!");
});

app.get("/users", (req, res) => {
    res.send("Welcome to users!");
});

// Running Express server on port 1111 with console logging through the callback (lambda) function
app.listen(1111, () => {
    console.log("Express server is running on port 1111.");
});