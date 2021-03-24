import _ from "../utils/elementUtil.js";
import zip from "../utils/serviceUtil.js";

class WalletView {
  constructor({ walletModel, processModel }, { $walletMoney, priceClassName, $priceList, $countList, $totalMoney }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
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
    const processObj = this.processModel.getProcessObject();

    const moneyKind = Number(target.innerText);
    processObj.money += moneyKind;
    this.processModel.notify(processObj);
    this.walletModel.useMoney(moneyKind);
    this.render();
  }

  moneyDisableChanger() {
    const moneyObj = this.walletModel.getMoneyObject().map(el => el[1]);
    const pairs = zip(this.$priceList, moneyObj.reverse());
    pairs
      .filter(([_, count]) => count <= 0)
      .forEach(([$price, _]) => $price.classList.add('disable'));
    pairs
      .filter(([_, count]) => count > 0)
      .forEach(([$price, _]) => $price.classList.remove('disable'));
  }

  renderCount() {

    const moneyObj = this.walletModel.getMoneyObject().map(el => el[1]);
    const pairs = zip(this.$countList, moneyObj.reverse());

    pairs.forEach(([$count, count]) => $count.innerText = count);
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