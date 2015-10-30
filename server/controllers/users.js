var mongoose = require("mongoose");
var User = mongoose.model("User")

// add all of methods that interact with the 
module.exports = (function() {
  return {

    login: function(req, res){
      console.log("___________", req.body);
      User.find({$and:[{email: req.body.email}, {password: req.body.password}]}, function(err, user){
        if(err){
          console.log(err);
          console.log("ERROR: Could Not Log In")
          var error = {message: "Your Email & Passowrd Do Not Match"}
          res.json(error);
        } else {
          console.log(user, "Is Logged In")
          console.log("LOGGGGINNN", user);
          res.json(user);
        }       
      });
    },

    add: function(req, res) {
    	var user = new User(req.body)

    	user.save(function(err){
    		if(err){
    			console.log("ERROR: User Not Saved")
    		} else {
    			console.log("New User INFO:", user);
    			console.log("SUCCESS: User Has Been Saved")
                res.json(user);
    		}

    	});
    },










  }

})();