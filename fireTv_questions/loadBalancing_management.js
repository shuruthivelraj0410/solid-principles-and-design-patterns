// Weight based load balancer 

class Server{   // singleton pattern 
    constructor(serverName,serverId,weight){ // single responsibilty principle
        this.serverName = serverName;
        this.serverId = serverId;
        this.weight = weight;
        this.requestCalls = 0;
    }
}

class Lb{
    getServer(){};
}
 
class LoadBalancer extends Lb{  // ocp 
    constructor(servers){
       super();
       this.servers = servers;
       this.totalWeight = this.getCapacity()
    }
    getCapacity(){
        let capacity = this.servers.reduce((wt,sum) => wt + sum.weight,0)
        return capacity
    }
    getServer(){
        let randomNumber = Math.random() * this.totalWeight;
        let cummulativeWeight = 0;
        for(let server of this.servers){
            cummulativeWeight = cummulativeWeight + server.weight;
            if(randomNumber <= cummulativeWeight){
                ++server.requestCalls;
                return server.serverName
            }
        }
    }
}



let server1 = new Server('s1','001',30);
let server2 = new Server('s2','002',40);
let server3 = new Server('s3','003',25);
let server4 = new Server('s4','004',90);
let servers = [server1,server2,server3,server4]
const lb = new LoadBalancer(servers)
for(let i=0;i<10001;i++){
    let server = lb.getServer()
    console.log(`${i}th request routed to ${server}`)
}
console.log("--------------->>",lb)


