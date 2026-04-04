function checkEmail(email) {
    let regex = /^[A-Za-z0-9][A-Za-z0-9_]*(?:-[A-Za-z0-9_]+)*@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
    if (regex.test(email)) {
        console.log('Email is correct!');
    } else {
        console.log('Email is not correct!');
    }
}

checkEmail('my_mail@gmail.com');
checkEmail('#my_mail@gmail.com');
checkEmail('my_ma--il@gmail.com');
