let uncommons = 6;
let rares = 6;
let inputs;
let prices;
let lastKeys = [];
window.onload = init;

function init() {
    inputs = document.getElementsByTagName("input");
    prices = [];
    for(let i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("change", update); 
    }
    window.addEventListener("keypress", function(e) {
	easterEgg(e);
    });
}

function easterEgg(e) {
    lastKeys.push(String.fromCharCode(e.keyCode));
    if(lastKeys.length == 7) {
	lastKeys.shift();
    }
    if(lastKeys.join("") == "ahlolo") {
	document.body.style.backgroundImage = "url('https://pbs.twimg.com/profile_images/626044756829859840/F-tLUnQH_400x400.jpg')";
    }
}

function update() {
    getPrices();
    let values = calculateValues();
    document.getElementById("pyrite-result").innerHTML = (Math.round(values.pyriteValue * 400) / 100).toFixed(2) + " gold";
    document.getElementById("elementium-result").innerHTML = (Math.round(values.elementiumValue * 400) / 100).toFixed(2) + " gold";
}

function getPrices() {
    for(let i = 0; i < inputs.length; i++) {
	prices[i] = inputs[i].value;
	console.log(prices);
    }
    console.log(prices);
    return prices;
}

function calculateValues() {
    returnObject = {
	"pyriteValue": 0,
	"elementiumValue": 0
    };
    for(let i = 1; i <= uncommons; i++) {
	if(prices[i] == "") {
	    returnObject.pyriteValue = -1;
	    returnObject.elementiumValue = -1;
	    return returnObject;
	} else {
	    returnObject.pyriteValue += 0.17*prices[i];
	    returnObject.elementiumValue += 0.18*prices[i];
	}
    }
    for(let i = uncommons + 1; i < prices.length; i++) {
	if(prices[i] == "") {
	    returnObject.pyriteValue = -1;
	    returnObject.elementiumValue = -1;
	    return returnObject;
	} else {
	    returnObject.pyriteValue += 0.07*prices[i];
	    returnObject.elementiumValue += 0.04*prices[i];
	}
    }
    if(prices[0] == "") {
	returnObject.pyriteValue = -1;
    } else {
	returnObject.pyriteValue += 2*prices[0];
    }
    return returnObject;
}
