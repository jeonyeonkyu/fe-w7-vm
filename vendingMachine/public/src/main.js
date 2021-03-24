import _ from './utils/elementUtil.js';
import products from "./data/products.js";

import ProductModel from './Models/ProductModel.js';
import ProductView from './Views/ProductView.js';

import ProcessModel from './Models/ProcessModel.js';
import InputAmountView from './Views/InputAmountView.js';
import PrintView from './Views/PrintView.js';
import RepaymentView from './Views/RepaymentView.js';

import WalletModel from './Models/WalletModel.js';
import WalletView from './Views/WalletView.js';




const productModel = new ProductModel({ products });
const productEl = {
  $wrapper: _.$('.product__twenty'),
  nameListClassName: 'product__twenty__name',
  $nameList: _.$All('.product__twenty__name'),
  $priceList: _.$All('.product__twenty__price'),
}
const productView = new ProductView({ productModel }, productEl);

const processModel = new ProcessModel();


const walletModel = new WalletModel(23550);
const walletEl = {
  $walletMoney: _.$('.wallet__money'),
  priceClassName: 'wallet__money__price',
  $priceList: _.$All(`.wallet__money__price`),
  $countList: _.$All('.wallet__money__count'),
  $totalMoney: _.$('.wallet__total_money')
}
const walletView = new WalletView({ walletModel }, walletEl);
