interface ShapeVisitor {
    visitCircle(circle: Circle): void;
    visitSquare(square: Square): void;
}

interface Shape {
    accept(visitor: ShapeVisitor): void;
}

class Circle implements Shape {
    readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }
}

class Square implements Shape {
    readonly side: number;

    constructor(side: number) {
        this.side = side;
    }

    accept(visitor: ShapeVisitor): void {
        visitor.visitSquare(this);
    }
}

class AreaVisitor implements ShapeVisitor {
    visitCircle(circle: Circle): void {
        console.log(`Koło: pole = ${(Math.PI * circle.radius ** 2).toFixed(2)}`);
    }

    visitSquare(square: Square): void {
        console.log(`Kwadrat: pole = ${square.side ** 2}`);
    }
}

class PerimeterVisitor implements ShapeVisitor {
    visitCircle(circle: Circle): void {
        console.log(`Koło: obwód = ${(2 * Math.PI * circle.radius).toFixed(2)}`);
    }

    visitSquare(square: Square): void {
        console.log(`Kwadrat: obwód = ${square.side * 4}`);
    }
}

const shapes: Shape[] = [new Circle(2), new Square(3)];

for (const shape of shapes) {
  shape.accept(new AreaVisitor());
}

for (const shape of shapes) {
  shape.accept(new PerimeterVisitor());
}