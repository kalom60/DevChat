import { createClient } from 'redis';

// class that create redis client
class RedisClient {
  constructor() {
    this.client = createClient();
    this.connected = true;
    this.client.on('error', (error) => {
      console.log(error.message)((this.connected = false));
    });
    this.client.connect();
  }

  // check if a connection with redis is success
  isAlive() {
    return this.connected;
  }

  // takes a string key as argument and returns the Redis value stored for this key
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  // takes a string key, a value and a duration in second as arguments to store it in Redis
  async set(key, value, sec) {
    await this.client.set(key, value);
    await this.client.expire(key, sec);
  }

  // takes a string key as argument and remove the value in Redis for this key
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
