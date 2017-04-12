var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Review = mongoose.model('Review');
var Flower = mongoose.model('Flower');
var bcrypt = require('bcrypt');
var Product = mongoose.model('Product');
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
		console.log('in the show function')
		//I changed this because it would only show logged in busness' products
		// Business.findOne({_id: req.session.Logged._id}).populate('products').populate({path:'reviews', populate:{path:'_user'}}).exec(function(err, data){
		Business.findOne({_id: req.params.id}).populate('products').populate({path:'reviews', populate:{path:'_user'}}).exec(function(err, data){
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
	this.updateProduct = function(req,res){
		Product.findOne({_id: product._id}, function(err, newproduct){
			if(err){
				console.log(err);
			} else {
				newproduct.name = req.body.name;
				newproduct.description = req.body.description;
				newproduct.type = req.body.type;
				newproduct.ProductType = req.body.ProductType;
				newproduct.each = req.body.each;
				newproduct.half_gram = req.body.half_gram;
				newproduct.one_gram = req.body.one_gram;
				newproduct.two_gram = req.body.two_gram;
				newproduct.eigth = req.body.eigth;
				newproduct.quarter = req.body.quarter;
				newproduct.half = req.body.half;
				newproduct.ounce = req.body.ounce;
				newproduct.thc = req.body.thc;
				newproduct.cbd = req.body.cbd;
				newproduct.price = req.body.price;
				var newfile = req.files.files;
				fs.readFile(newfile.path, function( err, new_data){
					if(err){
						res.json(err);
					} else {
						var bs = new_data.toString('base64');
	        			fs.unlink(newfile.path, function(err){
	          				if (err){
	            				console.log(err);
	            				console.log('failed to delete' + newfile.path);
	         				} else {
	            				console.log('successfully' + newfile.path);
	          				}
	        			});
	        			newProduct.image = bs
	        			newProduct.save(function(err, result){
	        				if(err){
					         res.sendStatus(400);
				            } else {
	                        // var newstrain = new Strain(newFlower.name)
	                        // if () {}
	                        	console.log(req.session.Logged);
					                Business.findOne({_id: req.session.Logged._id }).exec(function(err, business){
						              console.log("company we're adding this mf product too")
						              console.log(business);
						              if(err){
							               console.log(err);
							              res.sendStatus(400);
						              } else{
							              business.products.push(newProduct._id);
							              business.save(function(err, result){
								                if(err){
									               res.json(err);
								                } else {
									                console.log('adding flower');
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
		})
	}
	this.addProduct = function(req,res){
    	var file = req.files.file;
		var newProduct = new Product(req.body);
		newProduct._business = req.session.Logged;

	    fs.readFile(file.path, function ( err, original_data){
	      if (err){
	        res.json(400);
	      } else {
	        var bs = original_data.toString('base64');
	        fs.unlink(file.path, function(err){
	          if (err){
	            console.log(err);
	            console.log('failed to delete' + file.path);
	          } else {
	            console.log('successfully' + file.path);
	          }
	        });
	        newProduct.image = bs;
			    newProduct.save(function(err, result){
				       if(err){
					         res.sendStatus(400);
				            } else {
	                        // var newstrain = new Strain(newFlower.name)
	                        // if () {}
	                        	console.log(req.session.Logged);
					                Business.findOne({_id: req.session.Logged._id }).exec(function(err, business){
						              console.log("company we're adding flowers too")
						              console.log(business);
						              if(err){
							               console.log(err);
							              res.sendStatus(400);
						              } else{
							              business.products.push(newProduct._id);
							              business.save(function(err, result){
								                if(err){
									               res.json(err);
								                } else {
									                console.log('adding flower');
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
		newFlower._business = req.session.Logged;
		console.log(req.session.Logged);
		newFlower.save(function(err, result){
			if(err){
				res.sendStatus(400);
			} else {
				Business.findOne({_id: req.session.Logged._id }).exec(function(err, business){
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
		Business.findOne({email: req.body.email}, function(err, business){
			console.log(business);
			if(!business){
				res.json(errors)
			} else if(business.password != req.body.password) {
				console.log(err);
				res.json(errors);
			} else {
				req.session.Logged = {
					_id: business._id,
					name: business.name,
					type: business.type
				}
				console.log('this is the session Business');
				console.log(req.session.Logged);
				res.json(req.session.Logged);
			}
		})
	}
	this.getLogged = function(req, res){
		return res.json(req.session.Logged)
	}
	this.logout = function(req,res){
		console.log("Logging out user");
		req.session.Logged = '';
		return res.json(req.session.Logged)	
	}
}
module.exports = new businessesController();
