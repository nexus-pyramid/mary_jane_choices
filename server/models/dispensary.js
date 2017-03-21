var mongoose = require('mongoose');
	Schema = mongoose.Schema;
console.log(mongoose);
var DispensarySchema = new Schema({
	name: String,
	password: {
		type:String,
		reuired: true,
		minlength: 8,
	},
	location: {type: [Number], required: true},
	htmlverified: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	_city: {type: Schema.Types.ObjectId, ref:'City'},
  flowers: [{type: Schema.Types.ObjectId, ref: 'Flower'}]
});
mongoose.model('Dispensary', DispensarySchema);
