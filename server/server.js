import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

const PORT = 3001;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
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
app.use(bodyParser.json());

import ticketRouter from './routes/ticketsRoute.js'
import companyRouter from './routes/companyRoute.js'

app.use('/', ticketRouter)

app.use('/', companyRouter)


app.listen(PORT, () => {
  connect()
  console.log(`Server listening on ${PORT}`);
});