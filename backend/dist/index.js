// // console.log(
// //   "This is a starter kit for this amazing project. With 💓 By Indian Coders@ankitpandey"
// // );
// import express  from "express";
// const app = express();
// // 4-types of basic-request
// // GET - 
// // PUT - send some data direclty from the frontend , it used to modify something into our backend
// // POST - mainly post is used to send some data along with request
// // DELETE - 
// // it is used to define middleware
// app.use(express.json());
// // it will pass all incoming data to the json
// // then u can log that req
// // app.delete("/hello", (req, res, next) => {
// //   console.log(req.body.name);
// //   return res.send("hello Ankitpandeyji")
// // } )
// // what if there are millions of user in the databse and u want ot access only one user's record
// // then How can you do that 
// // so there are two option,
// // first -> u can send some data and inside data u can send id of the user and then u can fetch the user directly from the database
// // then u can send the response 
// // second -> instead of send id in the data, u can send id in the URL using params.id and i.e =>> Dynamic route
// // so inside url u can  send the id 
// app.delete("/user/:id", (req, res, next) => {
//   console.log(req.params.id);
//   return res.send("hello Ankitpandeyji")
// } )
// app.listen(5000, () => console.log("Server Open"));
// import express from "express";
// import { config } from "dotenv";
// config();
// const app = express();
// // middlewares
// app.use(express.json());
// connections and listeners
// app.listen(5000, () => console.log("Server Open"));
// create some folder directory
// 1. models => for all the models  inside this application
// 2. routes => for all the routes  of this application
// 3. controllers => these are the function which are handler functions 
//     and controller functions => would control all of the incoming api request 
// 4. utlis => these are the utlis function
// 5. config => which is used for the configurtion inside this course
// index.ts start from here above this is only basics things
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// connections and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("Server Open and connected To Database"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map