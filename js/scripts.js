// const exchangeRates = {
//   usd: {
//     eur: 0.91,
//     aud: 1.48,
//     krw: 1203.0,
//     vnd: 23200.7
//   },
//   eur: {
//     usd: 1.09,
//     aud: 1.62,
//     krw: 1316.21,
//     vnd: 25383.96
//   },
//   aud: {
//     usd: 0.68,
//     eur: 0.62,
//     krw: 813.58,
//     vnd: 15690.63
//   },
//   krw: {
//     usd: 0.00083,
//     aud: 0.0012,
//     eur: 0.00076,
//     vnd: 19.29
//   },
//   vnd: {
//     krw: 0.052,
//     usd: 0.000043,
//     aud: 0.000064,
//     eur: 0.000039
//   }
// };

function exchangedCurrency() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let value = document.getElementById("value").value;

  const moneyValue = exchangeRates[from][to] * value;
  const formattedValue = formatCurrency(to, moneyValue);
  return formattedValue;
}

document.getElementById("convert").addEventListener("click", function() {
  convertCurrency();
});

function formatCurrency(type, value) {
  const formatter = new Intl.NumberFormat(type, {
    currency: type,
    style: "currency"
  });
  return formatter.format(value);
}

async function getConvertedValue(apiCurrency, amount) {
  let url =
    "https://free.currconv.com/api/v7/convert?q=" +
    apiCurrency +
    "&compact=ultra&apiKey=8cc0cdd2fa20cf1364ae";
  let jsonObject = await fetch(url);
  let result = await jsonObject.json();
  console.log(apiCurrency, result);

  return result[apiCurrency] * amount;
}

async function convertCurrency() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let apiCurrency = (from + "_" + to).toUpperCase();
  let amount = document.getElementById("value").value;

  const convertedRate = await getConvertedValue(apiCurrency, amount);
  document.getElementById("result").innerHTML = formatCurrency(
    to,
    convertedRate
  );
  changeToCoins(convertedRate);
}

let coins = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000];
let money = [];

function changeToCoins(amount) {
  // let amount = document.getElementById("value").value;
  for (let i = 0; i < coins.length; i++) {
    let currentAmount = coins[i];
    money[i] = Math.floor(amount / currentAmount);
    if (money[i] > 0) {
      amount = amount - currentAmount * money[i];
    }
  }

  let coinsMessage = "";

  for (let i = 0; i < money.length; i++) {
    coinsMessage += `<li>${coins[i]} * ${money[i]}</li>`;
  }
  console.log(coinsMessage);
  document.getElementById("notes").innerHTML = coinsMessage;
}
