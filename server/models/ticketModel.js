import mongoose, { Schema, mongo } from "mongoose";

// const ticketSchema = new mongoose.Schema({
//     // _id: new mongoose.Types.ObjectId().toHexString(),
//     type: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     createdBy: {
//         type: String,
//         required: true
//     },
//     assignedTo:{
//         userID: String,
//         timeSpent: Number
//     },
//     contributors:[
//         {
//             userID: String,
//             timeSpent: Number
//         }
//     ],
//     createdDate: String,
//     startDate: String,
//     endDate: String,
//     eta: String,
//     eta2: String,
//     comments:[
//         String
//     ],
//     customFields:[Schema.Types.Mixed]
// },{strict: false})

const ticketSchema = new Schema({ticketValues: Schema.Types.Mixed})

export default mongoose.model('tickets', ticketSchema);