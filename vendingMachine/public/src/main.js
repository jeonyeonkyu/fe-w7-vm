import _ from './utils/elementUtil.js';
import products from "./data/products.js";

import ProductModel from './Models/ProductModel.js';
import ProductView from './Views/ProductView.js';

import processModel from './Models/ProcessModel.js';
import InputAmountView from './Views/InputAmountView.js';
import RepaymentView from './Views/RepaymentView.js';
import PrintView from './Views/PrintView.js';

import WalletModel from './Models/WalletModel.js';
import WalletView from './Views/WalletView.js';

const productEl = {
  $wrapper: _.$('.product__twenty'),
  nameListClassName: 'product__twenty__name',
  $nameList: _.$All('.product__twenty__name'),
  $priceList: _.$All('.product__twenty__price'),
}

const processEl = {
  $processPrice: _.$('.process__print_price'),
  $processExchange: _.$('.process__exchange'),
  $processLog: _.$('.process__print_log')
}

const walletEl = {
  $walletMoney: _.$('.wallet__money'),
  priceClassName: 'wallet__money__price',
  $priceList: _.$All(`.wallet__money__price`),
  $countList: _.$All('.wallet__money__count'),
  $totalMoney: _.$('.wallet__total_money')
}

const productModel = new ProductModel({ products });
const productView = new ProductView({ productModel, ProcessModel }, productEl);

const inputAmountView = new InputAmountView({ processModel }, processEl);
const repaymentView = new RepaymentView({ processModel }, processEl);
const printView = new PrintView({ processModel }, processEl);

const walletModel = new WalletModel(23550);
const walletView = new WalletView({ walletModel, ProcessModel }, walletEl);
