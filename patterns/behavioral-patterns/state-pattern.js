let count = 0;

class TrafficLight {
  constructor() {
    this.state = new RedLight(this);
  }

  change() {
    this.state.change();
  }
}

class RedLight {
  constructor(light) {
    this.light = light;

    setTimeout(() => {
      this.change();
    }, 500);
  }

  change() {
    if (count === 2) { // Stop the cycle
      return;
    }
    console.log("Red Light");
    count++;
    this.light.state = new GreenLight(this.light);
  }
}

class GreenLight {
  constructor(light) {
    this.light = light;

    setTimeout(() => {
      this.change();
    }, 500);
  }

  change() {
    console.log("Green Light");
    this.light.state = new YellowLight(this.light);
  }
}

class YellowLight {
  constructor(light) {
    this.light = light;

    setTimeout(() => {
      this.change();
    }, 500);
  }

  change() {
    console.log("Yellow Light");
    this.light.state = new RedLight(this.light);
  }
}

const trafficLight = new TrafficLight();
