class InputAmountView {
  constructor({ processModel }, { $processPrice }) {
    this.processModel = processModel;
    this.$processPrice = $processPrice;
    this.init();
  }

  init() {
    this.processModel.subscribe(this.render.bind(this));
  }

  render({ money }) {
    this.$processPrice.innerText = money;
  }
}

export default InputAmountView;