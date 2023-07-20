import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'

const app = express()

const PORT = 3001;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}))

// const con = await mongoose.connect('mongodb+srv://AlexGabor:<password>@firstdatabase.dzarh.mongodb.net/',{
//     useNewUrlParser: true
// })

const connect = async() =>{
    try{
        await mongoose.connect('mongodb+srv://AlexGabor:AlexGabor998@firstdatabase.dzarh.mongodb.net/ProjectManagement',{
            useNewUrlParser: true
        })
        console.log("Conected to database")
    }catch(error){
        console.log("Connection failed" + error)
    }
}

app.use(express.json());

app.listen(PORT, () => {
  connect()
  console.log(`Server listening on ${PORT}`);
});