var mongoose = require('mongoose');
var Flower = mongoose.model('Flower');
var Delivery = mongoose.model('Delivery');
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
  this.addFlower = function(req,res){
		console.log('in the add Flower function');
    var file = req.files.file;
		var newFlower = new Flower(req.body);
		console.log(newFlower);
    console.log(file)
		newFlower._delivery = req.session.Delivery;
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
    })
  }
}
module.exports = new flowersController();
