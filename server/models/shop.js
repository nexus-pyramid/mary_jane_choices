var mongoose = require('mongoose');
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;
	console.log('yo');
	
var ShopSchema = new Schema({
	products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
	businesses: [{type: Schema.Types.ObjectId, ref: 'Business'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
    type: String,
	image: {
		type: String,
		default:''
	},
	name: {type: String},
	email: {type:String},
	password: {
		type:String,
		reuired: true,
		minlength: 8
	}
	// : String,
});
ShopSchema.pre('save', function(next){
    var shop = this;
    if (!shop.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(shop.password, salt, function(err, hash){
            if(err) return next(err);
 
            shop.password = hash;
            next();
        });
    });
});
// console.log(ShopSchema)
mongoose.model('Shop', ShopSchema);
