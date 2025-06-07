import cron from "node-cron";
import db from "../../models/index.js";
import { cancelOldBookingsService } from "../../services/index.js";

const scheduleCrons = async () => {
    // ✅ Wait until models are ready
    await db.ready;

    cron.schedule('*/30 * * * *', async () => {
        try {
            const response = await cancelOldBookingsService();
            console.log(response);
        } catch (error) {
            console.error("Error in cron job:", error);
        }
    });
}

export { scheduleCrons };
