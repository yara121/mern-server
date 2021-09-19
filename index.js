// const express = require("express");
// const router = express.Router();
// const app = express();

// app.use(router);
// router.get("/", (req, res) => {
//   res.send({
//     message: "Hello World",
//   });
// });

require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is ready for connections on ${PORT}`);
});
