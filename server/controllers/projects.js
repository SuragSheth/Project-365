var mongoose = require("mongoose");
var Project = mongoose.model("Project")

// add all of methods that interact with the 
module.exports = (function() {
  return {

    add: function(req, res) {
    	var project = new Project(req.body)

    	project.save(function(err){
    		if(err){
    			console.log("ERROR: Project Not Saved")
    		} else {
    			console.log("This is What Was Saved:", project);
    			console.log("SUCCESS: Project Has Been Saved")
                res.json(project);
    		}

    	});
    },

    allprojects: function(req, res) {
        Project.find({}, function(err, projects){
            console.log("All Projects", projects);
            res.json(projects)
        });
    },


  }

})();