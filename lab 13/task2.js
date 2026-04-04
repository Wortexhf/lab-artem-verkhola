let num = Number(prompt("Введіть число:"));

if (num > 0 && num % 2 === 0) {
    console.log(num + " є парним додатним числом");
} else {
    console.log(num + " не є парним додатним числом");
}

if (num % 7 === 0) {
    console.log(num + " є кратним числу 7");
} else {
    console.log(num + " не є кратним числу 7");
}
