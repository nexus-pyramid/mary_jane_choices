var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var StrainSchema = new Schema({
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	_business:[{type: Schema.Types.ObjectId, ref:'Business'}],
	name: String,
	type: String,
	votes: {type: Number, default: 0},
	votes_over_time: [{type: Number}]

});
mongoose.model('Strain', StrainSchema);
