var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user != null){
    res.redirect("/user");
  }else{
    res.render('login');
  }
  
});

module.exports = router;
