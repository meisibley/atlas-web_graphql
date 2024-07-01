const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	title: String,
	weight: Number,
	description: String,
});

module.exports = mongoose.model('Project', projectSchema);
