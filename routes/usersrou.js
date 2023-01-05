const { response } = require("express");
var express = require("express");
var router = express.Router();
var prohelpers = require("../helpers/prohelp");
var userhelpers = require("../helpers/userhelp");

/* GET home page. */
router.post("/login", function (req, res, next) {
  userhelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user;
      req.session.user.loggedIn = true;
      
      res.redirect("/");
     
    } else {
      req.session.logErr=true
      res.redirect("/login");
    }
  });
});


router.get("/", function (req, res, next) {
  let user = req.session.user;
  if (req.session.user) {
    prohelpers.getProduct().then((products) => {
      res.render("users/userhome", { title: "shoppie", products, user });
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("users/userlogin", { title: "shoppie",logErr:req.session.logErr });
    req.session.logErr=false
  }
});
router.get("/logout", function (req, res) {
  req.session.user=null;

  res.redirect("/login");
});


router.get("/signup", function (req, res, next) {
 
    res.render("users/usersignup", { title: "shoppie" });
    
});

router.post("/signup", function (req, res, next) {
  userhelpers.doSignup(req.body).then((response) => {});
  res.redirect("/login");
});

module.exports = router;
