// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

//////users cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2", "key3", "key4"]
}));
///////////////////////////

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const pinRoutes = require("./routes/pins");
const mapRoutes = require("./routes/maps");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/pins", pinRoutes(db));
app.use("/api/maps", mapRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  console.log("HERE!");

  db.query(`SELECT * FROM users WHERE id = $1;`, [req.session.userID])
      .then(data => {
        const users = data.rows;
        console.log(users);
        //res.json({ users });
        return res.render("index", {userID: req.session.userID,
        name: users[0].first_name});

      })
      .catch(err => {
        // res
        //   .status(500)
          //.json({ error: err.message });
      });
});

app.get("/login/:id", (req,res) => {
  req.session.userID = req.params.id;
  return res.redirect("/");

  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
