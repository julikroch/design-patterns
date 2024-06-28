// Abstract Factory

abstract class Theme {
  createButton() {}
}

class LightTheme extends Theme {
  createButton() {
    return new LightButton();
  }
}

class DarkTheme extends Theme {
  createButton() {
    return new DarkButton();
  }
}

abstract class Button {
  create() {}
}

class LightButton extends Button {
  create() {
    return "Light button";
  }
}

class DarkButton extends Button {
  create() {
    return "Dark button";
  }
}

const newLightTheme = new LightTheme();
const newButton = newLightTheme.createButton();
