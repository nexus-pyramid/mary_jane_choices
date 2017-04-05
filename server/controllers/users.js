var mongoose = require('mongoose');
var User = mongoose.model('User');
function usersController(){
	this.addUser = function(req,res){
		var newUser = new User(req.body);
		newUser.save(function(err, result){
			if(err){
				res.json(err);
			}else {
					res.json(result);
				}
			});
		}
	this.login = function(req, res){
			User.findOne({email: req.body.email}, function(err, user){
				var errors = {errors:{
					general: 'Invalid login information'}}
				if(!user){
					// console.log(err)
					res.json(errors);
				} else if(user.password != req.body.password) {
					res.json(errors);
				} else {
					req.session.User = {
						_id: user._id,
						name: user.name
					}
				 	// console.log(req.session.User)
					res.json(req.session.User);
				}
			})
		}

	this.getLogged = function(req, res){
		 console.log(req.session.User)
		return res.json(req.session.User)
	}
}
module.exports = new usersController();
