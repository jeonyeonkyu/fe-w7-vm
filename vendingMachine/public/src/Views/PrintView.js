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
    this.$processLog.innerHTML = this.template({ log });
  }

  template({ log }) {
    const template = `<ul>
      ${log.map(print => `<li>${print}</li>`).join('')}
                      </ul>`;
    return template;
  }
}









export default PrintView;