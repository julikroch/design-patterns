// Strategy pattern

class NoDiscount {
  calculateDiscount(orderTotal) {
    return orderTotal;
  }
}

class TenPercentDiscount {
  calculateDiscount(orderTotal) {
    return orderTotal * 0.1;
  }
}

class FiftyPercentDiscount {
  calculateDiscount(orderTotal) {
    return orderTotal * 0.5;
  }
}

class ShoppingCart {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotal() {
    const total = this.items.reduce((acc, item) => acc + item.price, 0);
    return total - this.discountStrategy.calculateDiscount(total);
  }
}

const order1 = new ShoppingCart(new NoDiscount());
order1.addItem({ price: 100 });
order1.addItem({ price: 200 });
console.log(order1.calculateTotal());

const order2 = new ShoppingCart(new TenPercentDiscount());
order2.addItem({ price: 100 });
order2.addItem({ price: 200 });
console.log(order2.calculateTotal());
