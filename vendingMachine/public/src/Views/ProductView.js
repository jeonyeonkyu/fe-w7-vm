import _ from "../utils/elementUtil.js";

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
    const productArray = this.productModel.getProduct();
    for (let i = 0; i < this.$nameList.length; i++) {
      const $name = this.$nameList[i];
      productArray[i].count === 0 ?
        $name.classList.add('disable') : $name.classList.remove('disable');
    }
  }

  render() {
    this.itemDisableChanger();
  }
}

export default ProductView;