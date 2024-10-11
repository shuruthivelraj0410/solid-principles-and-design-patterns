// – Design a LRU cache having methods 
// – get(K Key)
// – put(K key, V Value)
// – remove(K Key)
// They wanted a Library such as Redis which takes generic input.(Using generics)

class Cache{  
    get(key){};
    put(key,value){};
    remove(key){};
}

class System extends Cache{  // ocp and single responsibility principle
    constructor(){ 
        super();
        this.saveCache = {};
    }
    get(key){
      if(this.saveCache[key]){
        return JSON.parse(this.saveCache[key])
      }
      return {};
    }
    put(key,value){
        if(key&&value){
        this.saveCache[key] = JSON.stringify(value)
        console.log("Saved to cache successfully.")
        }else{
            console.log("Invalid values in arguments.")
        }
    }
    remove(key){
     if(this.saveCache[key]){
        delete this.saveCache[key]
        console.log("Deleted successfully.")
     }
     else{
        console.log("key not available.")
     }
    }
    setCacheWithExpiry(key,value,expiry = 0){
        if(key&&value){
            this.saveCache[key] = JSON.stringify(value)
            console.log("Saved to cache successfully.")
            setTimeout(()=>{
                delete this.saveCache[key]
                console.log("Deleted successfully after expiry.")
            },expiry)
            }else{
                console.log("Invalid values in arguments.")
            }
    }
}

let cache = new System();
cache.put('sh',{a:1,b:2})
cache.put('sh',{a:4,b:5})
cache.put('ds','es')
cache.remove('sh')
console.log("-------------------->>",cache.get('ds'))
cache.setCacheWithExpiry('qwsdrf','werdfghnm',1000)
console.log(cache)