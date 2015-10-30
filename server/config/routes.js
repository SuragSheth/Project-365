// var mongoose = require("mongoose");

// // We are difinig the model once again
// var Friend = mongoose.model('Friend');

// We are reqiring the model
var project = require('../controllers/projects.js');
var user = require('../controllers/users.js');

module.exports = function(app) {

	// Main App
	app.post('/login', function(req, res) {
		    user.login(req, res);
    });

    app.post('/register', function(req, res) {
        user.add(req, res);
    });

    app.post('/add_project', function(req, res) {
		    project.add(req, res);
    });


    

    // Admin App
    app.post('/admin_login', function(req, res) {
		    admin.login(req, res);
    });

    app.get('/proposed_projects', function(req, res) {
		    project.shownew(req, res);
    });

     app.get('/all_projects', function(req, res) {
		    project.allprojects(req, res);
    });

    // app.post('/addto_schedule', function(req, res) {
		  //   friend.show(req, res);
    // });

    // app.post('/delete_project', function(req, res) {
		  //   friend.show(req, res);
    // });
}