import _ from "../utils/elementUtil.js";
import zip from "../utils/serviceUtil.js";

class ProductView {
  constructor({ productModel, processModel }, { $wrapper, nameListClassName, $nameList, $priceList }) {
    this.productModel = productModel;
    this.processModel = processModel;
    this.$wrapper = $wrapper;
    this.nameListClassName = nameListClassName;
    this.$nameList = $nameList;
    this.$priceList = $priceList;
    this.init();
  }

  init() {
    this.initEvent();
    this.processModel.subscribe(this.render.bind(this));
  }

  initEvent() {
    _.on(this.$wrapper, 'click', this.clickProductHandler.bind(this));
  }

  clickProductHandler({ target }) {
    const processObj = this.processModel.getProcessObject();
    if (!target.classList.contains(this.nameListClassName)) return;
    if (this.isSoldOut(target)) {
      this.processModel.updateLog('구매불가', target.innerText);
    } else {
      const price = Number(target.nextElementSibling.innerText);
      this.disposeProduct(target);
      this.processModel.updateLog('음료선택', target.innerText);
      this.productModel.sold(target.innerText);
      this.processModel.updateMoney(-price);
    }
    this.processModel.notify(processObj);
  }

  isSoldOut(product) {
    return product.classList.contains("disable");
  }

  async disposeProduct(product) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const processObj = this.processModel.getProcessObject();
    this.processModel.updateLog('상품배출', product.innerText);
    this.processModel.notify(processObj);
  }

  itemDisableChanger(money) {
    const pairs = zip(this.$nameList, this.productModel.getProduct());
    pairs
      .filter(([_, p]) => p.count <= 0 || p.price > money)
      .forEach(([$name]) => $name.classList.add('disable'));

    pairs
      .filter(([_, p]) => p.count > 0 && p.price <= money)
      .forEach(([$name]) => $name.classList.remove('disable'));
  }

  render({ money }) {
    this.itemDisableChanger(money);
  }
}

export default ProductView;