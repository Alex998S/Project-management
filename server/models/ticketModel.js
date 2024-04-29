import mongoose, { Schema, mongo } from "mongoose";

const ticketSchema = new Schema({
    workspaceID:{
        type: Schema.ObjectId,
        required: true
    },
    ticketValues: [Schema.Types.Mixed]
})

export default mongoose.model('tickets', ticketSchema);