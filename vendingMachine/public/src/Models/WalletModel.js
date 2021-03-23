class WalletModel {
  moneyObject = {
    KRW10: 0,
    KRW50: 0,
    KRW100: 0,
    KRW500: 0,
    KRW1000: 0,
    KRW5000: 0,
    KRW10000: 0
  };
  constructor(money) {
    this.money = money;
    this.init(money);
  }

  init(money) {
    this.makeObject(money);
  }

  makeObject(money) {
    let currentMoney = money;
    let twoOrFiveFlag = true;
    let moneyKind = 10000;
    while (currentMoney) {
      if (currentMoney < 10) return;
      const count = Math.floor(currentMoney / moneyKind);
      this.moneyObject[`KRW${moneyKind}`] = count;
      currentMoney -= count * moneyKind;
      moneyKind = twoOrFiveFlag ? moneyKind / 2 : moneyKind / 5;
      twoOrFiveFlag = !twoOrFiveFlag;
    }
  }

  useMoney(moneyKind) {
    this.moneyObject[`KRW${moneyKind}`]--;
    this.money -= moneyKind;
  }

  getMoneyObject() {
    return { ...this.moneyObject };
  }

  getMoney() {
    return this.money;
  }
}

export default WalletModel;