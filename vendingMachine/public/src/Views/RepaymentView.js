import _ from '../utils/elementUtil.js';

class RepaymentView {
  constructor({ walletModel, processModel }, { $processExchange }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.$processExchange = $processExchange;
    this.observeTimer = null;
    this.boundNoInputObservingTimer = this.noInputObservingTimer.bind(this);
    this.init();
  }

  init() {
    this.processModel.subscribe(this.boundNoInputObservingTimer);
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
    this.processModel.subscribe(this.boundNoInputObservingTimer);
  }

  noInputObservingTimer() {
    if (this.observeTimer) clearTimeout(this.observeTimer);
    this.observeTimer = setTimeout(() => {
      this.processModel.unsubscribe(this.boundNoInputObservingTimer);
      this.exchangeClickHandler();
    }, 5000);
  }
}

export default RepaymentView;