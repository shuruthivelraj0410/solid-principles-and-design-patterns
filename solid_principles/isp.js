//ISP --> Interface Seggregation Principle.
// The class shouldnot be forced to implement interface unless it is been used. 
// interface concept.
// Larger Interface should be broken into smaller separate inferfaces to avoid calling unwanted methods by classes.


class A { // interface1
    a(){}
}

class B{ // interface2
    b(){}
}

class AA extends A{
    a(){
        console.log("Calling From AA")
    }
}

class BB extends B{
    b(){
        console.log("Calling from BB")
    }
}

const a = new AA();
a.a()
const b = new BB();
b.b();
