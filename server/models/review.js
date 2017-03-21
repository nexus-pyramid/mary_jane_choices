var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	_delivery: {type: Schema.Types.ObjectId, ref: 'Message'},
	review: {type: String}
});
mongoose.model('Review', ReviewSchema);
