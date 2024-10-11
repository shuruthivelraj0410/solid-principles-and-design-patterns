class A {
    constructor(side) {
        this.side = side
    }
    multiply() {
        return this.side * this.side;
    }
}

class B extends A {
    constructor(a) {
        super(5)
        this.a = a
    }
    display() {
        console.log("-------------->", super.multiply())
    }
}
const obj = new B(4);
obj.display()
console.log(obj)
const a_obj = new A(23);
console.log(a_obj)
console.log(a_obj.multiply())

// solid princples 
// refer : https://codewithpawan.medium.com/understanding-solid-principles-in-javascript-and-node-js-9abb09760049

// design patterns 
// refer : https://medium.com/@techsuneel99/design-patterns-in-node-js-31211904903e