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
    this.processModel.subscribe(this.render.bind(this)); // ProductView의 render 가 ProcessModel을 구독
  }

  initEvent() {
    _.on(this.$wrapper, 'click', this.clickProductHandler.bind(this));
  }

  async clickProductHandler({ target }) {
    const processObj = this.processModel.getProcessObject();

    if (!target.classList.contains(this.nameListClassName)) return;
    if (this.isSoldOut(target)) {
      this.processModel.updateLog('구매불가', target.innerText);
      this.processModel.notify(processObj);
      console.log(processObj);
    } else {
      this.disposeProduct(target);
      this.processModel.updateLog('음료선택', target.innerText);
      this.processModel.notify(processObj);
      console.log(processObj);
    }
  }

  isSoldOut(product) {
    return product.classList.contains("disable");
  }

  async disposeProduct(product) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const processObj = this.processModel.getProcessObject();
    this.productModel.sold(product.innerText);
    const price = Number(product.nextElementSibling.innerText);
    this.minusMoney(price, processObj);
    this.processModel.updateLog('상품배출', product.innerText);
    this.processModel.notify(processObj);
  }



  minusMoney(price, processObj) {
    processObj.money -= price;
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

  render({ money }, templateFn) {
    this.itemDisableChanger(money);
  }

}

export default ProductView;