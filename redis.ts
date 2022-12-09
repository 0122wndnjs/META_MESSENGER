// import { Redis } from "ioredis";
const Redis = require("ioredis")

let redis = new Redis(process.env.REDIS_URL!);

export default redis;
