function validateCard(number) {
    let regex = /^[45]\d{15}$/;
    if (regex.test(number)) {
        console.log(number + ': valid card');
    } else {
        console.log(number + ': invalid card');
    }
}

validateCard('4111111111111111');
validateCard('5500005555555559');
validateCard('1234567890123456');
validateCard('41111111111111');
