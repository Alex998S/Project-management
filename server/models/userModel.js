import mongoose, { Schema, mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId().toHexString(),
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    workSpaces:[{
        name:{
            type: String,
            required: true
        },
        userLevel:{
            type: String,
            required: true
        },
        departaments:[
        {
            departamentName:{
                type: String
            }
        }]
    }]
},{strict: false})

export default mongoose.model('users', userSchema);