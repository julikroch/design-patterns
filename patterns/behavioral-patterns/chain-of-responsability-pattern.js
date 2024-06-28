class Request {
  constructor(amount) {
    this.amount = amount;
  }

  getBillCount(bill) {
    const count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    console.log(`Dispense ${count} $${bill} bill${count > 1 ? "s" : ""}`);
    return this;
  }
}

const request1 = new Request(378)
  .getBillCount(100)
  .getBillCount(50)
  .getBillCount(20)
  .getBillCount(10)
  .getBillCount(5)
  .getBillCount(1);
