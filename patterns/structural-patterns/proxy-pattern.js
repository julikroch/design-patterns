// Proxy pattern

class Proxy {
  constructor(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }

  get(obj, prop) {
    if (!obj[prop]) {
      return "Property does not exist";
    } else {
      return "The value is " + obj[prop];
    }
  }

  set(obj, prop, value) {
    if (prop === "age" && value < 18) {
      console.log("The age must be greater than 18");
    } else {
      obj[prop] = value;
    }
  }
}

const person = new Proxy("John", "Doe", 25);

console.log(person.get(person, "name"));
console.log(person.set(person, "age", 17));
