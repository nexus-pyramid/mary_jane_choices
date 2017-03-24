var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	_delivery: {type: Schema.Types.ObjectId, ref: 'Delivery'},
	_dispensary: {type: Schema.Types.ObjectId, ref: "Dispensary"},
	_doctor: {type: Schema.Types.ObjectId, ref: "Doctor"},
	review: {type: String}
});
mongoose.model('Review', ReviewSchema);
