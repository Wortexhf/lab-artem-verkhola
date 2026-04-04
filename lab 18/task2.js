class Student {
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    study() {
        console.log(this.name + ', ' + this.age + ' років, навчається на оцінку ' + this.grade);
    }
}

let s1 = new Student('Олег', 20, 90);
let s2 = new Student('Марія', 21, 75);
let s3 = new Student('Іван', 19, 60);

s1.study();
s2.study();
s3.study();
