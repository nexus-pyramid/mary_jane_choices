var mongoose = require('mongoose');
var City = mongoose.model('City');
var County = mongoose.model('County');
var Flower = mongoose.model('Flower');
function countiesController(){
	this.addCounty= function(req,res){
		County.create(req.body, function(err, result){
			if (err) {
			console.log('validation errors');
			res.json(err);
			} else {
			console.log('added a county');
			console.log(result);
			res.json(result);
			}
		});
	}
	this.delete = function(req, res){
		County.remove({_id: req.params.id}).exec(function(err, county){
			if(err){
				console.log('couldnt find county');
			} else {
				
				console.log('county we are removing:' + county );
				res.json(200);
			}
		})
	}
	this.index = function(req, res){
		County.find({}).populate('cities').exec(function(err, data){
			if(err){
				console.log(err);
				res.json(400);
			} else {
				console.log("Counties and their respective cities");
				console.log(data);
				res.json(data);
			}
		})
	}

}
module.exports = new countiesController();
