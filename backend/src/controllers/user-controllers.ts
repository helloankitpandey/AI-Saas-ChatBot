// it handle the incoming request for the user

import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
// for encrypting the password we have becrypt & use this package
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllusers = async (req: Request, res: Response, next: NextFunction) => {
    // get all users from database
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "OK",
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    } 
}


// for signing up for the  users
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    // user signup
    try {
        const { name, email, password } = req.body;

        // check email is exist already or not
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already registered")

        // for pass to be hassed
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword }); // for encrypting the password we have becrypt
        await user.save();

        // create token and store cookies

        // suppose user signup again 

        // then first we want to remove the previous cookies of the user 
        // then set the current cookies
        // res.clearCookie("auth_token")
        // but we should store this name in other files

        // res.clearCookie(COOKIE_NAME, {
        //     path: "/", 
        //     // domain: "localhost",
        //     httpOnly: true,
        //     // signed: true, 
        // })




        // when password and email is correct 
        // then create a token for user-authentication
        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
    

        res.cookie(COOKIE_NAME, token, { 
            // path: "/", 
            // domain: "localhost", 
            // expires,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            // signed: true, 
        });



        return res.status(201).json({
            token: token,
            message: "OK",
            name: user.name, 
            email: user.email
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    } 
}

// so before coming to the user-signup function , so we could add another middleware inside the user-routes -  inside the request ,
// so before directly jumping into the user signup request , we should have the validation check of the data
// so for that we will using MIDDLEWARES to do that 
// Middleware => it acts as bridge b/w request and response , to modify request and to modify response into them
 


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    // user login
    try {
        const {  email, password } = req.body;
        
        // for checking the eamil = i.e exist or not  
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).send("User not registered");
        }

        // for checking tha password
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        // create token and store cookies
        
        // suppose user log again 
        // then first we want to remove the previous cookies of the user 
        // then set the current cookies
        // res.clearCookie("auth_token")
        // but we should store this name in other files

        // res.clearCookie(COOKIE_NAME, {
        //     path: "/", 
        //     domain: "localhost",
        //     httpOnly: true,
        //     signed: true, 
        // })




        // when password and email is correct 
        // then create a token for user-authentication
        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, { 
            // path: "/", 
            // domain: "localhost", 
            // expires,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            // signed: true, 
        });

        // after that we send cookies from backend to frontend by the help of cookie-parser
        // thius will do in app.ts file
        // app.use(cookieParser())

        // if all things are good then 
        return res.status(200).json({
            token: token,
            message: "OK",
            name: user.name, 
            email: user.email
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    } 
}

// these above two => upto here we complete the basics user signup & login request  


// Now Authentication 
// it is step in which the user needs to verify their identity.
// the user will be provided a Token after Auth Process.


// Then Authorization
// After the user authentication , he is provided a token.
// Now to access a resourcces, the user needs to show a token 
// that was sent during authentication.
// This ensures that the user is entitled to a resources.

// this is done by JWT =>JSON WEB TOKEN

// token are send to the user with the help of HTTP Only Cookies




// upto here backend is complete for the login and siginup and get all user details and some other
// time => 1:57:20
// then move to the frontend part
 


// Another function for verification
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
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
            name: user.name, 
            email: user.email
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    } 
}



export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
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


        res.clearCookie(COOKIE_NAME, { 
            // path: "/", 
            // domain: "localhost", 
            // expires,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            // signed: true, 
        });

 
        return res.status(200).json({
            message: "OK",
            name: user.name, 
            email: user.email
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    } 
}



