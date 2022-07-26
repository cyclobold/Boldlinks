var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //if user is logged in 
  //const is_user_logged_in = false;
  if(req.session.user && req.session.user != null){
    res.render('create-post');
  }else{
    res.render("login");
  }


  
});

module.exports = router;
