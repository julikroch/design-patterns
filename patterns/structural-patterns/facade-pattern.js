// Facade Pattern Example

class PaymentSystem {
  checkBalance(accountId) {
    console.log(`Checking balance for account ID: ${accountId}`);
    return true;
  }
}

class InventorySystem {
  checkStock(itemId) {
    console.log(`Checking stock for item ID: ${itemId}`);
    return true;
  }
}

// Subsystem Class 3
class ShippingSystem {
  arrangeDelivery(itemId, accountId) {
    console.log(
      `Arranging delivery for item ID: ${itemId} to account ID: ${accountId}`
    );
    return true;
  }
}

class ShoppingFacade {
  constructor() {
    this.paymentSystem = new PaymentSystem();
    this.inventorySystem = new InventorySystem();
    this.shippingSystem = new ShippingSystem();
  }

  placeOrder(itemId, accountId) {
    if (!this.paymentSystem.checkBalance(accountId)) {
      console.log("Payment failed: Insufficient balance.");
      return false;
    }
    if (!this.inventorySystem.checkStock(itemId)) {
      console.log("Order failed: Item is out of stock.");
      return false;
    }
    if (!this.shippingSystem.arrangeDelivery(itemId, accountId)) {
      console.log("Order failed: Delivery arrangement failed.");
      return false;
    }
    console.log("Order placed successfully.");
    return true;
  }
}

const shopping = new ShoppingFacade();
shopping.placeOrder("123", "456");
