// Prototype pattern

class Person {
  constructor(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }

  clone() {
    return new Person(this.name, this.lastName, this.age);
  }
}

const person1 = new Person("John", "Doe", 25);
const person2 = person1.clone();
