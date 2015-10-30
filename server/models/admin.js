var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
		first_name: String,
		last_name: String,
		email: String,
		password: String,
		created_at: Date
	});

mongoose.model('Admin', adminSchema);
