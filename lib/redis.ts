import { kv } from '@vercel/kv';
import { createClient } from 'redis';

// In-memory fallback for development
const inMemoryStore = new Map<string, string>();

// Create a direct Redis client as fallback
let redisClient: ReturnType<typeof createClient> | null = null;

const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL || process.env.KV_URL
    });
    
    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
      redisClient = null;
    });
    
    await redisClient.connect();
  }
  
  return redisClient;
};

export const urlMap = {
  get: async (code: string) => {
    if (process.env.NODE_ENV === 'development') {
      return inMemoryStore.get(`url:${code}`);
    }
    
    try {
      // Try Vercel KV first
      try {
        return await kv.get(`url:${code}`);
      } catch (kvError) {
        console.error('Vercel KV error:', kvError);
        
        // Fall back to direct Redis client
        const client = await getRedisClient();
        return await client.get(`url:${code}`);
      }
    } catch (error) {
      console.error('Redis error:', error);
      return null;
    }
  },
  
  set: async (code: string, url: string) => {
    if (process.env.NODE_ENV === 'development') {
      inMemoryStore.set(`url:${code}`, url);
      return true;
    }
    
    try {
      // Try Vercel KV first
      try {
        await kv.set(`url:${code}`, url);
      } catch (kvError) {
        console.error('Vercel KV error:', kvError);
        
        // Fall back to direct Redis client
        const client = await getRedisClient();
        await client.set(`url:${code}`, url);
      }
      return true;
    } catch (error) {
      console.error('Redis error:', error);
      return false;
    }
  },
  
  expire: async (code: string, seconds: number) => {
    if (process.env.NODE_ENV === 'development') {
      // No expiration in development
      return true;
    }
    
    try {
      // Try Vercel KV first
      try {
        await kv.expire(`url:${code}`, seconds);
      } catch (kvError) {
        console.error('Vercel KV error:', kvError);
        
        // Fall back to direct Redis client
        const client = await getRedisClient();
        await client.expire(`url:${code}`, seconds);
      }
      return true;
    } catch (error) {
      console.error('Redis error:', error);
      return false;
    }
  }
}; 