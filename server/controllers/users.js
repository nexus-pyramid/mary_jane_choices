var mongoose = require('mongoose');
var User = mongoose.model('User');
var City = mongoose.model('City');
function usersController(){
	this.addUser = function(req,res){
		var newUser = new User(req.body);
		newUser._city - req.params.id;
		newUser.save(function(err, result){
			if(err){
				res.json(err);
			} else {
				City.findOne({_id: req.params.id}).exec(function(err, city){
					if(err){
						res.json(err);
					} else {
						city.users.push(newUser._id);
						city.save(function(err, result){
							if (err){
								res.json(err)
							} else {
								res.json(result)
							}
						});
					}
				});
			}
		});
	}
	this.login = function(req, res){
		var errors = {errors:{
			general: 'Invalid login information'}}
			// if (!User){
			// 	console.log(errors)
			// 	res.json(errors);
			// }
				User.findOne({password: req.body.password}, function(err, User){

					if(!User){
						console.log(err)
						res.json(err);
					} else if(User.password != req.body.password) {
						res.json(errors);
					} else {
						req.session.User = {
						_id: User._id,
						name: User.name
					}
					 console.log(req.session.User)
					res.json(req.session.User);
					// res.status(200).send("good")
					}
				})
		}

	this.getLogged = function(req, res){
		 console.log(req.session.User)
		return res.json(req.session.User)
	}
}
module.exports = new usersController();
