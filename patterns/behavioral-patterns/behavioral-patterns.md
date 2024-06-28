## Behavioral patterns
These patterns focus on the interactions and communication between objects and classes. They provide solutions for effectively managing the flow of control, responsibilities, and behavior between objects.

### Observer

With the observer pattern, we can subscribe certain objects, the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers

An observable object usually contains 4 important parts:

- `observers`: an array of observers that will get notified whenever a specific event occurs
- `subscribe()`: a method in order to add observers to the observers list
- `unsubscribe()`: a method in order to remove observers from the observers list
- `notify()`: a method to notify all observers whenever a specific event occurs

```
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

export default new Observable();
```

### Strategy

Strategy Pattern in JavaScript helps solve the problem of needing to use different methods or behaviors in your code and easily switch between them. Strategy Method is a behavioral design pattern in JavaScript that defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the client to choose an algorithm from a family of algorithms at runtime, without altering the code that uses these algorithms.

```
// Strategy Interface
class DiscountStrategy {
  calculateDiscount(orderTotal) {
    // To be implemented by concrete strategies
  }
}

// Concrete Strategies
class NoDiscount extends DiscountStrategy {
  calculateDiscount(orderTotal) {
    return 0;
  }
}

class TenPercentDiscount extends DiscountStrategy {
  calculateDiscount(orderTotal) {
    return orderTotal * 0.1;
  }
}

class TwentyPercentDiscount extends DiscountStrategy {
  calculateDiscount(orderTotal) {
    return orderTotal * 0.2;
  }
}

// Context
class ShoppingCart {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotal() {
    const orderTotal = this.items.reduce(
      (total, item) => total + item.price,
      0
    );
    return orderTotal - this.discountStrategy.calculateDiscount(orderTotal);
  }
}

// Example usage
const noDiscount = new NoDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const twentyPercentDiscount = new TwentyPercentDiscount();

const cart1 = new ShoppingCart(noDiscount);
cart1.addItem({ name: "Item 1", price: 50 });
console.log("Cart 1 Total:", cart1.calculateTotal());

const cart2 = new ShoppingCart(tenPercentDiscount);
cart2.addItem({ name: "Item 1", price: 50 });
console.log("Cart 2 Total:", cart2.calculateTotal());

const cart3 = new ShoppingCart(twentyPercentDiscount);
cart3.addItem({ name: "Item 1", price: 50 });
console.log("Cart 3 Total:", cart3.calculateTotal());
```

### Template method

Template Method is a behavioral design pattern that defines the skeleton of an algorithm in a base class while allowing subclasses to implement specific steps of the algorithm without changing its structure. It promotes code reusability and provides a way to enforce a consistent algorithm structure across different subclasses.

```
// Base Sandwich class with the template method
class Sandwich {
  make() {
    this.cutBread();
    this.addFilling();
    this.addCondiments();
    this.wrap();
  }

  cutBread() {
    console.log("Cutting the bread.");
  }

  addCondiments() {
    console.log("Adding condiments (mayonnaise, mustard, etc.).");
  }

  wrap() {
    console.log("Wrapping the sandwich.");
  }

  // Abstract method for adding filling
  addFilling() {
    throw new Error("Subclasses must implement the addFilling method.");
  }
}

// Subclass 1: Veggie Sandwich
class VeggieSandwich extends Sandwich {
  addFilling() {
    console.log("Adding veggies (lettuce, tomato, cucumber, etc.).");
  }
}

// Subclass 2: Turkey Sandwich
class TurkeySandwich extends Sandwich {
  addFilling() {
    console.log("Adding turkey slices.");
  }
}

// Create and make sandwiches
const veggieSandwich = new VeggieSandwich();
const turkeySandwich = new TurkeySandwich();

console.log("Making a Veggie Sandwich:");
veggieSandwich.make();

console.log("\nMaking a Turkey Sandwich:");
turkeySandwich.make();

```

### Iterator

