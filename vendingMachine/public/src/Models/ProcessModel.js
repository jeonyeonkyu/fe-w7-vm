import Observable from '../Observable/Observable.js';

class ProcessModel extends Observable {
  processObject = {
    money: 0,
    log: []
  }

  constructor() {
    super();
  }

  getProcessObject() {
    return this.processObject;
  }

  getMoney() {
    return this.processObject.money;
  }

  exchangeMoney() {
    this.processObject.money = 0;
  }

  updateMoney(money) {
    this.processObject.money += money;
  }

}

const processModel = new ProcessModel();

export default processModel;