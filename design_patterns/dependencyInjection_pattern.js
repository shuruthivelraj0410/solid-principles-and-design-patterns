// Dependency injection pattern 
// Inject some external objects (Dependecies) to some class to use this
// use : code readability and reuse ability

class Notify{
    constructor(redis,db,logger){
        this.redis = redis;
        this.db = db;
        this.logger = logger;
    }
    setMethoddata(data){
        if(this.redis.getdata(data)){
            return this.redis.getdata(data)
        }
        let dataa = this.db.findall({
            where : {userid:"123"}
        })
        this.redis.setdata("abcd",dataa);
        this.logger.info("data set into redis")
    }
}



const redis = new Redis();
const db = new db();
const logger = new logger();

const notify = new Notify(redis,db,logger);
notify.setMethod(data)


