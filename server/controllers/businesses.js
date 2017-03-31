var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Review = mongoose.model('Review');
var fs = require('fs')
function businessesController(){

	this.addBusiness = function(req,res){
			console.log(req.body);
			var newBusiness = new Business(req.body);
			var file = req.files.file;
			fs.readFile(file.path, function (err, original_data){
				if (err){
					res.json(400);
				} else {
					var bs = original_data.toString('base64');
					newBusiness.image = bs;
					fs.unlink(file.path, function(err){
						if (err){
							console.log('failed to delete' + file.path);
						} else {
							console.log('successfully' + file.path);
						}
						newBusiness.save(function(err, result){
							if(err){
								res.json(err);
						} else {
							console.log(result);
							res.json(result)
						}
					})
				});
			}
		})
	}
	this.getDispensaries = function(req,res){
		console.log('getting dispensaries');
		Business.find({type: "Dispensary"}).exec(function(err, data){
			console.log('getting dispensaries');
			// console.log(data);
			if(!Business){
				console.log(err);
			}
			else if(err){
				console.log(err);
				res.json(err);
			} else {
				console.log('success')
				// console.log(data);
				res.json(data);
			}
		})
	}
	this.getDoctors = function(req,res){
		console.log('getting doctors');
		Business.find({type: "Doctor"}).exec(function(err, data){
			console.log('getting dispensaries');
			// console.log(data);
			if(!Business){
				console.log(err);
			}
			else if(err){
				console.log(err);
				res.json(err);
			} else {
				console.log('success')
				// console.log(data);
				res.json(data);
			}
		})
	}
	this.getDeliveries = function(req,res){
		console.log('getting deliveries');
		Business.find({type: "Delivery"}).exec(function(err, data){
			console.log('getting dispensaries');
			// console.log(data);
			if(!Business){
				console.log(err);
			}
			else if(err){
				console.log(err);
				res.json(err);
			} else {
				console.log('success')
				console.log(data);
				res.json(data);
			}
		})
	}
	this.validate = function(req, res){
		Delivery.update({_id: req.params.id}, {registered: true}).exec(function(err, data){
			if(!Delivery){
				console.log(err)
			}
			else if(err){
				console.log(err)
			} else {
				console.log(data);
				res.json(data);
			}
		})
	}
	this.show = function(req, res){
		console.log('in the show delivery function');
		Delivery.findOne({_id: req.params.id}).populate({path:'reviews', populate:{path: '_user'}}).exec(function(err, data){
			if(err){
				console.log(err);
				res.send(400);
			} else {
				console.log("this is the delivery service");
				console.log(data);
				res.json(data);
			}
		});
	}
	this.addFlower = function(req,res){
		console.log('in the add Flower function');
		var newFlower = new Flower(req.body);
		console.log(newFlower);
		newFlower._delivery = req.session.Delivery;
		console.log(req.session.Delivery);
		newFlower.save(function(err, result){
			if(err){
				res.sendStatus(400);
			} else {
				Delivery.findOne({_id: req.session.Delivery._id }).exec(function(err, delivery){
					console.log("company we're adding flowers too")
					console.log(delivery);
					if(err){
						console.log(err);
						res.sendStatus(400);
					} else{
						delivery.flowers.push(newFlower._id);
						delivery.save(function(err, result){
							if(err){
								res.json(err);
							} else {
								console.log('it lit');
								res.json(result);
							}
						})
					}
				})
			}
		})
	}
	this.login = function(req, res){
		var errors = {errors:{
			general: 'Invalid login information'}}
      console.log(Delivery);
			console.log("in the login in method");
		Delivery.findOne({password: req.body.password}, function(err, Delivery){
			// console.log(User)
			if(err){
				console.log(Delivery);
				console.log(password);
				res.json(err);
			} if(Delivery.password != req.body.password) {
				res.json(errors);
			} else {
				req.session.Delivery = {
				_id: Delivery._id,
				name: Delivery.name
			}
			console.log('this is the session delivery');
			 console.log(req.session.Delivery);
			// res.json(req.session.Delivery);
			res.status(200).send("good")
			}
		})
	}
	this.getLogged = function(req, res){
		 console.log(req.session.User)
		return res.json(req.session.User)
	}
}
module.exports = new businessesController();
