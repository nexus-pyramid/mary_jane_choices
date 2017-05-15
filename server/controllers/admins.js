var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');
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
			Admin.findOne({name: req.body.name}, function(err, admin){
				console.log(admin);
				var errors = {errors:{
					general: 'Invalid login information'}}
				if(!admin){
					// console.log(err)
					res.json(errors);
				} else { 
					if (req.body.password == admin.password){
						req.session.Logged = {
							_id: admin._id,
							type: 'admin'
						}
						res.json(req.session.Logged)
					} else {
						console.log('bad password')
						res.json(errors);						
					}
				
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
