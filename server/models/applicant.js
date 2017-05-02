var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var ApplicantSchema = new Schema({
	image: {type: String},
	phone: Number,
	name: {type: String},
	description: String,
	email: String
});
mongoose.model('Applicant', ApplicantSchema);
console.log('etdtdtdtdtydt')