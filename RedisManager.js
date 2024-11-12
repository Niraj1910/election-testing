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
            // Log the pattern being used
            console.log(`Scanning for keys with pattern: ${pattern}`);
    
            // Scan Redis for keys matching the pattern
            const scanResult = await this.redisClient.scan(cursor, {
                MATCH: pattern, // Use MATCH to filter keys by the pattern
                COUNT: 100, // Number of keys to check at a time
            });
    
            console.log('scanResult:', scanResult); // Log the scan result to inspect its structure
    
            // Check if scanResult is iterable
            if (!Array.isArray(scanResult) || scanResult.length < 2) {
                console.error('Unexpected scan result:', scanResult);
                return;
            }
    
            const [newCursor, keys] = scanResult; // Destructure the result if it is an array
    
            // If keys are found, delete them
            if (keys.length > 0) {
                console.log(`Deleting ${keys.length} keys:`, keys);
                await this.redisClient.del(keys); // Delete the keys
            }
    
            // Update cursor position for the next scan
            cursor = newCursor;
        } while (cursor !== '0'); // Continue scanning until the cursor returns to 0 (end of keys)
    }
    
    
}

module.exports = RedisManager;