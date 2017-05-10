var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	_business: {type: Schema.Types.ObjectId, ref: 'Business'},
	review: {type: String}
});
mongoose.model('Review', ReviewSchema);
