// Single Responsibility principle 
// Each class should hold only one responsibility
// Dont use extend key word here instead try to send objects in params 
import redis from "redis"
class Redis{
    constructor(){
      this.host = "127.0.0.1";
      this.port = 6379 ;
      this.db = 0
    }
}

class createClientRedis{
    createRedisClient(credentials){
      const redisClient = redis.createClient({
        url : `redis://${credentials.host}:${credentials.port}/${credentials.db}`
      })
      return redisClient;
    }
}
class save{
    async saveToRedis(client){
        try{
        await client.connect();
        console.log("redis client connected to redis")
        await client.set('usercred','shuruthi')
        console.log("saved")
        }catch(e){
            console.log(e)
        }
    }
}

const redis_credentials = new Redis();
const create_client_redis = new createClientRedis();
const redisConnection = create_client_redis.createRedisClient(redis_credentials)
const save_to_redis = new save();
save_to_redis.saveToRedis(redisConnection)

