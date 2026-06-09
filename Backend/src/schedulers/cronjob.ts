import cron from "node-cron";

cron.schedule("*/10 * * * * *", () => {
    // goi ham can xu li
  console.log(`cronjob running: ${Date.now()}`);
});
