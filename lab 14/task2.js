let arr = [2, 3, 4, 5];
let product1 = 1;

for (let i = 0; i < arr.length; i++) {
    product1 *= arr[i];
}
console.log(product1);

let product2 = 1;
let i = 0;

while (i < arr.length) {
    product2 *= arr[i];
    i++;
}
console.log(product2);
