// Template method

abstract class Sandwich {
  cutBread() {
    console.log("The bread is cut");
  }

  addIngredients() {
    console.log("Add ingredients");
  }

  wrap() {
    console.log("Wrap the sandwich");
  }

  addCondiments() {
    throw new Error("This method must be overwritten");
  }
}

class TurkeySandwich extends Sandwich {
  addCondiments() {
    console.log("Add mustard and mayo");
  }
}

class VeganSandwich extends Sandwich {
  addCondiments() {
    console.log("Add vegan mayo");
  }
}
