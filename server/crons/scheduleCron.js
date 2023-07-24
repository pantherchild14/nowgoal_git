import cron from "node-cron";
import { createScheduleMiddleware } from "../middleware/scheduleMiddleware.js";

export const scheduleCron = async() => {
    // cron.schedule("0 */24 * * *", async() => {
    //     createScheduleMiddleware();
    //     console.log("Crawling schedule sau 24 tiếng...");
    // });

    cron.schedule("*/1 * * * *", async() => {
        createScheduleMiddleware();
        console.log("Crawling schedule sau 24 tiếng...");
    });
}