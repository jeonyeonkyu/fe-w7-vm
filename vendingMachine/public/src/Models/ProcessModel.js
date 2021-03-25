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

  updateLog(selector, content) {
    let print = '';
    switch (selector) {
      case '투입':
        print = `${content}원이 투입됐음.`;
        break;
      case '음료선택':
        print = `${content}(이)가 선택됐음`;
        break;
      case '반환':
        print = `잔돈 ${content}원 반환`;
        break;
      case '구매불가':
        print = `${content} 구매 실패`;
        break;
      case '상품배출':
        print = `${content}(이) 배출됐음`;
        break;
    }
    this.processObject.log.push(print);
  }
}

const processModel = new ProcessModel();
export default processModel;