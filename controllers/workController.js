const Blog = require("../models/userModel");
const BigPromise = require("../middlewares/bigPromise");
const User = require("../models/userModel");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const { spawnSync } = require("child_process");
const delay = require("delay"); 
const spawn = require('child_process').spawn;


exports.addTask = BigPromise(async (req, res) => {

    const { database_name, Table_name, database_username, database_pw, Host, phoneno } = req.body;
    let result;

    if (!req.files) {
        return res.status(400).send(`File is required.`);
    }

    if (!database_name) {
        return res.status(400).send(`"database_name" is required.`);
    }

    if (!Table_name) {
        return res.status(400).send(`"Table_name" is required.`);
    }

    let file = req.files.blog_cover_photo;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    uploadPath =  './uploads/'+Date.now()+"_"+phoneno+file.name;

    result = await file.mv(uploadPath, function(err) {
        // if (err)
        //   return res.status(500).send(err);
         
        console.log('File uploaded!');
        
      });
      console.log("hiiii000000")
      // async function fun1(){
        
      //   const process = await spawn('python',['./ddl_final.py', uploadPath , Table_name , Host, database_username,database_pw, database_name ]);
      //   process.stdout.on('data', data => {
      //     const query1 = data.toString();
      //     //console.log(data.toString());
      //     return query1;
      //   });
      //   return query1;
      // }
      var que = "";
      var dpath = './tmps/'+Table_name+".txt" ;
      const process = spawn('python',['./ddl_ultimate.py', uploadPath , Table_name , Host, database_username,database_pw, database_name ]);
        process.stdout.on('data', data => {
          que = data.toString();
          console.log(data.toString())
         res.render('queryop',{que:que,dpath:dpath});
        });



delay(3000)
    // let file = req.files.blog_cover_photo;
    // result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder: "blogs",
    //     width: 150,
    //     crop: "scale"
    // });

    // const blog = await Blog.create({
    //     blog_title: blog_title,
    //     blog_content: blog_content,
    //     blog_cover_photo: uploadPath
    // });
//var a = fun1();
console.log(phoneno)
     User.findOneAndUpdate({ phoneno: phoneno },
        {
          $push: {
            Task: {
                    database_name : database_name,
                    database_username : database_username,
                    database_pw : database_pw, 
                    Host : Host,
                    Table_name : Table_name,
                    File_name : file.name,
                    query : que,
                    File_location : uploadPath
    
                },
            },
          }
      )
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({
              message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
        } else {
         // res.send(data);
         // res.redirect("index");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information"});
        console.log(err);
      });



  // const blog = await User.findOne({Where : { phoneno: phoneno }},
  //   {
  //     $push: {
  //       Task: {
  //               database_name : database_name,
  //               database_username : database_username,
  //               database_pw : database_pw, 
  //               Host : Host,
  //               Table_name : Table_name,
  //               File_name : file.name,
  //               File_location : uploadPath

  //           },
  //       },
  //     }
  // )

  //   if (!blog) {
  //       res.status(400).json({
  //           blogAdded: false,
  //           message: "Blog not added."
  //       });
  //   }

  //   res.status(200).json({
  //       blogAdded: true,
  //       message: `Blog added successfully.`,
  //       blog
  //   });



// performing operations using python script
  //   const process = spawn('python',['./ddl_final.py', uploadPath , Table_name , Host, database_username,database_pw, database_name ]);
  // //   res.send("hello");
  // //  console.log(spawn);
  // //  console.log(process.stdout.on('data'));
  //   process.stdout.on('data', data => {
  //     console.log(data.toString());
  //   });

})










exports.doTask = BigPromise(async (req, res) => {

  // const process = spawn('python',['./hello.py','Dhruvil']);
  console.log("hiiiiii.............");
//   const process = spawn('python',['./ddl_final.py','./hello.csv','pytraining','pytraining']);
//   //res.send("hello");
//  // console.log(spawn);
//  //console.log(process.stdout.on('data'));
//   process.stdout.on('data', data => {
//     res.send(data.toString());
//   });

})
