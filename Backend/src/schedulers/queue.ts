import { subcriptionQueue } from "../queues/subcription.queue";

subcriptionQueue.upsertJobScheduler(
  "subcription",
  {
    pattern: "*/10 * * * * *",
  },
  {
    name: "subcription-expired",
    data: { userId: 1 },
  },
);
