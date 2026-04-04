function isValidURL(url) {
    let regex = /^(https?|ftp):\/\/.+/;
    return regex.test(url);
}

let url1 = "https://www.example.com";
let url2 = "ftp://fileserver/documents";
let url3 = "invalid-url";
let url4 = "http://example.com";

console.log(isValidURL(url1));
console.log(isValidURL(url2));
console.log(isValidURL(url3));
console.log(isValidURL(url4));
