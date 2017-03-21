var mongoose = require('mongoose');
	Schema = mongoose.Schema;
console.log(mongoose);
var DeliverySchema = new Schema({
	image: {
		type: String,
		default:''
	},
	name: String,
  phone: Number,
  bio: String,
	_city: {type: Schema.Types.ObjectId, ref:'City'},
  email: String,
  created_at: {type: Date, default: Date.now },
	street_address: String,
	location: {type: [Number]}, // [Long, Lat]
  flowers: [{type: Schema.Types.ObjectId, ref: 'Flower'}],
	password: {
		type:String,
		reuired: true,
		minlength: 8
	}
});
DeliverySchema.index({location: '2dsphere'});
mongoose.model('Delivery', DeliverySchema);
