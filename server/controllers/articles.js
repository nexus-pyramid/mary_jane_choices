var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var fs = require('fs');
function articlesController(){

  this.createWithUpload = function(req, res){
     var file = req.files.file;
     console.log(file);
     console.log(file.type);
     console.log(file.path);
     console.log(req.body);

    //  var art = JSON.parse(req.body.article);
     var article = new Article(req.body);
     console.log(article);
     fs.readFile(file.path, function (err,original_data){
       if (err){
         res.json(400);
       } else {
          var base64Image = original_data.toString('base64');
          fs.unlink(file.path, function (err){
         if (err){
          console.log('failed to delete' + file.path);
           } else {
             console.log('successfully deleted' + file.path);
           }
         })
        article.image = base64Image;
        article.save(function(err){
          if (err){
            return res.json(err);
          } else {
            res.json(article);
          }
        })
      }
    })
  }
}
module.exports = new articlesController();
