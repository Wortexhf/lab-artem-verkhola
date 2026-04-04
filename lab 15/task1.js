let student = { name: "John", age: 20, gender: "male" };
let { name: studentName, age: studentAge, gender: studentGender } = student;
console.log(studentName, studentAge, studentGender);

let car = { engine: { cylinders: 4, horsepower: 150 } };
let { engine: { cylinders: engineCylinders, horsepower: engineHorsepower } } = car;
console.log(engineCylinders, engineHorsepower);

let book = { title: "JS Book", author: "John Doe" };
let { title: bookTitle, author: bookAuthor } = book;
console.log(bookTitle, bookAuthor);
