var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var BusinessSchema = new Schema({
	image: {
		type: String,
		default:''
	},
	age: Number,
	rating: Number,
	name: String,
	type: String,
    phone: Number,
    bio: String,
	city: String,
	zip_code: String,
	state: String,
	hours: [{ open: Number, close: Number}],
    email: {type:String, unique: true},
	registered:{type:Boolean},
    created_at: {type: Date, default: Date.now },
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	street_address: String,
	location: {type: [Number]}, // [Long, Lat]
    deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
    extract:  [{type: Schema.Types.ObjectId, ref: 'Extract'}],
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
	password: {
		type:String,
		reuired: true,
		minlength: 8
	}
});
BusinessSchema.pre('save', function(next){
    var business = this;
    if (!business.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            business.password = hash;
            next();
        });
    });
});
BusinessSchema.index({location: '2d'});

BusinessSchema.methods.findNear = function(cb){
	return this.model('Business').find({geo: {$nearSphere: this.location, $maxDistance: 16094}}, cb );
}
mongoose.model('Business', BusinessSchema);
