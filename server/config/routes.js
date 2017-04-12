var path = require('path'),
    users = require('../controllers/users.js'),
    deliveries = require('../controllers/deliveries.js'),
    dispensaries = require('../controllers/dispensaries.js'),
    flowers = require('../controllers/flowers.js'),
    businesses = require('../controllers/businesses.js'),
    multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
function loginAuthentication(req,res,next){
  if (req.session.Logged){
    next();
  }else if (req.session.Logged == ''){
    res.redirect('/');
  } else {
    res.redirect('/')
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
  app.post('/addBusiness', multipartyMiddleware, businesses.addBusiness);
  app.post('/user', users.login);
  app.get('/getReviews',  deliveries.getReviews);
  app.get('/getDeliveries', businesses.getDeliveries);
  app.get('/getDispensaries', businesses.getDispensaries);
  app.get('/getDoctors', businesses.getDoctors);
  app.post('/user/:id', users.addUser);
  app.get('/flowers', flowers.index);
  app.use(loginAuthentication);
  app.get('/logout', businesses.logout);
  app.put('/editProduct', multipartyMiddleware, businesses.editProduct);
  app.post('/productUpload', multipartyMiddleware, businesses.addProduct);
  app.get('/showProducts/:id', businesses.show);
  app.post('/review/:id', deliveries.addReview);
};
