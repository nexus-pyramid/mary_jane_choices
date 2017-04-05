var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Review = mongoose.model('Review');
var Flower = mongoose.model('Flower')
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
							// console.log(result);
							res.json(result)
						}
					})
				});
			}
		})
	}
	this.show = function(req, res){
		Business.findOne({_id: req.params.id}).populate('flowers').populate({path:'reviews', populate:{path:'_user'}}).exec(function(err, data){
			if(!Business){
				console.log(err);
			} else if(err) {
				console.log(err);
				res.json(err);
			} else {
				console.log('this is the business')
				console.log(data)
				res.json(data);
			}
		})
	}
	this.getDispensaries = function(req,res){
		Business.find({type: "Dispensary"}).exec(function(err, data){
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
		Business.find({type: "Doctor"}).exec(function(err, data){
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
		Business.find({type: "Delivery"}).exec(function(err, data){
			// console.log(data);
			if(!Business){
			}
			else if(err){
				res.json(err);
			} else {
				console.log('success')
				// console.log(data);
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
				// console.log(data);
				res.json(data);
			}
		})
	}
	this.addFlower = function(req,res){
		console.log('in the add Flower function');
		var newFlower = new Flower(req.body);
		console.log(newFlower);
		newFlower._business = req.session.Business;
		console.log(req.session.Business);
		newFlower.save(function(err, result){
			if(err){
				res.sendStatus(400);
			} else {
				Business.findOne({_id: req.session.Business._id }).exec(function(err, business){
					console.log("company we're adding flowers too")
					console.log(business);
					if(err){
						console.log(err);
						res.sendStatus(400);
					} else{
						business.flowers.push(newFlower._id);
						business.save(function(err, result){
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
		// console.log(req.body)
		var errors = {errors:{
			general: 'Invalid login information'}}
			console.log("in the login in method");
		Business.findOne({email: req.body.email}, function(err, Business){
			console.log(Business);
			if(!Business){
				res.json(errors)
			} else if(Business.password != req.body.password) {
				console.log(err);
				res.json(errors);
			} else {
				req.session.Business = {
				_id: Business._id,
				name: Business.name
			}
			console.log('this is the session Business');
			 console.log(req.session.Business);
			 console.log(Business.type);
			// res.json(req.session.Delivery);
			// res.status(200).send("good")
			res.json(req.session.Business);
			}
		})
	}
	this.getLogged = function(req, res){
		 console.log(req.session.User)
		return res.json(req.session.User)
	}
}
module.exports = new businessesController();