Iterator design pattern is a behavioral design pattern that provides a way to access the elements of an aggregate object sequentially keeping the internal structure and details of the collection (or any object being iterated over) hidden from the outside world or client code. It separates the responsibility of accessing and traversing the elements from the aggregate object. 

```
// CustomList class implementing the Iterable interface
class CustomList {
  constructor() {
    this.list = [];
  }

  add(item) {
    this.list.push(item);
  }

  getIterator() {
    return new ListIterator(this);
  }
}

// Iterator class implementing the Iterator interface
class ListIterator {
  constructor(list) {
    this.list = list.list;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.list.length;
  }

  next() {
    return this.list[this.index++];
  }
}

// Client code
const customList = new CustomList();
customList.add("item1");
customList.add("item2");
customList.add("item3");

const iterator = customList.getIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}

```

### Chain of Responsibility

The Chain of Responsibility design pattern is a behavioral design pattern that allows an object to pass a request along a chain of handlers. Each handler in the chain decides either to process the request or to pass it along the chain to the next handler.

```
var Request = function (amount) {
    this.amount = amount;
    console.log("Requested: $" + amount + "\n");
}

Request.prototype = {
    get: function (bill) {
        var count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        console.log("Dispense " + count + " $" + bill + " bills");
        return this;
    }
}
function run() {
    var request = new Request(378);

    request.get(100).get(50).get(20).get(10).get(5).get(1);
}
```

### Command

The Command pattern encapsulates actions as objects. Command objects allow for loosely coupled systems by separating the objects that issue a request from the objects that actually process the request. These requests are called events and the code that processes the requests are called event handlers.

```
function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

var Command = function (execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

var AddCommand = function (value) {
    return new Command(add, sub, value);
};

var SubCommand = function (value) {
    return new Command(sub, add, value);
};

var MulCommand = function (value) {
    return new Command(mul, div, value);
};

var DivCommand = function (value) {
    return new Command(div, mul, value);
};

var Calculator = function () {
    var current = 0;
    var commands = [];

    function action(command) {
        var name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return {
        execute: function (command) {
            current = command.execute(current, command.value);
            commands.push(command);
            console.log(action(command) + ": " + command.value);
        },

        undo: function () {
            var command = commands.pop();
            current = command.undo(current, command.value);
            console.log("Undo " + action(command) + ": " + command.value);
        },

        getCurrentValue: function () {
            return current;
        }
    }
}

function run() {

    var calculator = new Calculator();

    // issue commands

    calculator.execute(new AddCommand(100));
    calculator.execute(new SubCommand(24));
    calculator.execute(new MulCommand(6));
    calculator.execute(new DivCommand(2));

    // reverse last two commands

    calculator.undo();
    calculator.undo();

    console.log("\nValue: " + calculator.getCurrentValue());
}
```

### Interpreter

The Interpreter pattern offers a scripting language that allows end-users to customize their solution.

```
var Context = function (input) {
    this.input = input;
    this.output = 0;
}

Context.prototype = {
    startsWith: function (str) {
        return this.input.substr(0, str.length) === str;
    }
}

var Expression = function (name, one, four, five, nine, multiplier) {
    this.name = name;
    this.one = one;
    this.four = four;
    this.five = five;
    this.nine = nine;
    this.multiplier = multiplier;
}

Expression.prototype = {
    interpret: function (context) {
        if (context.input.length == 0) {
            return;
        }
        else if (context.startsWith(this.nine)) {
            context.output += (9 * this.multiplier);
            context.input = context.input.substr(2);
        }
        else if (context.startsWith(this.four)) {
            context.output += (4 * this.multiplier);
            context.input = context.input.substr(2);
        }
        else if (context.startsWith(this.five)) {
            context.output += (5 * this.multiplier);
            context.input = context.input.substr(1);
        }
        while (context.startsWith(this.one)) {
            context.output += (1 * this.multiplier);
            context.input = context.input.substr(1);
        }
    }
}

function run() {
    var roman = "MCMXXVIII"
    var context = new Context(roman);
    var tree = [];

    tree.push(new Expression("thousand", "M", " ", " ", " ", 1000));
    tree.push(new Expression("hundred", "C", "CD", "D", "CM", 100));
    tree.push(new Expression("ten", "X", "XL", "L", "XC", 10));
    tree.push(new Expression("one", "I", "IV", "V", "IX", 1));

    for (var i = 0, len = tree.length; i < len; i++) {
        tree[i].interpret(context);
    }

    console.log(roman + " = " + context.output);
}
```

