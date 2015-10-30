var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
		first_name: String,
		last_name: String,
		occupation: String,
		email: String,
		password: String,
		created_at: Date
	});

mongoose.model('User', userSchema);
