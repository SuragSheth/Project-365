var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
		user_id: String,
		title: String,
		short_description: String,
		location: String, 
		mission: String,
		category: String,
		video_url: String,
		full_description: String,
		status: String,
		location: String,
		data_breakdown: [],
		created_at: Date
	});

mongoose.model('Project', projectSchema);
