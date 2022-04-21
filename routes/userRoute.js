var express = require('express');
var router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
var User = require("../models/userModel");
var passport = require('passport');
const bcrypt = require("bcrypt");
const { signup,login } = require("../controllers/userController");
const { signup_get, logi ,index } = require("../controllers/fatchController");
var LocalStrategy = require('passport-local').Strategy;
// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });





router.use(cookieParser('secret'));
router.use(session({
     secret : 'secret',
     maxAge : 3600000,
     resave : true,
     saveUninitialized : true,
 }));


//  var LocalStrategy = require('passport-local').Strategy;

//  passport.use(new LocalStrategy(
//     function(email, password, done) {
//       User.findOne({ email: email }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));





var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ email : 'email'}, (email, password, done) => {
    User.findOne({ email : email },(err,data) => {
        if(err) throw err;
        if(!data){
            return done(null, false);
        }

        bcrypt.compare(password, data.password, (err, match) => {
            if(err){
                return done(null, false);
            }
            if(!match){
                return done(null, false);
            }
            if(match){
                return done(null, data);
            }
        });
    });
}));



//Authentacion Strategy

// passport.use(new LocalStrategy( (email, password, done) => {
//     User.findOne({ email : email },(err,data) => {
//         if(err) throw err;
//         if(!data){
//             console.log("unknown user");
//             return done(null, false);
//         }
//         bcrypt.compare(password, data.password, (err, match) => {
//             console.log("T1");
//             if(err){
//                 console.log("T2");
//                 return done(null, false);
                
//             }
//             if(!match){
//                 console.log("T3");
//                 return done(null, false);
//             }
//             if(match){
//                 return done(null, data);
//             }
//         });
//         // if(err){
//         //             return done(null, false);
//         //         }
//         //         if(!data){
//         //             return done(null, false);
//         //         }
//         //         if(data.password !== password){
//         //             return done(null, false);
//         //         }
//         //         return done(null, data);
//     });
// }));



passport.serializeUser(function( user, done){
    done(null,  user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err,  user){
        done(err,  user);
    });
});
// passport.deserializeUser(function(id, cb){
//     users.findById(id, function(err,  users){
//         cb(err,  users);
//     });
// });








 router.use(passport.initialize());
 router.use(passport.session());


  //authentication validate
  const checkAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        res.set('Cache-Control','no-cache , private , no-store , must-revalidate , post-check=0 , precheck=0')
        return next();
    }
    else
    {
        res.redirect('/login');
    }
}

// router.get('/index', checkAuthenticated , index);

router.route("/signup").get(signup_get);
router.route("/signup").post(signup);
router.route("/login").get(logi);
router.route("/login").post(login);
// router.post('/login',(req,res,next) => {
//     passport.authenticate('local',{
//         successRedirect: '/dash',
//         failureRedirect: '/signup'
//     })(req, res, next);
// });

module.exports = router;