//Open and Close principle 
// Classes functions and modules should be Open for extension and closed for modification 
// modification includes not to add anything inside it in future
// Supporting abstraction and interface - Object oriented principle in javascript 
// should have empty methods in a super class which should always be open for extension. --> Abstraction.

class Shape{
    area(){};
    perimeter(){};
}

class Square extends Shape{
    constructor(side){
        super();
        this.side = side;
    }
    area(){
        return this.side*this.side
    }
    perimeter(){
        return 4*this.side
    }
}

class Circle extends Shape{
    constructor(radius){
        super();
        this.radius = radius;
    }
    area(){
        return Math.PI*(this.radius^2)
    }
}
const square = new Square(2);
console.log(square.area(),square.perimeter())
const circle = new Circle(5);
console.log(circle.area())