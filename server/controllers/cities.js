var mongoose = require('mongoose');
var County = mongoose.model('County');
var City = mongoose.model('City');
function citiesController(){

	this.index  = function(req, res){
		City.find({}).exec(function(err, data){
			if(err){
				console.log(err);
				res.send(200);
			} else {
				console.log(data);
				res.json(data);
			}
		})
	}
	this.addCity = function(req, res){
    var newCity = new City(req.body);
    newCity._county = req.params.id;
    newCity.save(function(err,result){
      if(err){
        console.log(err);
        res.json(err);
      } else {
        County.findOne({_id: req.params.id}).exec(function(err, county){
          console.log("county were adding city too");
          if(err){
            res.json(err);
          } else {
            county.cities.push(newCity._id);
            county.save(function(err, result){
              if(err){
                res.json(err);
              } else{
								console.log(result);
                res.json(result);
              }
            })
          }
        })
      }
    })
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
}
module.exports = new citiesController();
