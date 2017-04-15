var path = require('path'),
    users = require('../controllers/users.js'),
    deliveries = require('../controllers/deliveries.js'),
    dispensaries = require('../controllers/dispensaries.js'),
    flowers = require('../controllers/flowers.js'),
    businesses = require('../controllers/businesses.js'),
    multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var errors = {errors:{
      general: 'Invalid login information'
    }}
      console.log("in the login in method");
function loginAuthentication(req,res,next){
  if (req.session.Logged){
    next();
  }else if (req.session.Logged == ''){
      console.log('you messed up')
        res.json(401);
      } else {
          console.log('in the mfucking auth')
        res.json(401);
  }
}

module.exports = function(app){
  app.post('/login', businesses.login);
  app.get('/getlogged', businesses.getLogged);
  app.post('/register', deliveries.create);
  // app.post('/flower', deliveries.addFlower);
  app.post('/delivery/:id', deliveries.addDelivery);
  // app.post('/visit/:id', deliveries.show);
  app.get('/show/:id', businesses.show);
  // app.get('/sendCoords', businesses.sendCoords)
  app.post('/addBusiness', multipartyMiddleware, businesses.addBusiness);
  app.post('/user', users.login);
  app.get('/getReviews',  deliveries.getReviews);
  // app.get('/getDives', businesses.getDeliveries);
  app.post('/getDeliveries', businesses.getDeliveries);
  app.post('/getDispensaries', businesses.getDispensaries);
  app.post('/getDoctors', businesses.getDoctors);
  app.post('/user/:id', users.addUser);
  app.get('/flowers', flowers.index);
  app.get('/showProducts/:id', businesses.show);
  // app.use(loginAuthentication);
  app.get('/logout', businesses.logout);
  app.post('/editProduct', multipartyMiddleware, businesses.editProduct);
  app.post('/productUpload', multipartyMiddleware, businesses.addProduct);
  app.post('/review/:id', deliveries.addReview);
};
