var mongoose = require('mongoose'),
		bcrypt   = require('bcrypt-nodejs'),
		Schema   = mongoose.Schema;

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
module.exports = mongoose.model('User', UserSchema);
UserSchema.methods.geenerateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPssword = function(passowrd){
	return bcrypt.compareSync(password, this.local.password);
};
