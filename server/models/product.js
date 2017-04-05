var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var ProductSchema = new Schema({
    _business:{type: Schema.Types.ObjectId, ref:'Business'},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	image: {type: String},
	name: {type: String},
	description: String,
	type: String,
<<<<<<< HEAD
    half_gram: Number,
=======
  class: String,
  each: Number,
  half_gram: Number,
>>>>>>> 8bb6c3666f5bfb1df90983c6f759c9eb907c1aec
	one_gram: Number,
	two_gram: Number,
	eigth: Number,
	quarter: Number,
  age_restriction: Number,
	half: Number,
	ounce: Number,
<<<<<<< HEAD
    thc: Number,
    cbd: Number
=======
  thc: Number
>>>>>>> 8bb6c3666f5bfb1df90983c6f759c9eb907c1aec
});
mongoose.model('Product', ProductSchema);
