console.log('JS is loaded')
let currencies = [
    {name:'USD', symbol:'$', height:'0%'},
    {name:'EUR', symbol:'€', height:'0%'},
    {name:'JPY', symbol:'¥', height:'0%'},
    {name:'GBP', symbol:'£', height:'0%'},
    {name:'AUD', symbol:'$', height:'0%'},
]

document.addEventListener("DOMContentLoaded", function() {
    currency_selector();
  });

function currency_selector() {
    active_class_changer()
    let btnContainer = document.getElementById('btnContainer');
    let btn = btnContainer.getElementsByClassName('Search-area-text active'); 
    console.log('the active button is: ', btn) 
    base = btn[0].textContent
    console.log('the currency collected is: ', base)
    currency_plotter(base)

}

function active_class_changer() {
    let btnContainer = document.getElementById('btnContainer');
    let btns = btnContainer.getElementsByClassName('Search-area-text');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        // If there's no active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        // Add the active class to the current/clicked button
        this.className += " active";
        });
    }
}


function currency_plotter(base) {
    console.log('Currency plotter called');
    console.log('The base value is', base);
    fetch('https://api.exchangerate.host/latest?base='+base)
    .then(response => response.json())
    .then(data => {
        console.log("response:", data.rates)
        let USD = data.rates.USD
        console.log('the conversion rate to usd is: ', USD)
        create_bars(data, base, currencies)
    });

}

function create_bars(data, base, currencies) {
    console.log('Create Bars for Bar Chart function called')
    console.log('data is', data.rates)
    console.log('the base is:', base)
    console.log('curriencies object: ', currencies)
    currency_filter(currencies, base)
    // Clearing Chart so divs dont overflow the container
    let bar = document.getElementById("chart");
    bar.innerHTML=``;

    for (let currency of currencies) {
        console.log('the currency is:',currency.name)
        let ex_rate = data.rates[currency.name]
        bar_heights(ex_rate, currency)
        bar.innerHTML += `
        <div class="BarChart-bar" style="height: ${currency.height};" 
        onClick="alert('1 ${base} is worth ${ex_rate} ${currency.name}')">${currency.name}  ${currency.symbol}</div>
        `; 
    }
}

function currency_filter(currencies, base) {
    console.log('--------------')
    console.log('using the currency filter function')
    // Sorting curriencies array so the selected currency is first
    let base_index = currencies.findIndex(object => {
        return object.name === base;
    });

    let element = currencies.splice(base_index,1)[0];
    console.log('the base object is: ', element);
    currencies.splice(0,0,element);
    console.log('the filtered list is: ', currencies)


}

function bar_heights(ex_rate, currency) {
    console.log('Calculating hegiht function')
    if (currency.name === base) {
        currency.height = '50%'
    };
    // setting scale factors for bar height depending on the exchange rate
    // Finding pergentage difference between rates and using if tree to determine height
    height = ((Math.abs(ex_rate - 1)) / ((ex_rate + 1)/2))*100;
    // Making difference positive/negative so height can the difference can be accurtatly reflected
    if (ex_rate < 1){
        height = height*-1
    };
    height = height + 50;
    // if tree to scale extreme values or ones close to the base currency
    // for visual clarity
    if (height === 50) {
        currency.height = '50%'
    } else if (height > 95) {
        currency.height = '90%';
    } else if (height > 80) {
        currency.height = '70%';
    } else if (height > 55) {
        currency.height = height.toString() + '%';
    } else if (height > 50) { 
        currency.height = '55%';
    } else if (height > 45) {
        currency.height = '45%';
    } else if (height > 20) {
        currency.height = height.toString() + '%'; 
    } else {
        currency.height = '20%' 
    }
    }
