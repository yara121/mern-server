const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const path = require('path');

const v1 = require("./routes/v1");
const app = express();

//---------------- DB Config -------------//
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.set("useUnifiedTopology", true);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});
mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to the database :${err}`);
});
//---------------- Middlewares -------------//

app.use(logger("dev"));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//---------------- Routes -------------//

app.use("/api/v1", v1);
//---------------- Static Files -------------//
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../../client/build')));
  app.get('*',(req,res) => {
    res.sendFile(
      path.resolve(__dirame,'../../client','build','index.html')
    )
  })
}

//---------------- ERRORS -------------//

app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || "Error processing your request";

  res.status(status).send({
    error,
  });
});
module.exports = app;

// app.post("/hello", (req, res) => {
//   const name = req.body.name;
//   res.send({
//     message: `Welcome ${name}`,
//   });
// });
// app.post("/register", (req, res) => {
//   const name = req.body.name;
//   res.send({
//     message: `Welcome ${name}`,
//   });
// });
// app.post("/login", (req, res) => {
//   const name = req.body.name;
//   res.send({
//     message: `Welcome ${name}`,
//   });
// });
