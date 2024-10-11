// singleton pattern 
// Allows only one instance of object to be created and make it access globally.
// use : It helps not to waste resource utilization 
// perfect resource management ex : pool connections of db

class Db{
    constructor(){
        if(!Db.instance){
            Db.instance = this
        }
        return Db.instance
    }
}

const db1 = new Db();
const db2 = new Db();

console.log(db1 == db2)