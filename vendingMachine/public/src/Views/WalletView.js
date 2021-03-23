import _ from "../utils/elementUtil.js";

class WalletView {
  constructor({ walletModel }, { $walletMoney, priceClassName, $priceList, $countList, $totalMoney }) {
    this.walletModel = walletModel;
    this.$walletMoney = $walletMoney;
    this.priceClassName = priceClassName;
    this.$priceList = $priceList;
    this.$countList = $countList;
    this.$totalMoney = $totalMoney;
    this.init();
  }

  init() {
    this.render();
    this.initEvent();
  }

  initEvent() {
    _.on(this.$walletMoney, 'click', this.clickPriceHandler.bind(this));
  }

  clickPriceHandler({ target }) {
    if (!target.classList.contains(this.priceClassName)) return;
    if (target.classList.contains('disable')) return;
    this.walletModel.useMoney(target.innerText);
    this.render();
  }

  moneyDisableChanger() {
    const moneyObject = this.walletModel.getMoneyObject();
    let i = 0;
    for (let price in moneyObject) {
      const priceNode = this.$priceList[i++];
      moneyObject[price] === 0 ?
        priceNode.classList.add('disable') : priceNode.classList.remove('disable');
    }
  }

  renderCount() {
    const moneyObject = this.walletModel.getMoneyObject();
    let i = 0;
    for (let price in moneyObject) {
      this.$countList[i++].innerText = moneyObject[price];
    }
  }

  renderTotalMoney() {
    this.$totalMoney.innerText = this.walletModel.getMoney();
  }

  render() {
    this.moneyDisableChanger();
    this.renderCount();
    this.renderTotalMoney();
  }
}

export default WalletView;