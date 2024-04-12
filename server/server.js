import 'dotenv/config.js'
import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

const databaseURL = process.env.DATABASE

const app = express()

const PORT = 3001;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


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
app.use(cookieParser())

import ticketRouter from './routes/ticketsRoute.js'
import workspaceRouter from './routes/workspaceRoute.js'
import usersRouter from './routes/usersRoute.js'

app.use('/tickets', ticketRouter)

app.use('/', workspaceRouter)

app.use('/users', usersRouter);

function generateAccessToken(email) {
    return jwt.sign({email}, process.env.TOKEN_PASS, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {

    const token = req.header('Authorization');
    if (token == null || token == undefined) {
        return res.status(401).json({ error: 'Access denied' })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_PASS);
        //req.body.email = decoded.body.email;
        res.status(200)
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
  }

app.listen(PORT, () => {
  connect()
  console.log(`Server listening on ${PORT}`);
});

export {generateAccessToken, authenticateToken}