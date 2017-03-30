var path = require('path');
var users = require('../controllers/users.js');
var deliveries = require('../controllers/deliveries.js');
var dispensaries = require('../controllers/dispensaries.js');
var flowers = require('../controllers/flowers.js');
var counties = require('../controllers/counties.js');
var cities = require('../controllers/cities.js');
var articles = require('../controllers/articles.js');
var businesses = require('../controllers/businesses.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty()
function loginAuthentication(req,res,next){
  if (req.session.User){
    next();
  }else{
    res.status(401).send("User not found");
  }
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
  app.get('/getDeliveries', deliveries.index);
  app.get('/getDispensaries', businesses.getDispensaries);
  app.get('/flowers', flowers.index);
  app.post('/addDelivery', multipartyMiddleware, deliveries.addDelivery);
  app.post('/addDispensary', multipartyMiddleware, businesses.addBusiness);
  app.post('/flowerUpload', multipartyMiddleware, flowers.addFlower);
  app.post('/articleupload', multipartyMiddleware, articles.createWithUpload);
  app.post('/addCounty', counties.addCounty);
  app.post('/deleteCounty/:id', counties.delete)
  app.get('/getCounties', counties.index);
  app.get('/getCities', cities.index);
  app.post('/county/:id/cities', cities.addCity);
};
