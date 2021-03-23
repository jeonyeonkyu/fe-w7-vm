class ProductModel {
  constructor({ products }) {
    this.products = products;
  }

  sold(name) {
    const item = this.products.find(item => item.name === name);
    item.count--;
  }

  getProduct() {
    return [...this.products];
  }
}

export default ProductModel;