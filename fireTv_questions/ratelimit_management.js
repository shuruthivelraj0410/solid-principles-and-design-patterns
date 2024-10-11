// token bucket access

import redis from 'redis';

class Redis{ // single responsibility 
    constructor(host,port,db){
        if(!Redis.instance){        // singleton pattern 
            this.host = host;
            this.port = port;
            this.db = db;
            this.redisClient = null;
            this.connect();
        }

    }
    async create(){
        this.redisClient = redis.createClient({
            url : `redis://${this.host}:${this.port}/${this.db}`
        }); 
    }
    async connect(){
       this.create()
       await this.redisClient.connect()
       console.log("redis connected to client")
    }
    async set(cacheName,data){
        await this.redisClient.set(cacheName,data)
        console.log("data set to redis")
    }
    async get(cacheName){
        let data = await this.redisClient.get(cacheName)
        return data;
    }
}

//open and closed principle
class RateLimiter{
  setDate(){};
  apiRequest(){};
  isAllowed(){};
  notAllowed(){};
}

class TokenBucket extends RateLimiter{
    constructor(){
      super();
      this.redisObj = new Redis("localhost",6379,0) // factory pattern 
    }
    setDate(userId,pendingRequest){
        let today = new Date();
        let date = new Date()
        let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        let setData = {
            date : date,
            time: time,
            number_of_request_allowed_per_minute : pendingRequest
        }
        this.redisObj.set(userId,JSON.stringify(setData))
    }
    async apiRequest(userId){
        let data = JSON.parse(await this.redisObj.get(userId))
        let today = new Date();
        if(!data){
            this.setDate(userId,10)
            this.isAllowed();
        }
        else{
           let Previous_date = data.date;
           let hours = parseInt(data.time.split(':')[0],10);
           let minutes = parseInt(data.time.split(':')[1],10);
           let present_request = data.number_of_request_allowed_per_minute;
           if(new Date(Previous_date.split('T')[0]) < new Date(today.toString().split('T')[0])){
            this.setDate(userId,2)
            this.isAllowed()
           }
           else if(hours < today.getHours() || minutes < today.getMinutes()){
            this.setDate(userId,2)
            this.isAllowed()
           }
           else if(minutes == today.getMinutes()){
            let pending_request = present_request
            if(pending_request > 0){
                this.setDate(userId,pending_request-1);
                this.isAllowed()
            }
            else{
                this.notAllowed()
            }
           }
        }
    }
    isAllowed(){
        console.log("Welcome to our page")
    }
    notAllowed(){
        console.log("Crossed your request limit")
    }
}


const ratelimiting = new TokenBucket();
ratelimiting.apiRequest("12345")



