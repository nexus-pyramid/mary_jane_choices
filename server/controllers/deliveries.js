var mongoose = require('mongoose');
var Delivery = mongoose.model('Delivery');
var Flower = mongoose.model('Flower');
var City = mongoose.model('City');
var Review = mongoose.model('Review');
var fs = require('fs')
function deliveriesController(){
	console.log("yooooooo");
	this.addReview = function(req, res){
		var newReview = new Review(req.body);
		console.log(newReview)
		newReview._delivery = req.params.id;
		newReview._user = req.session.User;
		newReview.save(function(err, result){
			if(err){
				res.send(400);
				console.log(err)
			} else {
				console.log('finding delivery');
				Delivery.findOne({_id: req.params.id}).exec(function(err, delivery){
					if(err){
						res.send(err);
						console.log(err);
					} else {
						delivery.reviews.push(newReview._id);
						delivery.save(function(err, result){
							if(err){
								res.json(err);
							} else {
								console.log('we made it ' + result);
								res.json(result);
							}
						});
					}
				})
			}
		});
	}
	this.getReviews = function(req, res){

	}
	this.addDelivery = function(req,res){

			console.log(req.body);


			var newDelivery  = new Delivery(req.body);
			var file = req.files.file;

			fs.readFile(file.path, function (err, original_data){
				if (err){
					res.json(400);
				} else {
					var bs = original_data.toString('base64');
					fs.unlink(file.path, function(err){
						if (err){
							console.log('failed to delete' + file.path);
						} else {
							console.log('successfully' + file.path);
						}
				});
		 		console.log(newDelivery.type)
		 		newDelivery.image = bs;
				newDelivery.save(function(err, result){
					if(err){
						res.json(err);
					} else {
						City.findOne({_id: req.body._city}).exec(function(err, city){
							console.log("city we're adding delivery too" + city);
							if(err){
								res.json(err);
							} else {
								city.deliveries.push(newDelivery._id);
								city.save(function(err, result){
									if(err){
										res.json(err);
									} else {
										res.json(result);
								}
							})
						}
					})
				}
			})
			}
		})
	}
	this.create = function(req,res){
		Delivery.create(req.body, function(err, result){
			if (err) {
			console.log('validation errors');
			res.json(err);
			} else {
			console.log('added a delivery Service');
			console.log(result);
			req.session.Delivery = {
				_id: Delivery._id,
				name: Delivery.name
			}
			res.json(req.body);
			}
		});
	}
	this.index  = function(req, res){
		Delivery.find({}).populate('_city').exec(function(err, data){
			console.log('getting all deliveries')
			if(err){
				console.log(err);
				res.send(200);
			} else {
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
module.exports = new deliveriesController();
