var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var ExtractSchema = new Schema({
  _business: {type: Schema.Types.ObjectId, ref:'Business'},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	image: {type: String},
	name: {type: String},
	description: String,
	type: String,
	one_gram: Number,
	two_gram: Number,
	half_gram: Number,
  thc: Number
});
mongoose.model('Extract', ExtractSchema);
