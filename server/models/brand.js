var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var BrandSchema = new Schema({
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	image: {type: String},
	name: {type: String},
	description: String,
	featured: Boolean,
  	category: String,
  	products:  [{type: Schema.Types.ObjectId, ref: 'Product'}],
    image: {
		type: String,
		default:''
	},
	password: {
		type:String,
		reuired: true,
		minlength: 8
	},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    bio: String,
    street_address: String,
    location: [{type: [Number]}] // [Long, Lat]
});
BrandSchema.index({location: '2d'});
mongoose.model('Brand', BrandSchema);
