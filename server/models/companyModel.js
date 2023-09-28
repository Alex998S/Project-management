import mongoose, { Schema, mongo } from "mongoose";

const companySchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId().toHexString(),
    name: {
        type: String,
        required: true
    },
    ticketModel:[Schema.Types.Mixed]
},{strict: false})

export default mongoose.model('companies', companySchema);