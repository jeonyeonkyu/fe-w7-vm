import Observable from '../Observable/Observable.js';

class ProcessModel extends Observable {
  processObject = {
    money: 0,
    exchange: false,
    log: []
  }

  constructor() {
    super();
    
  }


  getProcessObject() {
    return this.processObject;
  }


}

const processModel = new ProcessModel();

export default processModel;