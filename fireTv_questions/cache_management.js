import redis from 'redis';
class Redis {
    constructor(host, port, db) {
        if (!Redis.instance) {  // singleton pattern
            this.host = host;
            this.port = port;
            this.db = db;
        }
    }
    create() {
        let redisClient = redis.createClient({
            url: `redis://${this.host}:${this.port}/${this.db}`
        })
        return redisClient
    }
}

class Cache {
    constructor() {
        this.redis = new Redis("localhost", 6379, 0) // facade pattern 
        this.redisClient = this.redis.create();
        this.connect();
    }
    async connect() {
        try {
            await this.redisClient.connect()
            console.log("Connected redis client")
        } catch (e) {
            console.log(e)
        }
    }
    async get(cacheName) {
        try {
            let data = await this.redisClient.get(cacheName)
            console.log("data : --------> ", data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
    async set(cacheName, data) {
        try {
            let dataa = await this.redisClient.set(cacheName, data)
            console.log("cache set : ", dataa)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}


class Db{
    constructor(){
        this.media = {
            shuruthi: "abcd",
            pooja:"bcde"
        }
    }
    getData(name){
        console.log("&&&&&&&&&&&&",name)
        let data = this.media && this.media[name] ? this.media[name] : null
        console.log('****************',data)
        return data
    }
}
class FindData {
    constructor(cacheName,cacheObj,DbObj) {
        this.cacheName = cacheName;
        this.cache = cacheObj;
        this.Db = DbObj;
    }
    async check() {
       if(await this.cache.get(this.cacheName)){
        let a = await this.cache.get(this.cacheName)
        console.log("----------------->a : ",a)
        return a
       }
       let data = await this.Db.getData(this.cacheName)
       if(data){
        await this.cache.set(this.cacheName,data)
       }
       return data
    }
}

// decorator pattern
const cache = new Cache();
const db = new Db();
const find_data = new FindData("pooja",cache,db); // when two objects are sent parallely with comparision some functionality is added to one object without disturbing its instances. 

(async()=>{
    console.log(await find_data.check())
})()


