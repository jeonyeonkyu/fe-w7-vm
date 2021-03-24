import _ from "../utils/elementUtil.js";
import zip from "../utils/serviceUtil.js";

class ProductView {
  constructor({ productModel }, { $wrapper, nameListClassName, $nameList, $priceList }) {
    this.productModel = productModel;
    this.$wrapper = $wrapper;
    this.nameListClassName = nameListClassName;
    this.$nameList = $nameList;
    this.$priceList = $priceList;
    this.init();
  }

  init() {
    this.initEvent();
  }

  initEvent() {
    _.on(this.$wrapper, 'click', this.clickProductHandler.bind(this));
  }

  clickProductHandler({ target }) {
    if (!target.classList.contains(this.nameListClassName)) return;
    this.productModel.sold(target.innerText);
    this.render();
  }

  itemDisableChanger() {
    const pairs = zip(this.$nameList, this.productModel.getProduct());
    pairs
      .filter(([_, p]) => p.count <= 0)
      .forEach(([$name]) => $name.classList.add('disable'));
    pairs
      .filter(([_, p]) => p.count > 0)
      .forEach(([$name]) => $name.classList.remove('disable'));
  }

  render() {
    this.itemDisableChanger();
  }
}

export default ProductView;