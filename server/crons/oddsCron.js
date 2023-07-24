import cron from "node-cron";
import { oddsByTimeMiddlerware, oddsMiddlerware } from "../middleware/oddsMiddleware.js";

export const oddsCron = async() => {
    cron.schedule("*/5 * * * *", async() => {
        oddsMiddlerware();
        console.log("Crawling odds 5 phút all odds cron...");
    });

    cron.schedule("*/1 * * * *", async() => {
        oddsByTimeMiddlerware();
        console.log("Crawling odds 1 phút By Time odds cron...");
    });
}