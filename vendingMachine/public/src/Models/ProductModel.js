class ProductModel {
  constructor({ products }) {
    this.products = products;
    this.observers = [];
  }

  sold(name) {
    const item = this.products.find(item => item.name === name);
    item.count--;
    this.notifyObservers(name);
  }

  getProduct() {
    return [...this.products];
  }

  registerObserver(target) {
    this.observers.push(target);
  }

  unregisterObserver(target) {
    this.observers = this.observers.filter(observer => observer !== target); 
  }

  notifyObservers(content) {
    this.observers.forEach((observer) => observer.notify(content));
  } 

}



export default ProductModel;