// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
// import { log } from "console";


// // export const generateChatCompletion = async (

// //     req: Request,
// //     res: Response,
// //     next: NextFunction
// // ) => {
// //     // first we want to configure openAI -->> for that we r using openAI API 
// //     // then mkdir config/open-config.ts

// //     // then we need msg from the user and then add validation
// //     const { message } = req.body;

 
// //     try {
// //         // then verify the user
// //     const user = await User.findById(res.locals.jwtData.id)
// //     if(!user) {
// //         return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
// //     }
// //     // 1.then grab chats of user 
// //     const chats  = user.chats.map(({ role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
// //     // store chat in chats static array for memory purpose
// //     chats.push({ content: message, role: "user" });
// //     // now store chats in main user object
// //     user.chats.push({ content: message, role: "user" }); 


// //     // 2.then all chats with new one to openAI API
// //     const config = configureOpenAI();
// //     const openai = new OpenAIApi(config); // now we would be grabing openAI complete API with that


// //     // 3.then get latest response
// //     const chatResponse = await openai.createChatCompletion({
// //         model : "gpt-3.5-turbo", // edit it in future
// //         messages: chats,
// //     });
// //     user.chats.push(chatResponse.data.choices[0].message);
// //     await user.save();
// //     return res.status(200).json({ chats: user.chats });

// //     } 
// //     catch (error) {
// //         console.log(error);
// //         return res.status(500).json({ message: "Something went wrong" });
// //     }
// // };

// // Now backend Apllication for the chag-completion is completed 
// // then going to frontend for dasigning ui for this 
// // after building with frontend then test this api directly to frontend


// export const generateChatCompletion = async (
//     req: Request,  
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { message } = req.body;
//     try {
//       const user = await User.findById(res.locals.jwtData.id);
//       if (!user)
//         return res
//           .status(401)
//           .json({ message: "User not registered OR Token malfunctioned" });
//       // grab chats of user
//       const chats = user.chats.map(({ role, content }) => ({
//         role,
//         content,
//       })) as ChatCompletionRequestMessage[];
//       chats.push({ content: message, role: "user" });
//       user.chats.push({ content: message, role: "user" });
  
//       // send all chats with new one to openAI API
//       const config = configureOpenAI();
//       const openai = new OpenAIApi(config);
//       // get latest response
//       const chatResponse = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: chats,
//       });
//       user.chats.push(chatResponse.data.choices[0].message);
//       await user.save();
//       return res.status(200).json({ chats: user.chats });
      
      
//     } catch (error) {
//       console.log(error);
//       // console.log("satyam");

//       return res.status(500).json({ message: "Something went wrong" });
//     }
//   }; 


import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
// import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import { log } from "console";

// export const generateChatCompletion = async (

//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     // first we want to configure openAI -->> for that we r using openAI API
//     // then mkdir config/open-config.ts

//     // then we need msg from the user and then add validation
//     const { message } = req.body;

//     try {
//         // then verify the user
//     const user = await User.findById(res.locals.jwtData.id)
//     if(!user) {
//         return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
//     }
//     // 1.then grab chats of user
//     const chats  = user.chats.map(({ role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
//     // store chat in chats static array for memory purpose
//     chats.push({ content: message, role: "user" });
//     // now store chats in main user object
//     user.chats.push({ content: message, role: "user" });

//     // 2.then all chats with new one to openAI API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config); // now we would be grabing openAI complete API with that

//     // 3.then get latest response
//     const chatResponse = await openai.createChatCompletion({
//         model : "gpt-3.5-turbo", // edit it in future
//         messages: chats,
//     });
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });

//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Something went wrong" });
//     }
// };

// Now backend Apllication for the chag-completion is completed
// then going to frontend for dasigning ui for this
// after building with frontend then test this api directly to frontend

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API

    const openai = configureOpenAI(); 

    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("Error Message: " + error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
  // user token check
  try {
      
      // for finding the user
      const user = await User.findById(res.locals.jwtData.id);
      if(!user) {
          return res.status(401).send("User not registered OR Token Malfunction");
      }

      if(user._id.toString() !== res.locals.jwtData.id) {
          return res.status(401).send("Permission didn't match");
      }


      return res.status(200).json({
          message: "OK",
          chats: user.chats
      });
  } catch (error) {
      console.log(error);
      return res.status(200).json({
          message: "ERROR",
          cause: error.message
      });
  } 
}

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
  // user token check
  try {
      
      // for finding the user
      const user = await User.findById(res.locals.jwtData.id);
      if(!user) {
          return res.status(401).send("User not registered OR Token Malfunction");
      }

      if(user._id.toString() !== res.locals.jwtData.id) {
          return res.status(401).send("Permission didn't match");
      }
      // @ts-ignore
      user.chats = [];
      await user.save();

      return res.status(200).json({
          message: "OK"
      });
  } catch (error) {
      console.log(error);
      return res.status(200).json({
          message: "ERROR",
          cause: error.message
      });
  } 
}