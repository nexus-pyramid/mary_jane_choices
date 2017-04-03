var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var StrainSchema = new Schema({
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	_business:[{type: Schema.Types.ObjectId, ref:'Business'}],
	name: {type:String, unique: true},
	type: String,
	votes: {type: Number, default: 0}
});
mongoose.model('Strain', StrainSchema);
