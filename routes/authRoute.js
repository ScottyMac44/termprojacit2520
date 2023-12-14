const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/auth/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get("/reminders", ensureAuthenticated, (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  res.render("reminders", { user: req.user });
});

module.exports = router;
