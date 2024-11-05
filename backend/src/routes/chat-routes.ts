import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";


// chat routes is the protected API and only the authenticated and authorized user can acces that
const chatRoutes = Router();

// there will be new routes for the chats
chatRoutes.post(
    "/new", 
    validate(chatCompletionValidator),
    verifyToken, 
    generateChatCompletion
); // after chat/new we can verify the user uisng the verifytoken
// and then we can define controller function from which we can generate chat completion for user


// to get all chats 
chatRoutes.get(
    "/all-chats",
    verifyToken, 
    sendChatsToUser
); 

// delete all chats of the user
chatRoutes.delete(
    "/delete",
    verifyToken, 
    deleteChats
); 



export default chatRoutes; 