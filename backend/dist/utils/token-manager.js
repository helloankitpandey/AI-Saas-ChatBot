// create a function that will create a token from the data
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
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
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map