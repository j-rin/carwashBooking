const mongoose = require("mongoose");



const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI, 
            {        
              useNewUrlParser:true,
              useUnifiedTopology:true,
              //strictQuery:true,
             
             });
             console.log(`Mongodb connected :${conn.connection.host}`)
            // mongoose.set('strictQuery', false);
              
    }catch(error){
        console.log(`Error:${error.message}`);
        process.exit();

    }
};



module.exports = connectDB;