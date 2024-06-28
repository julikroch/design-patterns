// Factory method pattern

class Person {
  constructor(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
}

class PersonFactory {
  createPerson(name, lastName, age) {
    return new Person(name, lastName, age);
  }
}

const person1 = new PersonFactory();
