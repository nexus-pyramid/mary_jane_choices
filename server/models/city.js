var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var CitySchema = new Schema({
	name: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	businesses: [{type: Schema.Types.ObjectId, ref: 'Business'}],
	deliveries: [{type: Schema.Types.ObjectId, ref: 'Delivery'}],
  dispensaries: [{type: Schema.Types.ObjectId, ref: 'Dispensary'}]
});
mongoose.model('City', CitySchema);
