var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var BusinessSchema = new Schema({
	image: {
		type: String,
		default:''
	},
	age: Number,
	rating: Number,
	name: String,
	type: String,
  phone: Number,
  bio: String,
	city: String,
	zip_code: String,
	state: String,
	hours: [{ open: Number, close: Number}],
  email: {type:String, unique: true},
	registered:{type:Boolean},
  created_at: {type: Date, default: Date.now },
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	street_address: String,
	location: {type: [Number]}, // [Long, Lat]
  deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
  extract:  [{type: Schema.Types.ObjectId, ref: 'Extract'}],
  flowers: [{type: Schema.Types.ObjectId, ref: 'Flower'}],
	password: {
		type:String,
		reuired: true,
		minlength: 8
	}
});
BusinessSchema.index({location: '2dsphere'});
mongoose.model('Business', BusinessSchema);
