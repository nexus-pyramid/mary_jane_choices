var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt')
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
		console.log(req.body)
			User.findOne({email: req.body.email}, function(err, user){
				var errors = {errors:{
					general: 'Invalid login information'}}
				if(!user){
					// console.log(err)
					res.json(errors);
				} else { bcrypt.compare( req.body.password, user.password, function(err, doesMatch) {
					if (doesMatch){
						req.session.Logged = {
							_id: user._id,
							name: user.name,
							type: 'user'
						}
						res.json(req.session.Logged)
					} else {
						console.log('bad password')
						res.json(errors);						
					}
				})
				 	// console.log(req.session.Logged)
			}
		})
	}
		
	


	this.getLogged = function(req, res){
		 console.log(req.session.Logged)
		return res.json(req.session.Logged)
	}
}
module.exports = new usersController();
