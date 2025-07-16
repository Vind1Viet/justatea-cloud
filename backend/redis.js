// redis.js
require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
  url: `rediss://${process.env.REDIS_URL}`,
});

let isConnected = false;

async function connectRedis() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
    console.log('✅ Redis connected');
  }
}

module.exports = { redisClient, connectRedis };
