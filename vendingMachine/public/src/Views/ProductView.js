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

  clickProductHandler({ target }) {
    if (!target.classList.contains(this.nameListClassName)) return;

    // 상품이 판매중일때만 제품 배출
    if (this.isSoldOut(target)) console.log("매진되었거나 돈이 부족합니다.");
    else this.disposeProduct(target);
  }

  isSoldOut(product) {
    return product.classList.contains("disable");
  }

  disposeProduct(product) {
    setTimeout(() => {
      console.log(`${product.innerText} 뽑았습니다.`);
      this.productModel.sold(product.innerText);
      this.render(this.processModel.processObject.money);
      // product 클릭하면 해당 processModel의 money 에서 product 가격만큼 뺀다
      // notify  
    }, 2000)
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

  render({money}, templateFn) {
    this.itemDisableChanger(money);

    // templateFn();
  }

  drawTemplate() {
    
  }
}

export default ProductView;