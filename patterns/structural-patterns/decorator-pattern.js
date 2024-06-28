// Decorator pattern

class Person {
  constructor(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
}

class DecoratedPerson {
  constructor(person) {
    this.person = person;
    this.getFullName = function () {
      return `${this.person.name} ${this.person.lastName}`;
    };
  }
}

const person = new Person("John", "Doe", 25);

const decoratedPerson = new DecoratedPerson(person);
