// Builder pattern

class Hamburger {
  constructor() {
    this.cheese = false;
    this.pepperoni = false;
    this.lettuce = false;
    this.tomato = false;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addLettuce() {
    this.lettuce = true;
    return this;
  }

  addTomato() {
    this.tomato = true;
    return this;
  }

  build() {
    return this;
  }
}

const hamburger = new Hamburger().addCheese().addLettuce().addTomato().build();

console.log(hamburger);
