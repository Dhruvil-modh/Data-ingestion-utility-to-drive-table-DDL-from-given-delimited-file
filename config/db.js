// const { Sequelize } = require('sequelize');

// const db = new Sequelize('Model_BodhLabs', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     operatorsAliases: 0
// });

// module.exports = db;



const mongoose = require('mongoose');

const db = async () => {
    try{
       
        // //For connect to Atlas
        // const mongoString = "mongodb+srv://dhruvmodi1975:Dhruvil@dragonfly.w6y6h.mongodb.net/TodoTest?retryWrites=true&w=majority"
        // const con = await mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true } )


        // For connect to local Mongo Compass
        // mongodb connection string
        const con = await mongoose.connect("mongodb://localhost:27017/ddl" , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = db;



