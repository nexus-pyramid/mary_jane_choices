var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var DealSchema = new Schema({
	_business: {type: Schema.Types.ObjectId, ref:'Business'},
  title: {type: String},
	content: {type: String}
});
mongoose.model('Deal', DealSchema);
