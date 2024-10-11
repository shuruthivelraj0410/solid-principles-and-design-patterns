// Factory patterns 
// Allows to create objects without referencing which class has created it.
// use : simplify object creation.
// by abstracting the object creation this patterns improves code readablity and reuseablity.
//  when ever you do asynchronous call you have to use this patterns like reading files or making api calls.

let count = 0;
class factory{
    constructor(name,model){
        this.id = ++count;
        this.name = name;
        this.model = model;
        this.year = 2018;
    }
}

class Cars{
    getCarInfo(name,model){
        return new factory(name,model)
    }
}

const car = new Cars();
console.log(car.getCarInfo("kiger","RXT"))