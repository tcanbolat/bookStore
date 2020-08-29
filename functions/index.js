const functions = require('firebase-functions');
const express = require("express");
const routes = require("./routes");
const app = express();

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(routes);

exports.bookstore = functions.https.onRequest(app);



