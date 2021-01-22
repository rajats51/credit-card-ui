// To attach multiple events
function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (let i=0, iLen=events.length; i<iLen; i++) {
        element.addEventListener(events[i], listener, true);
    }
}

const isValidCardNumber = (e) => {
    if (/\D/.test(e.key) || e.target.value.length === 19) {
        e.preventDefault();
        return false;
    }
}
const isValidExpNumber = (e) => {
    const val = e.target.value.replace('/', '');
    if (/\D/.test(e.key) || val.length >= 4) {
        e.preventDefault();
        return false;
    }
    const eleVal = val + e.key;
    const month = eleVal.substr(0,2);
    const year = eleVal.substr(2,4);
    var currMonth = (new Date()).getMonth() + 1;
    const currYear = (new Date()).getFullYear().toString().substr(2,2)
    if (month.length === 2 && (parseInt(month) === 0 || parseInt(month) >12 || parseInt(month) < currMonth)) {
        e.preventDefault();
        return false;
    } else if (year && (parseInt(year) === 0 || (year.length === 1 && parseInt(year) < currYear.substr(0,1)) || (year.length === 2 && parseInt(year) < currYear))) {
        e.preventDefault();
        return false
    }
}

const cardNumberChange = (e) => {
    const currentEle = e.target;
    const eleVal = currentEle.value.split(' ').join('');
    const newVal = eleVal.replace(/(.{4})/g,"$1 ");
    currentEle.value = newVal.trim();
    let card_number = "";
    let dotsVal = "";
    for (var i=0; i < 16-eleVal.length; i++) {
        dotsVal += "*";
    }
    card_number += eleVal + dotsVal + " ";
    card_number = card_number.replace(/(.{4})/g,"$1 ");
    const ccNumber = document.querySelector('.credit-card-box .number');
    ccNumber.innerHTML = card_number;
}

const expiryChange = (e) => {
    const currentEle = e.target;
    const eleVal = currentEle.value.replace('/', '').split('/').join('');
    const newVal = eleVal.replace(/(.{2})/g,"$1/");
    currentEle.value = newVal.replace(/\/$/, '').trim();
    let expOnCard = "";
    let dotsVal = "";
    console.log(currentEle.value);
    for (var i=0; i < 5-currentEle.value.length; i++) {
        dotsVal += "*";
    }
    expOnCard += currentEle.value + dotsVal;
    expOnCard = expOnCard.replace('/', '').replace(/(.{2})/g,"$1/").substr(0,5);
    const expOnCardEle = document.querySelector('.exp-display');
    expOnCardEle.innerHTML = expOnCard;
}

const onCvvFocus = (e) => {
    const cardSelector = document.querySelector('.credit-card-box');
    if (cardSelector.classList && !cardSelector.classList.contains('hover')) {
        cardSelector.classList.add("hover");
    }
}

const onCvvInput = (e) => {
    if (/\D/.test(e.key)) {
        e.preventDefault();
        return false;
    }
}

const onCvvBlur = (e) => {
    const cardSelector = document.querySelector('.credit-card-box');
    if (cardSelector.classList && cardSelector.classList.contains('hover')) {
        cardSelector.classList.remove("hover");
    }
}

const cvvChange = (e) => {
    const cardCVVDisplay = document.querySelector('.cvc-display');
    cardCVVDisplay.innerHTML = e.target.value;
}

const onCardHolderInput = (e) => {
    if (!(/^[A-Za-z ]+$/.test(e.key))) {
        e.preventDefault();
        return false;
    }
}

const onCardHolderChange = (e) => {
    const cardHolderName = document.querySelector('.card-holder-name');
    cardHolderName.innerHTML = e.target.value.trim() || 'YOUR NAME HERE';
}

const onCardEleFocus = (e) => {
    const ele = e.target;
    const targetClass = ele.dataset.target;
    if (targetClass) {
        const targetEle = document.querySelector(`.${targetClass}`);
        targetEle.classList.add('focussed');
    }
}

const onCardEleBlur = (e) => {
    const ele = e.target;
    const targetClass = ele.dataset.target;
    if (targetClass) {
        const targetEle = document.querySelector(`.${targetClass}`);
        targetEle.classList.remove('focussed');
    }
}

(function () {
    const inputCardNumber = document.querySelector('.input-card-number');
    const inputExpiry = document.querySelector('.card-expiry-date-input');
    const cardCVV = document.querySelector('.card-cvc');
    const cardHolderInput = document.querySelector('.card-holder-input');
    addListenerMulti(inputCardNumber, 'keypress', isValidCardNumber);
    addListenerMulti(inputCardNumber, 'keyup change', cardNumberChange);
    addListenerMulti(inputCardNumber, 'focus', onCardEleFocus);
    addListenerMulti(inputCardNumber, 'blur', onCardEleBlur);
    addListenerMulti(inputExpiry, 'keypress', isValidExpNumber);
    addListenerMulti(inputExpiry, 'keyup change', expiryChange);
    addListenerMulti(inputExpiry, 'focus', onCardEleFocus);
    addListenerMulti(inputExpiry, 'blur', onCardEleBlur);
    addListenerMulti(cardCVV, 'focus', onCvvFocus);
    addListenerMulti(cardCVV, 'keypress', onCvvInput);
    addListenerMulti(cardCVV, 'blur', onCvvBlur);
    addListenerMulti(cardCVV, 'keyup change', cvvChange);
    addListenerMulti(cardHolderInput, 'keypress', onCardHolderInput);
    addListenerMulti(cardHolderInput, 'keyup change', onCardHolderChange);
    addListenerMulti(cardHolderInput, 'blur', onCardEleBlur);
    addListenerMulti(cardHolderInput, 'focus', onCardEleFocus);
}());