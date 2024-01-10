import mongoose, { Schema, mongo } from "mongoose";

const ticketSchema = new Schema({ticketValues: Schema.Types.Mixed})

export default mongoose.model('tickets', ticketSchema);