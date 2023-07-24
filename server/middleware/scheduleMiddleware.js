import { addDays, startOfDay, addHours, startOfHour } from "date-fns";
import { getScheduleAll, getScheduleByTime } from "../controllers/scheduleController.js";
import { crawlSchedule, crawlStatusSchedule } from "../crawler/scheduleCrawl.js";

const createScheduleMiddleware = async(req, res, next) => {
    try {
        const currentDate = new Date();

        await crawlSchedule(startOfDay(currentDate));
    } catch (error) {
        console.error("Error retrieving createScheduleMiddleware: ", error);
    }
};

const updateScheduleByTimeMiddleware = async(req, res, next) => {
    try {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        crawlStatusSchedule(currentDate);

    } catch (error) {
        console.error("Error retrieving updateScheduleByTimeMiddleware: ", error);
    }
}

const getScheduleMiddleware = async(req, res, next) => {
    try {
        const schedules = await getScheduleAll(["MATCH_ID"]);
        const arrSchedule = schedules.map((schedule) => schedule.MATCH_ID);
        return arrSchedule;
    } catch (error) {
        console.error("Error retrieving getScheduleMiddleware:", error);
    }
};

const getScheduleByTimeMiddleware = async(req, res, next) => {
    try {
        // Lấy giờ hiện tại
        const currentDate = new Date();
        const next7Hours = addHours(currentDate, 7);

        const startTime = startOfHour(currentDate);
        const endTime = startOfHour(next7Hours);

        const schedules = await getScheduleByTime(startTime, endTime, ["MATCH_ID"]);
        const arrSchedule = schedules.map((schedule) => schedule.MATCH_ID);
        return arrSchedule;
    } catch (error) {
        console.error("Error retrieving getScheduleByTimeMiddleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { createScheduleMiddleware, getScheduleMiddleware, getScheduleByTimeMiddleware, updateScheduleByTimeMiddleware }