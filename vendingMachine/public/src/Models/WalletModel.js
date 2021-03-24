class WalletModel {
  moneyObject = new Map([
    [10000, 0],
    [5000, 0],
    [1000, 0],
    [500, 0],
    [100, 0],
    [50, 0],
    [10, 0],
  ]);

  constructor(money) {
    this.money = money;
    this.init(money);
    this.observers = [];
  }

  
  init(money) {
    this.makeObject(money);
  }

  makeObject(money) {
    let currentMoney = money;
    for (let moneyKind of this.moneyObject.keys()) {
      if (currentMoney < 10) return;
      const count = Math.floor(currentMoney / moneyKind);
      this.moneyObject.set(moneyKind, count);
      currentMoney -= count * moneyKind;
    }
  }

  useMoney(moneyKind) {
    let count = this.moneyObject.get(moneyKind);
    this.moneyObject.set(moneyKind, --count);
    this.money -= moneyKind;
  }

  getMoneyObject() {
    return Array.from(this.moneyObject.entries()); // moneyObject가 Map이라 가정
  }

  getMoney() {
    return this.money;
  }

  registerObserver(target) {
    this.observers.push(target);
  }

  unregisterObserver(target) {
    this.observers = this.observers.filter(observer => observer !== target); 
  }

  notifyObservers(content) {
    this.observers.forEach((observer) => observer.notify(content));
  } 

}

export default WalletModel;