"use strict";

var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    passport = require( 'passport'),
    localStrategy = require('passport-local').Strategy,
    session  = require('express-session'),
    bp       = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path     = require( 'path' ),
    flash    = require( 'connect-flash'),
    multipart = require('connect-multiparty'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();
var passport = require('passport');
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
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain)
// app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json({extended: true}));
app.use( express.static( path.join( root, 'public')));
// app.use(session(sessionConfig));
app.use(cookieParser());
app.use(multipart({
  uploadDir: './public/uploads'
}));
////////////////////////////////////////
// Session and passport config
///////////////////////////////////////
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var sessionConfig = {
     secret:'420_blazeit' // Secret name for decoding secret and such
    //  resave:false, // Don't resave session if no changes were made
    //  saveUninitialized: true, // Don't save session if there was nothing initialized
    //  name:'myCookie', // Sets a custom cookie name
    //  cookie: {
    //    secure: false, // This need to be true, but only on HTTPS
    //    httpOnly:false, // Forces cookies to only be used over http
    //    maxAge: 3600000
    // }
}
// require('./config/passport')(passport);

// END Session and passport config
////////////////////////////////////////



app.listen( 8000, function() {
  console.log( `server running on port 8000` );
});

require("./server/config/mongoose.js");
require("./server/config/passport.js")(passport);
require("./server/config/routes.js")(app);
