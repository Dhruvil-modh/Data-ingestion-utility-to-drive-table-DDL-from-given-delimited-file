const BigPromise = require("../middlewares/bigPromise");
const cloudinary = require('cloudinary').v2;



exports.addBlog = BigPromise(async (req, res) => {

    const { blog_title, blog_content } = req.body;
    let result;

    if (!req.files) {
        return res.status(400).send(`"blog_cover_photo" is required.`);
    }

    if (!blog_title) {
        return res.status(400).send(`"blog_title" is required.`);
    }

    if (!blog_content) {
        return res.status(400).send(`"blog_content" is required.`);
    }

    let file = req.files.blog_cover_photo;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    uploadPath = __dirname + '/tmpo/' + file.name;

    result = await file.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });



    // let file = req.files.blog_cover_photo;
    // result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder: "blogs",
    //     width: 150,
    //     crop: "scale"
    // });

    const blog = await Blog.create({
        blog_title: "hrl",
        blog_content: blog_content,
        blog_cover_photo: uploadPath
    });


    if (!blog) {
        res.status(400).json({
            blogAdded: false,
            message: "Blog not added."
        });
    }

    res.status(200).json({
        blogAdded: true,
        message: `Blog added successfully.`,
        blog
    });

})

