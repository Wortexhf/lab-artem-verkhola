let numbers = [1, 2, 3];
let [firstNumber, secondNumber, thirdNumber] = numbers;
console.log(firstNumber, secondNumber, thirdNumber);

let fruits = ['apple', 'orange', 'banana'];
let [firstFruit, ...restFruits] = fruits;
console.log(firstFruit, restFruits);

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combinedArray = [...arr1, ...arr2];
console.log(combinedArray);
