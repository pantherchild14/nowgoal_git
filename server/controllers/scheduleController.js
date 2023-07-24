import { DBSchedule } from "../models/scheduleModel.js";
import { DBOdds } from "../models/oddsModel.js";

const getSchedule = async(req, res) => {
    try {
        const timestamp = req.body.timestamp;
        const startDate = new Date(timestamp);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(timestamp);
        endDate.setUTCHours(23, 59, 59, 999);

        const schedules = await DBSchedule.find({
            TIME_STAMP: {
                $gte: startDate,
                $lte: endDate,
            },
        });

        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getScheduleAll = async(arSelect = []) => {
    try {
        let selectFields = arSelect.length > 0 ? arSelect.join(" ") : "";

        const schedules = await DBSchedule.find().select(selectFields).lean();

        return schedules;
    } catch (error) {
        console.error("Error retrieving schedules by time:", error);
        throw error;
    }
};

const getScheduleByTime = async(begin, end, arSelect = []) => {
    try {
        let selectFields = arSelect.length > 0 ? arSelect.join(" ") : "";

        const schedules = await DBSchedule.find({
            TIME_STAMP: {
                $gte: begin,
                $lte: end,
            },
        }).select(selectFields).lean();

        return schedules;
    } catch (error) {
        console.error("Error retrieving schedules by time:", error);
        throw error;
    }
};

const getScheduleMixOdds = async(req, res) => {
    try {
        const timestamp = req.body.timestamp;
        const startDate = new Date(timestamp);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(timestamp);
        endDate.setUTCHours(23, 59, 59, 999);

        const schedules = await DBSchedule.find({
            TIME_STAMP: {
                $gte: startDate,
                $lte: endDate,
            },
        });

        const matchIds = schedules.map((record) => record.MATCH_ID);

        const oddsRecords = await DBOdds.find({
            MATCH_ID: {
                $in: matchIds,
            },
        });

        const schedulesWithOdds = schedules.map((schedule) => {
            const odds = oddsRecords.find((oddsRecord) => oddsRecord.MATCH_ID === schedule.MATCH_ID);
            return {
                ...schedule.toObject(),
                odds: odds || null, // Nếu không tìm thấy odds, gán null
            };
        });

        res.status(200).json(schedulesWithOdds);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateSchedule = async(scheduleData) => {
    const {
        MATCH_ID,
        HOME_ID,
        AWAY_ID,
        HOME_NAME,
        AWAY_NAME,
        SCORE_HOME,
        SCORE_AWAY,
        TIME_STAMP,
        MATCH_TIME,
        LEAGUE_ID,
        LEAGUE_NAME,
        LEAGUE_SHORT_NAME,
        STATUS,
        H_T,
        F_T,
        C,
    } = scheduleData;

    const updatedSchedule = await DBSchedule.findOneAndUpdate({ MATCH_ID: MATCH_ID }, {
        MATCH_ID,
        HOME_ID,
        AWAY_ID,
        HOME_NAME,
        AWAY_NAME,
        SCORE_HOME,
        SCORE_AWAY,
        TIME_STAMP,
        MATCH_TIME,
        LEAGUE_ID,
        LEAGUE_NAME,
        LEAGUE_SHORT_NAME,
        STATUS,
        H_T,
        F_T,
        C,
    }, { upsert: true, new: true }).lean();

    return updatedSchedule;
};

const updateScheduleByTime = async(startTime, endTime, scheduleData) => {
    const {
        MATCH_ID,
        HOME_ID,
        AWAY_ID,
        HOME_NAME,
        AWAY_NAME,
        SCORE_HOME,
        SCORE_AWAY,
        TIME_STAMP,
        MATCH_TIME,
        LEAGUE_ID,
        LEAGUE_NAME,
        LEAGUE_SHORT_NAME,
        STATUS,
        H_T,
        F_T,
        C,
    } = scheduleData;

    const updatedSchedule = await DBSchedule.findOneAndUpdate({
        MATCH_ID: MATCH_ID,
        TIME_STAMP: { $gte: startTime, $lt: endTime }, // Sửa điều kiện tìm kiếm ở đây
    }, {
        MATCH_ID,
        HOME_ID,
        AWAY_ID,
        HOME_NAME,
        AWAY_NAME,
        SCORE_HOME,
        SCORE_AWAY,
        TIME_STAMP,
        MATCH_TIME,
        LEAGUE_ID,
        LEAGUE_NAME,
        LEAGUE_SHORT_NAME,
        STATUS,
        H_T,
        F_T,
        C,
    }, { upsert: true, new: true }).lean();

    return updatedSchedule;
};



export { getSchedule, getScheduleAll, getScheduleByTime, updateSchedule, updateScheduleByTime, getScheduleMixOdds };