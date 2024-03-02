import 'dotenv/config.js'
import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'

const databaseURL = process.env.DATABASE

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
        await mongoose.connect(databaseURL,{
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
import usersRouter from './routes/usersRoute.js'

app.use('/tickets', ticketRouter)

app.use('/', companyRouter)

app.use('/users', usersRouter);

app.listen(PORT, () => {
  connect()
  console.log(`Server listening on ${PORT}`);
});