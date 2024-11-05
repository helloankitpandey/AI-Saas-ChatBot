// model user contains => name, email, password,and array of chats schema

import { randomUUID } from "crypto";
import { contextsKey } from "express-validator/lib/base.js";
import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(), // it will help to generate new id
    },
    role: { // there are two role for using openai platform 1.=> Aichatbor i.e Assistant & 2.=> user
        type: String,
        require: true,
    },
    content : { // it is msg
        type: String,
        require: true,
    },
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    chats: [chatSchema]
})

export default mongoose.model("User", userSchema );