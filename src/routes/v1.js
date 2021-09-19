const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users.controller");
const expenseController = require("../controllers/expense.controller");

// Auth and Sign up
router.post("/register", userController.register);

router.post("/auth", userController.login);

// Customze and Protect the routes
router.all("*", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error("You are not authorized to access this area");
      error.status = 401;
      throw error;
    }

    //
    req.user = user;
    return next();
  })(req, res, next);
});
// ----------- Protected Routes ------------//
router.get("/me", userController.me);
router.get("/expense/:month?", expenseController.get);
router.post("/expense", expenseController.create);
router.put("/expense/:expense_id", expenseController.update);
router.delete("/expense/:expense_id", expenseController.destroy);

module.exports = router;
