var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt'),
	SALT_WORK_FACTOR = 10,
	Schema = mongoose.Schema;
var AdminSchema = new Schema({
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	name: String,
	password: {type: String}
});
AdminSchema.pre('save', function(next){
    var admin = this;
    if (!admin.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(admin.password, salt, function(err, hash){
            if(err) return next(err);
 
            admin.password = hash;
            next();
        });
    });
});
AdminSchema.pre('insert', function(next){
    var admin = this;
    if (!admin.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(admin.password, salt, function(err, hash){
            if(err) return next(err);
 
            admin.password = hash;
            next();
        });
    });
});
mongoose.model('Admin', AdminSchema);
