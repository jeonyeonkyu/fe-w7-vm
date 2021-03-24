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

  notify(content) {
    console.log(`모델의 ${content} 가 바뀌었어`); // ProductModel에서 데이터가 변경되면 알림받음
  }
  
  init() {
    this.initEvent();
    this.productModel.registerObserver(this); // ProductView 가 ProductModel을 구독
  }

  initEvent() {
    _.on(this.$wrapper, 'click', this.clickProductHandler.bind(this));
  }

  clickProductHandler({ target }) {
    if (!target.classList.contains(this.nameListClassName)) return;
    this.productModel.sold(target.innerText);

    // 상품이 판매중일때만 제품 배출
    if(!this.isSoldOut(target)) this.disposeProduct(target);
    else console.log("매진된 제품입니다.");
  }

  isSoldOut(product) {
    return product.classList.contains("disable");
  }

  disposeProduct(product) {
    setTimeout(() => {
      console.log(`${product.innerText} 뽑았습니다.`);
      this.render();
    },2000)
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