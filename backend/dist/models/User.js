// model user contains => name, email, password,and array of chats schema
import { randomUUID } from "crypto";
import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(), // it will help to generate new id
    },
    role: {
        type: String,
        require: true,
    },
    content: {
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
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map