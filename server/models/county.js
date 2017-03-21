var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var CountySchema = new Schema({
	name: String,
  cities: [{type: Schema.Types.ObjectId, ref: 'City'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});
mongoose.model('County', CountySchema);