### Memento

The Memento pattern provides temporary storage as well as restoration of an object. The mechanism in which you store the object’s state depends on the required duration of persistence, which may vary.

```
var Person = function (name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
}

Person.prototype = {

    hydrate: function () {
        var memento = JSON.stringify(this);
        return memento;
    },

    dehydrate: function (memento) {
        var m = JSON.parse(memento);
        this.name = m.name;
        this.street = m.street;
        this.city = m.city;
        this.state = m.state;
    }
}

var CareTaker = function () {
    this.mementos = {};

    this.add = function (key, memento) {
        this.mementos[key] = memento;
    },

        this.get = function (key) {
            return this.mementos[key];
        }
}

function run() {

    var mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
    var john = new Person("John Wang", "48th Street", "San Jose", "CA");
    var caretaker = new CareTaker();

    // save state

    caretaker.add(1, mike.hydrate());
    caretaker.add(2, john.hydrate());

    // mess up their names

    mike.name = "King Kong";
    john.name = "Superman";

    // restore original state

    mike.dehydrate(caretaker.get(1));
    john.dehydrate(caretaker.get(2));

    console.log(mike.name);
    console.log(john.name);
}
```

### State

The State pattern provides state-specific logic to a limited set of objects in which each object represents a particular state. This is best explained with an example.

```
var TrafficLight = function () {
    var count = 0;
    var currentState = new Red(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
}

var Red = function (light) {
    this.light = light;

    this.go = function () {
        console.log("Red --> for 1 minute");
        light.change(new Green(light));
    }
};

var Yellow = function (light) {
    this.light = light;

    this.go = function () {
        console.log("Yellow --> for 10 seconds");
        light.change(new Red(light));
    }
};

var Green = function (light) {
    this.light = light;

    this.go = function () {
        console.log("Green --> for 1 minute");
        light.change(new Yellow(light));
    }
};

function run() {

    var light = new TrafficLight();
    light.start();
}
```

### Visitor

Visitors are useful when building extensibility in a library or framework. If the objects in your project provide a 'visit' method that accepts a Visitor object which can make changes to the receiving object then you are providing an easy way for clients to implement future extensions.

```
var Employee = function (name, salary, vacation) {
    var self = this;

    this.accept = function (visitor) {
        visitor.visit(self);
    };

    this.getName = function () {
        return name;
    };

    this.getSalary = function () {
        return salary;
    };

    this.setSalary = function (sal) {
        salary = sal;
    };

    this.getVacation = function () {
        return vacation;
    };

    this.setVacation = function (vac) {
        vacation = vac;
    };
};

var ExtraSalary = function () {
    this.visit = function (emp) {
        emp.setSalary(emp.getSalary() * 1.1);
    };
};

var ExtraVacation = function () {
    this.visit = function (emp) {
        emp.setVacation(emp.getVacation() + 2);
    };
};

function run() {

    var employees = [
        new Employee("John", 10000, 10),
        new Employee("Mary", 20000, 21),
        new Employee("Boss", 250000, 51)
    ];

    var visitorSalary = new ExtraSalary();
    var visitorVacation = new ExtraVacation();

    for (var i = 0, len = employees.length; i < len; i++) {
        var emp = employees[i];

        emp.accept(visitorSalary);
        emp.accept(visitorVacation);
        console.log(emp.getName() + ": $" + emp.getSalary() +
            " and " + emp.getVacation() + " vacation days");
    }
}
```
