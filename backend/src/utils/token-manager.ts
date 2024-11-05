// create a function that will create a token from the data

import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { log } from "console";
import { rejects } from "assert";
import { resolve } from "path";


export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};

// this will use in the Login Routes

// make a function to verify a token of the user

// export const verifyToken = async (req: Request, res: Response, next: NextFunction ) => {
//     const token = req.signedCookies[`${COOKIE_NAME}`];
//     // if we dont have token
//     if(!token || token.trim() ==="") {
//         return res.status(401).json({ message : " Token Not Received" });
//     }
    
//     // console.log(token);
//     return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
//         if (err) {
//             rejects(err.message)
//             return res.status(401).json({message: "Token Expired"})
//         } else {
//             // console.log("Token Verification Successful");
//             resolve();
//             res.locals.jwtData = success
//             return next();
            
//         }
//     })
    
// };


export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if ( !token || token.trim() === "") {
      return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise<void>((resolve, reject) => {
      return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Token Expired" });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      });
    });
  };
