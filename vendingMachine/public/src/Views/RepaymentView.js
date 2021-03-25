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
    const processObj = this.processModel.getProcessObject();
    const inputMoney = this.processModel.getMoney();
    this.processModel.exchangeMoney();
    this.processModel.notify(processObj);
    this.walletModel.addMoney(inputMoney);
    const wallet = this.walletModel.getWallet();
    this.walletModel.notify(wallet);
  }
}


export default RepaymentView;