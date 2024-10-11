// Decorator pattern. 
// Adds more functionality to the object without affecting the other instances.
// use : need not to follow subclass creation for abstraction for little feature changes.


class Car{
    constructor(name,price){
        this.name = name ;
        this.price = price;
    }
}

class CarInfo{
    constructor(car){
        this.car = car;
    }
    getPriceWithGST(){
        this.car.price = this.car.price + 500;
        return this.car.price
    }
}

const car1 = new Car("kiger",3000);
const carInfo1 = new CarInfo(car1);
console.log(carInfo1.getPriceWithGST())
console.log(car1)
console.log(carInfo1)

