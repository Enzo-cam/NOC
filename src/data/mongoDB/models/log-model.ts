import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: [LogSeverityLevel.low, LogSeverityLevel.medium, LogSeverityLevel.high],
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export const LogModel = mongoose.model('Log', logSchema);