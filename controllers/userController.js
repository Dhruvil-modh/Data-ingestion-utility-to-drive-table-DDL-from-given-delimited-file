const mongoose = require('mongoose');
const User = require("../models/userModel");
const cookieToken = require("../utils/cookieToken")
const CustomError = require("../utils/customError");
const BigPromise = require("../middlewares/bigPromise");
const bcrypt = require("bcrypt");

exports.signup = BigPromise(async (req, res) => {

    const { phoneno, firstname, lastname, email, created_At } = req.body;

    if (!phoneno) {
        return res.status(400).send(`"phoneno" is required.`);
    }

    if (phoneno.length != 10) {
        return res.status(400).send(`Phone number must be of 10 characters long.(without country code)`);
    }

    // const userDummy = await User.findOne({ where: { phoneno: phoneno } });

    // if (userDummy !== null) {

            
    //         res.status(200).json({
    //             user_otp_updated: true,
    //             message: `Your phone no is already registered..!`
    //         });

    // }
    // else {



    var password = req.body.password;
    const user = new User({
        phoneno,
        email,
        firstname,
        lastname,
        password,
        created_At
    });

    // bcrypt.genSalt(10, (err, salt) => {
    //     if (err) throw err;
    //     bcrypt.hash(password, salt, (err, hash) => {
    //         if (err) throw err;
    //         password = hash;



    //         const user = new User({
    //           phoneno,
    //           email,
    //           firstname,
    //           lastname,
    //           password,
    //           created_At
    //         });

            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "User not added."
                });
            }

            res.status(200).json({
                user_added: true,
                message: `Your data has been stored in DB and otp has been sent to your number.`
            });


            user
                .save(user)
                .then((data) => {
                    //res.send(data)
                    console.log("register");
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message ||
                            "Some error occurred while creating a create operation",
                    });
                });
            //   }
            // req.phoneno = phoneno;
        })
    // })
  // }
// })

// exports.signup = BigPromise(async (req, res) => {
    
//   const { phoneno, countryCode, password,  email, created_At } = req.body;


//   if (phoneno.length != 10) {
//       return res.status(400).send(`Phone number must be of 10 characters long.(without country code)`);
//   }
//           const user = await User.create({
//             phoneno,
//             email: email,
//             firstname: req.body.firstname,
//             password,
//             created_At
//           });

//           if (!user) {
//               res.status(400).json({
//                   success: false,
//                   message: "User not added."
//               });
//           }

//           res.status(200).json({
//               user_added: true,
//               message: `Your data has been stored in DB and otp has been sent to your number.`
//           });
  
//   // req.phoneno = phoneno;
// })



// exports.login = BigPromise(async (req, res) => {
    
//     const email = req.body.email;

//     const user1 = await User.find({ phoneno: phoneno1 });
//     const passwordent = req.body.password;
//     const pass = user1.password;
//     console.log(pass);
//     console.log(passwordent);
//    var passcmp = bcrypt.compare(passwordent, pass);
//    if(passcmp){
//         res.render("Bcrypt is comprared");
//     }


    
//     if (otp == "4478") {
//         if (!user1) {
//             res.json({
//                 validOtp: true,
//                 userExistence: false,
//                 msg: "New User"
//             })
//         } else {
//             cookieToken(user1, res);     //set token in cookies for old user login purpose
//             res.json({
//                 validOtp: true,
//                 userExistence: true,
//                 msg: "Old user"
//             })
//         }
//     } else {
//         res.json({
//             validOtp: false,
//             msg: "Wrong otp. Please try again."
//         })
//         // return next(
//         //     new CustomError("Please enter your correct otp", 400)
//         //   );
//     }
// })



exports.login = async (req, res) => {
  
    const password = req.body.password;
    const email = req.body.email;
    console.log(`email${email}`);
    console.log(`PW entered:${password}`);
    User.find({email: email})
    .then((data) => {

          console.log("hello :"+data[0].password)
          const userpassword = data[0].password;

          var user = data[0].phoneno;
          const passwordcmp = bcrypt.compare(password, userpassword);
          console.log(passwordcmp)
          if (password === userpassword) {
            
          //  User.find({email: email}, function(err,data){
          //   if(err) throw err;
          //      res.render('dashboard',{user:data});
          //   console.log(id)
          //   })
            
            res.render('dashboard',{user:data});
           //res.send("login");
          } else {
            res.send("wrong Password");
            console.log(
              `email is in database :  .................password = ${userpassword}`
            );
            // res.send(`email is in database : ${useremail}`);
          }
        
    }) .catch((err) => {
      res.send(err);
      });

/*

          if (userpassword === password) {
            res.render("index");
          } else {
            console.log(
              `email is in database : ${useremail} .................password = ${userpassword}`
            );
            res.send(`email is in database : ${useremail}`);
          }
        }
      
  //   userpassword = useremail.password;
   // console.log(`PW :${userpassword}`);
  //  console.log(`email from :${useremail}`);
    //const passwordcmp = bcrypt.compare(password, userpassword);

   // if (passwordcmp)
  /*    if (userpassword === password) {
        res.render("index");
      } else {
        console.log(
          `email is in database : ${useremail} .................password = ${userpassword}`
        );
        res.send(`email is in database : ${useremail}`);
      }*/
};
