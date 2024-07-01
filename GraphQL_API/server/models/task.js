const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	title: String,
	weight: Number,
	description: String,
	projectId: String
});

module.exports = mongoose.model('Task', taskSchema);
