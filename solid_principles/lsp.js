// LSP --> Liskov Substitution Principle.
// Objects of super class should be replaceable with objects of sub class without affecting the correctness of the program.
// closely related to polymorphism. 

class Birds{
eat(){
console.log('Birds can eat')
}
fly(){
console.log('birds can fly')
}
}

class Penguine extends Birds {
eat(){
    console.log("Eats fish")
}
}

class Eagle extends Birds {
    fly() {
        console.log("Eagle can fly")
    }
}

class canBirdFly {
    isit(obj) {
        if(obj.fly){
            obj.fly();
        }
        else {
            console.log("This bird cannot fly !!!")
        }
    }
}
const eagle = new Eagle();
const penguine = new Penguine();
const fly = new canBirdFly();
fly.isit(eagle)
fly.isit(penguine)