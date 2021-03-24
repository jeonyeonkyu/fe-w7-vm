class PrintView {
  constructor({ processModel }, { $processLog }) {
    this.processModel = processModel;
    this.$processLog = $processLog;
    this.init();
  }

  init() {
    this.processModel.subscribe(this.render.bind(this));
  }

  render({ log }) {

  }

}









export default PrintView;