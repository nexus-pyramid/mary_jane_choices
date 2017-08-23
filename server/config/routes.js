var path = require('path'),
    users = require('../controllers/users.js'),
    admin = require('../controllers/admins.js')
    deliveries = require('../controllers/deliveries.js'),
    dispensaries = require('../controllers/dispensaries.js'),
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
  app.post('/apply', businesses.apply);
  app.get('/getlogged', businesses.getLogged);
  app.post('/register', deliveries.create);
  // app.post('/flower', deliveries.addFlower);
  app.post('/delivery/:id', deliveries.addDelivery);
  app.post('/addLocation', businesses.addLocation);
  // app.post('/visit/:id', deliveries.show);
  app.get('/show/:id', businesses.show);
  app.get('/brand/:id', businesses.showBrand);
  app.post('/feature', businesses.featureBuss);
  app.post('/admin', admin.login);
  app.get('/alldocs', businesses.getDocs);
  app.get('/getUnverified', businesses.getUnverified);
  app.get('/everything', businesses.getAll);
  // app.get('/sendCoords', businesses.sendCoords)
  app.post('/addBusiness', multipartyMiddleware, businesses.addBusiness);
  app.post('/addShop', businesses.addShop);
  app.post('/user', users.login);
  app.get('/getAll', businesses.getAll);
  app.get('/getReviews',  deliveries.getReviews);
  app.post('/getfeatured', businesses.getfeatured);
  app.post('/getUnFeatured', businesses.getUnFeatured);
  app.get('/unfeatured', businesses.unfeatured);
  app.get('/getDels', businesses.getDels);
  app.post('/deliveryCards', businesses.deliveryCards);
  app.post('/dispensaryCards', businesses.dispensaryCards);
  app.post('/createBrand', businesses.addBrand);
  app.post('/featBrands', businesses.featBrands);
  app.get('/getBrands', businesses.getBrands);
  // app.get('/getDives', businesses.getDeliveries);
  app.get('/getBusinesses', businesses.getBusinesses);
  app.post('/getDeliveries', businesses.getDeliveries);
  app.get('/getDisp', businesses.getDisp);
  app.post('/getDispensaries', businesses.getDispensaries);
  app.post('/getDoctors', businesses.getDoctors);
  app.post('/validate', businesses.validate);
  app.post('/user/:id', users.addUser);
  app.get('/showBusinessProducts/:id', businesses.showProducts);
  app.get('/showProducts/:id', businesses.show);
  // app.get('/products/:id', businesses.showShop);
  app.post('/delete/:id', businesses.delete);
  app.post('/:id/deleteBrand', businesses.deleteBrand);
  app.post('/deleteBusiness/:id', businesses.deleteBusiness);
  app.post('/editBusiness', businesses.edit);
  app.post('/password', businesses.updatePass);
  app.post('/loggedVisit', businesses.visitShop);
  // app.use(loginAuthentication);
  app.get('/logout', businesses.logout);
  app.post('/editProduct', multipartyMiddleware, businesses.editProduct);
  app.post('/brandproductUpload', businesses.addbrandProduct)
  app.post('/productUpload', multipartyMiddleware, businesses.addProduct);
  app.post('/review/:id', businesses.addReview);
};
