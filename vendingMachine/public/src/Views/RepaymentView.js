import _ from '../utils/elementUtil.js';

class RepaymentView {
  constructor({ walletModel, processModel }, { $processExchange }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.$processExchange = $processExchange;
    this.init();
  }

  init() {
    this.initEvent();
  }

  initEvent() {
    _.on(this.$processExchange, 'click', this.exchangeClickHandler.bind(this));
  }

  exchangeClickHandler() {
    const inputMoney = this.processModel.getMoney();
    this.processModel.exchangeMoney();
    this.processModel.updateLog('반환', inputMoney);
    this.processModel.notify(this.processModel.getProcessObject());
    this.walletModel.addMoney(inputMoney);
    const wallet = this.walletModel.getWallet();
    this.walletModel.notify(wallet);
    console.log(this.processModel.getProcessObject());
  }
}

export default RepaymentView;