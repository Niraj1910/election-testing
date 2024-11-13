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

    async deleteKeysByPattern(pattern) {
        let cursor = '0'; // Initial cursor position for SCAN
        do {
            // Log pattern to confirm it's being used correctly
            console.log(`Scanning for keys with pattern: ${pattern}`);
    
            // Scan Redis for keys matching the pattern
            const scanResult = await this.redisClient.scan(cursor, {
                MATCH: pattern,
                COUNT: 100,
            });
    
            // Check the structure of scanResult
            if (!Array.isArray(scanResult) || scanResult.length < 2) {
                console.error('Unexpected scan result format:', scanResult);
                return;
            }
    
            const [newCursor, keys] = scanResult; // Destructure cursor and keys
            
            // Ensure keys is an array
            if (Array.isArray(keys) && keys.length > 0) {
                console.log(`Deleting ${keys.length} keys:`, keys);
                await this.redisClient.del(...keys); // Spread keys for deletion
            }
    
            // Update cursor position for the next scan
            cursor = newCursor;
        } while (cursor !== '0'); // Continue until the cursor returns to 0
    }
    
}

module.exports = RedisManager;