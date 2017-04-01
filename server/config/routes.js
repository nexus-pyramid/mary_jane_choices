var path = require('path'),
    users = require('../controllers/users.js'),
    deliveries = require('../controllers/deliveries.js'),
    dispensaries = require('../controllers/dispensaries.js'),
    flowers = require('../controllers/flowers.js'),
    businesses = require('../controllers/businesses.js'),
    multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
// function loginAuthentication(req,res,next){
//   if (req.session.User){
//     next();
//   }else{
//     res.status(401).send("User not found");
//   }
// }
 function isLoggedIn(req, res, next) {
   if (req.isAuthenticated())
     return next();
     res.redirect('/');
 }
module.exports = function(app){
  app.post('/login', deliveries.login);
  app.post('/register', deliveries.create);
  // app.post('/flower', deliveries.addFlower);
  app.post('/delivery/:id', deliveries.addDelivery);
  app.post('/visit/:id', deliveries.show);
  app.get('/show/:id', deliveries.show);
  app.post('/user/:id', users.addUser);
  app.post('/review/:id', deliveries.addReview);
  app.post('/user', users.login);
  app.get('/getReviews',  deliveries.getReviews);
  app.get('/getDeliveries', businesses.getDeliveries);
  app.get('/getDispensaries', businesses.getDispensaries);
  app.get('/getDoctors', businesses.getDoctors);
  app.get('/flowers', flowers.index);
  app.post('/addBusiness', multipartyMiddleware, businesses.addBusiness);
  app.post('/flowerUpload', multipartyMiddleware, flowers.addFlower);
};
