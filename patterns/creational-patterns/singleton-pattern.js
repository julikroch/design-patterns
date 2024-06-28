// Singleton patterns
let instance = null;

class Person {
  constructor(name, age) {
    if (!instance) {
      this.name = name;
      this.age = age;

      instance = this;
    }

    return instance;
  }
}

const person1 = new Person("John", 25);
const person2 = new Person("Jane", 22);
const person3 = new Person("Test", 30)

console.log(person1 === person2); // true
