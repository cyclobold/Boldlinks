var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user != null){
    const user = req.session.user;
    res.render('user', {
        firstname: user.firstname,
        lastname: user.lastname
    });
  }else{
    res.render("login");
  }
 
});

module.exports = router;
