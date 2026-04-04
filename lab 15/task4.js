function toCamelCase(str) {
    return str.split('-').map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

console.log(toCamelCase('font-size'));
console.log(toCamelCase('background-color'));
console.log(toCamelCase('text-align'));
