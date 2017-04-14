var mongoose = require('mongoose'),
		bcrypt   = require('bcrypt'),
		Schema   = mongoose.Schema;
        SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	name: {
		type:String,
		required: true
	},
	email: String,
	bio: String,
	_city:{type: Schema.Types.ObjectId, ref:'City'},
	password: {
		type:String,
		reuired: true,
		minlength: 8
	}
});
UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('User', UserSchema);
