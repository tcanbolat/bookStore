const functions = require('firebase-functions');
const express = require("express");
const routes = require("./routes");
const app = express();

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(routes);

// exporting as a function to firebase with the name set to bookstore.
// no need to set any PORTS or app.listen to anything.
// firebase takes this node/express backend and uses it as a cloud function to create a SERVERLESS web app.
exports.bookstore = functions.https.onRequest(app);



