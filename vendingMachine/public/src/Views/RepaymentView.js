import _ from '../utils/elementUtil.js';

class RepaymentView {
  constructor({ processModel }, { $processExchange }) {
    this.processModel = processModel;
    this.$processExchange = $processExchange;
    this.init();
  }

  init() {
    this.initEvent();
  }

  initEvent() {
    _.on(this.$processExchange, 'click', () => {
      console.log(123)
    })
  }
}









export default RepaymentView;