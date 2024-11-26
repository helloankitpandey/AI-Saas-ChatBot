import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// for cookieparser 
app.use(cookieParser(process.env.COOKIE_SECRET));
//middleare for cors error
app.use(cors({ origin: "*", credentials: true }));
// middlewares
app.use(express.json());
// remove it in production
app.use(morgan("dev"));
// creat first middlewares
app.use("/api/v1", appRouter);
app.get("/", (req, res) => {
    return res.send("Hello from Backend");
});
export default app;
//# sourceMappingURL=app.js.map