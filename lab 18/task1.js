function Car(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
}

Car.prototype.displayInfo = function() {
    console.log(this.brand + ' ' + this.model + ' ' + this.year);
};

Car.prototype.drive = function() {
    console.log('рух розпочато');
};

let car1 = new Car('Toyota', 'Camry', 2020);
let car2 = new Car('BMW', 'X5', 2022);

car1.displayInfo();
car1.drive();
car2.displayInfo();
car2.drive();
