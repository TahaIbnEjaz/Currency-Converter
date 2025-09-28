const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const API = "https://v6.exchangerate-api.com/v6/fca359387640cfca09b751ab/latest";

const dropdown = document.querySelectorAll(".dropdown select");

let btn = document.querySelector(".convert-btn");

let from_Currency = document.querySelector(".from select");
let to_Currency = document.querySelector(".to select");

let msg = document.querySelector(".msg");

let inverse = document.querySelector("i");

for(let select of dropdown){
    for (code in countryList){
        let options = document.createElement("option");
        options.innerText = code;
        options.value = code;

        if(select.name === "from" && code === "USD"){
            options.selected = "selected";
        }
        else if(select.name === "to" && code === "PKR"){
            options.selected = "selected";
        }
        select.append(options);
    }

    select.addEventListener("change" , (event) =>{
        updateFlag(event.target);
    })
}

const updateFlag = (element) =>{
    let currency_code = element.value;
    let countryCode = countryList[currency_code];
    let new_scr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = new_scr;
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector("input")
    let amtValue = amount.value;

    if(amtValue == "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `${API}/${from_Currency.value}`;
    let response = await fetch(URL);
    let Api_object = await response.json();
    let data = Api_object.conversion_rates;
    let rate = data[to_Currency.value];

    let final_amount = amtValue * rate;
    msg.innerText = `${amtValue} ${from_Currency.value} = ${final_amount} ${to_Currency.value}`;
}

inverse.addEventListener("click", (evt) =>{
    let temp = to_Currency.value;
    to_Currency.value = from_Currency.value;
    from_Currency.value = temp;

    let from_img = document.querySelector(".from img");
    currency_code  = from_Currency.value;
    code_1 = countryList[currency_code];
    from_img.src = `https://flagsapi.com/${code_1}/flat/64.png`;

    let to_img = document.querySelector(".to img");
    currency_code = to_Currency.value;
    code = countryList[currency_code];
    to_img.src = `https://flagsapi.com/${code}/flat/64.png`;
    
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    evt.preventDefault();
  updateExchangeRate();
});