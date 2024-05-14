import mongoose, { Schema, mongo } from "mongoose";

const invitesSchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId().toHexString(),
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    workspace:{
        type: Schema.ObjectId,
        required: true
    },
    departaments:[],
    userLevel:{
        type: String,
        required: true
    }
},{strict: false})

export default mongoose.model('invites', invitesSchema);