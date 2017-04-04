var mongoose = require('mongoose');
// var request = require('request');
var Flower = mongoose.model('Flower');
// var Strain = mongoose.model('Strain');
var Delivery = mongoose.model('Delivery');
var Business = mongoose.model('Business');
var fs = require('fs');
function flowersController(){
  this.index = function(req, res){
    Flower.find({}).exec(function(err, data){
      if(err){
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    })
  }


 //  this.getAPI = function(req, res){
 //  	var page = 0;
 //  	var apidata = []

 //  	request.get("https://www.cannabisreports.com/api/v1.0/strains?page=0", function(err, response, body) {
	// 	if (!err && response.statusCode == 200) {
	// 		var locals = JSON.parse(body);
	// 		page = 901
	// 		console.log(page)
	// 		for (var i = 10; i >= 0; i --){
	// 			request.headers = {}
	// 			request.headers.X_API_Key = "3aaa9829ada967127e2c634c3f7258aff328d791"
	// 	  		request.get("https://www.cannabisreports.com/api/v1.0/strains?page=" + i, function(err, response, body) {
	// 				if (!err && response.statusCode == 200) {
	// 					var locals = JSON.parse(body);
	// 					for (var n =0; n < locals.meta.pagination.count; n++){

	// 						// save to data base

	// 						apidata.push({"name" : locals.data[n].name})
	// 					}

	// 					console.log("api hit " + i)
	// 				}
	// 				if (i < 0){
	// 	  				console.log("response ran")
	// 					res.json(apidata);
	// 				}
	// 			})
	// 			console.log(i)
	// 	  	}
	// 	}
	// })





 //  }

  this.addStrain = function(req, res){
    var newStrain = new Strain(req.body)
    newStrain.save(function(err, result){
      if(err){
        res.json(err);
      } else {
        Business.findon({_id: req.params.id}).exec(function(err, business){
          console.log(business);
          if(!business){
            res.json(err);
          } else {
            strain.businesses.push()
          }
        })
      }
    })
  }

  this.addFlower = function(req,res){
		console.log('in the add Flower function');
    var file = req.files.file;
		var newFlower = new Flower(req.body);
		console.log(newFlower);
    console.log(file)
		newFlower._business = req.session.Business;

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
        newFlower.image = bs;
		    newFlower.save(function(err, result){
			       if(err){
				         res.sendStatus(400);
			            } else {
                        // var newstrain = new Strain(newFlower.name)
                        // if
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
}
module.exports = new flowersController();
