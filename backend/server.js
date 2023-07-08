const express = require('express');
const dotenv = require("dotenv");
var cors =require('cors')




const connectDB = require("./config/db");
const  washRoutes = require("./routes/washRoutes")
const userRoutes = require('./routes/userRoutes')


dotenv.config();
connectDB();


const app = express();


const http =require('http').createServer(app)

const io = require("socket.io")(http, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3001",
        // credentials: true,
    },
});



io.on('connection',(socket)=>{

    console.log(`A user connected with id ${socket.id}`);


    socket.on('customEvent', (data) => {
        console.log('Received custom event:', data);
        if(data.book){
            socket.broadcast.emit('responseEvent',data)
        }
    })


    socket.on('disconnect', () => {
        console.log(`A user disconnected${socket.id}`);
      });
    

})

app.use(cors())

app.use(express.json())


app.use("/api/user",userRoutes)
app.use("/api/wash",washRoutes)

const PORT = 8000



http.listen(PORT,()=>{
     console.log(`Listening on  http://localhost:${PORT}`)
})