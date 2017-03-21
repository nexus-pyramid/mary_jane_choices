"use strict";

var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    session  = require('express-session'),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    multipart   = require('connect-multiparty'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
var sessionConfig = {
     secret:'420_blazeit', // Secret name for decoding secret and such
     resave:false, // Don't resave session if no changes were made
     saveUninitialized: true, // Don't save session if there was nothing initialized
     name:'myCookie', // Sets a custom cookie name
     cookie: {
       secure: false, // This need to be true, but only on HTTPS
       httpOnly:false, // Forces cookies to only be used over http
       maxAge: 3600000
    }
}

// app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json({extended: true}));
app.use( express.static( path.join( root, 'public')));
app.use(session(sessionConfig));
app.use(multipart({
  uploadDir: './public/uploads'
}));
// app.use(multer({ dest: './public/uploads/'}));
// var storage = multer.diskStorage({ //multers disk storage settings
//         destination: function (req, file, cb) {
//             cb(null, './uploads/')
//         },
//         filename: function (req, file, cb) {
//             var datetimestamp = Date.now();
//             cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
//         }
//     });
//     var upload = multer({ //multer settings
//                     storage: storage
//                 }).single('file');
//                 app.post('/upload', function(req, res) {
//                         upload(req,res,function(err){
//                             if(err){
//                                  res.json({error_code:1,err_desc:err});
//                                  return;
//                             }
//                             console.log('made it')
//                              res.json({error_code:0,err_desc:null});
//                         });
//                     });
app.listen( 8000, function() {
  console.log( `server running on port 8000` );
});

require("./server/config/mongoose.js");

require("./server/config/routes.js")(app);
