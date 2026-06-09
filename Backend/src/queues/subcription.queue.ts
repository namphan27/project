import { bullMq } from "../utils/bullmq";
export const subcriptionQueue = bullMq.createQueue("SUBCRIPTION_QUEUE");
