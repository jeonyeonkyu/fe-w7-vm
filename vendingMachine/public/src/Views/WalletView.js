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
    this.walletModel.subscribe(this.render.bind(this));
    const wallet = this.walletModel.getWallet();
    this.render(wallet);
    this.initEvent();
  }

  initEvent() {
    _.on(this.$walletMoney, 'click', this.clickPriceHandler.bind(this));
  }

  clickPriceHandler({ target }) {
    if (!target.classList.contains(this.priceClassName)) return;
    if (target.classList.contains('disable')) return;
    const moneyKind = Number(target.innerText);
    this.processModel.updateMoney(moneyKind);
    const processObj = this.processModel.getProcessObject();
    this.processModel.notify(processObj);
    this.walletModel.useMoney(moneyKind);
    const wallet = this.walletModel.getWallet();
    this.render(wallet);
  }

  moneyDisableChanger(wallet) {
    const moneyObj = wallet.map(el => el[1]);
    const pairs = zip(this.$priceList, moneyObj.reverse());
    pairs
      .filter(([_, count]) => count <= 0)
      .forEach(([$price]) => $price.classList.add('disable'));
    pairs
      .filter(([_, count]) => count > 0)
      .forEach(([$price]) => $price.classList.remove('disable'));
  }

  renderCount(wallet) {
    const moneyObj = wallet.map(el => el[1]);
    const pairs = zip(this.$countList, moneyObj.reverse());
    pairs.forEach(([$count, count]) => $count.innerText = count);
  }

  renderTotalMoney() {
    this.$totalMoney.innerText = this.walletModel.getTotalMoney();
  }

  render(wallet) {
    this.moneyDisableChanger(wallet);
    this.renderCount(wallet);
    this.renderTotalMoney();
  }
}

export default WalletView;