import mongoose, { Schema, mongo } from "mongoose";

const workspaceSchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId().toHexString(),
    name: {
        type: String,
        required: true
    },
    _id: {
        type: Schema.ObjectId,
        required: true
    },
    ticketModel:[Schema.Types.Mixed],
    ticketStateColumns:[Schema.Types.Mixed]
},{strict: false, _id: false})

export default mongoose.model('workspaces', workspaceSchema);