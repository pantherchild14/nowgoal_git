import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/post.js";
import scheduleRouter from "./routers/scheduleRouter.js";
import oddsRouter from "./routers/oddsRouter.js";
import connectDb from "./configs/mongooseDb.js";
import { scheduleCron } from "./crons/scheduleCron.js";
import { oddsCron } from "./crons/oddsCron.js";
import { getSchedule } from "./controllers/scheduleController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/posts", posts);

app.use("/schedule", scheduleRouter);

app.use("/odds", oddsRouter);
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // cron 
    scheduleCron();
    oddsCron();

}).catch((err) => {
    console.log("err", err);
});