const { createClient } = require( 'redis');

class RedisManager {
    static instance;
    redisClient;

    constructor() {
        this.redisClient = createClient({
            url: process.env.REDIS_URL
        });
        this.redisClient.connect();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }

    async set(key, value) {
        await this.redisClient.set(key, JSON.stringify(value));
    }

    async get(key) {
        return JSON.parse(await this.redisClient.get(key));
    }

    async delete(key) {
        await this.redisClient.del(key);
    }

    async close() {
        await this.redisClient.quit();
    }

    async setWithTTL(key, value, ttl) {
        await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async clearAllKeys() {
        await this.redisClient.flushDb();
    }
    
}

module.exports = RedisManager;