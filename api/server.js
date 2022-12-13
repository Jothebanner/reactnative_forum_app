const express = require("express"),
  app = express(),
  port = process.env.PORT || 3025;
(mongoose = require("mongoose")),
  (Post = require("./models/voucherModel")),
  (Vouchers = require("./models/voucherModel")),
  (bodyParser = require("body-parser"));
https = require("https");
fs = require("fs");

const options = {
    key: fs.readFileSync('./secure/private.key').toString(),
    cert: fs.readFileSync('./secure/certificate.crt').toString(),
    ca: fs.readFileSync('./secure/ca_bundle.crt').toString(),
    requestCert: false,
    rejectUnauthorized: false
  };

// mongoose instance connection url connection
mongoose.options = {useUnifiedTopology : true, useNewUrlParser: true};
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/voucherDB");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./routes/voucherRoutes"); //importing route
routes(app); //register the route

const httpsServer = https.createServer(options, app); // (options, app)

httpsServer.listen(port, () => {
    console.log("todo list RESTful API server started on: " + port)});