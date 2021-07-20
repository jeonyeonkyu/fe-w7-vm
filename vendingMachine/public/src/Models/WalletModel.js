import Observable from '../Observable/Observable.js';

class WalletModel extends Observable {
  wallet = new Map([
    [10000, 0],
    [5000, 0],
    [1000, 0],
    [500, 0],
    [100, 0],
    [50, 0],
    [10, 0],
  ]);

  constructor(money) {
    super();
    this.init(money);
  }

  init(money) {
    this.updateWallet(money);
  }

  updateWallet(money) {
    let currentMoney = money;
    for (let moneyKind of this.wallet.keys()) {
      const count = Math.floor(currentMoney / moneyKind);
      this.wallet.set(moneyKind, count);
      currentMoney -= count * moneyKind;
    }
  }

  useMoney(moneyKind) {
    let count = this.wallet.get(moneyKind);
    this.wallet.set(moneyKind, --count);
    this.money -= moneyKind;
  }

  addMoney(money) {
    const currentMoney = money + this.getTotalMoney();
    this.updateWallet(currentMoney);
  }

  getWallet() {
    return Array.from(this.wallet.entries()); // moneyObject가 Map이라 가정
  }

  getTotalMoney() {
    const totalMoney = this.getWallet().reduce((acc, [moneyKind, count]) => {
      return acc + (moneyKind * count);
    }, 0);
    return totalMoney;
  }
}

export default WalletModel;