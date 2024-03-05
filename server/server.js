import 'dotenv/config.js'
import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

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

app.use('/users', authenticateToken, usersRouter);

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_PASS, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

app.listen(PORT, () => {
  connect()
  console.log(`Server listening on ${PORT}`);
});