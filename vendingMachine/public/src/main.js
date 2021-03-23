import ProductModel from './Models/ProductModel.js';
import ProcessModel from './Models/ProcessModel.js';
import WalletModel from './Models/WalletModel.js';

import ProductView from './Views/ProductView.js';
import ProcessView from './Views/ProcessView.js';
import WalletView from './Views/WalletView.js';


const walletModel = new WalletModel(23550);

walletModel.init()
walletModel.getMoneyObject(); //이렇게하면 {10 : 0, 50: 0} 요런식으로나오게 하기


const productView = new ProductView();

const processView = new ProcessView();

const walletView = new WalletView();



const wallet = document.querySelector(".wallet");
wallet.addEventListener("click", (e) => {
  const currency = e.target;
  if (currency.innerText[currency.innerText.length - 1] === "원") {
    let currencyCount = Number(e.target.nextElementSibling.innerText);
    if (currencyCount > 0) {
      currencyCount--;
      e.target.nextElementSibling.innerText = currencyCount;
    }
  }
})