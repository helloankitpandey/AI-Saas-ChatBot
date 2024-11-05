import { Router } from "express";
import { getAllusers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllusers);
userRoutes.post("/signup", validate(signupValidator) , userSignup);
userRoutes.post("/login", validate(loginValidator) , userLogin );
// these above two => upto here we complete the basics user signup & login request  

// routes for verify cookies token after logged in
userRoutes.get("/auth-status", verifyToken, verifyUser );

// create another routes for the logout
userRoutes.get("/logout", verifyToken, userLogout);


export default userRoutes;