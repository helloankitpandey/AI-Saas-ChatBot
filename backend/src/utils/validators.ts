// express-validator is set of the express.js middlewares that wraps the extensive collections of validators and sanitizers offerd by validator.ja

import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// got he the documentary of the express-validators sites 
// and read the The Validation Chain

// it works as middlewares for the signup



// we can creat a customized validator-function in which we will verify all of this details

// export const validate = (validations: ValidationChain[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         for (let validation of validations) {
//             const result = await validation.run(req);
//             if(!result.isEmpty()){
//                 break;
//             }
//         }
//         const errors = validationResult(req); // it will prop of the errors
//          if(errors.isEmpty()){
//             return next();
//         }
//         return res.status(422).json({ errors: errors.array() });      
//     }
// }


export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          break;
        }
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(422).json({ errors: errors.array() });
    };
  };






// for login
export const loginValidator = [
    // body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
       .trim()
       .isLength({ min: 6 })
       .withMessage("Password should contain atleast 6 charaters"),
];


// for signup
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    // body("email").trim().isEmail().withMessage("Email is required"),
    // body("password")
    //    .trim()
    //    .isLength({ min: 6 })
    //    .withMessage("Password should contain atleast 6 charaters"),
    ...loginValidator
];

// for chat completion
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];