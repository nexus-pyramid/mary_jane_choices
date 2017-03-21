var mongoose = require('mongoose');
	Schema = mongoose.Schema;
console.log(mongoose);
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
mongoose.model('User', UserSchema);
