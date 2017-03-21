var mongoose = require('mongoose');
var Flower = mongoose.model('Flower');
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
}
module.exports = new flowersController();
