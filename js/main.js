console.log('JS is loaded')
let currencies = [
    {name:'USD', symbol:'$', height:'0%'},
    {name:'EUR', symbol:'€', height:'0%'},
    {name:'JPY', symbol:'¥', height:'0%'},
    {name:'GBP', symbol:'£', height:'0%'},
    {name:'AUD', symbol:'$', height:'0%'},
]

let base = 'USD'
function usd() {
    console.log('USD function selected');
    let usd = document.getElementById('usd');
    console.log('verifying usd selected', usd.textContent)
    base = 'USD'
    currency_plotter(base)
}

function eur() {
    console.log('eur function selected');
    let eur = document.getElementById('eur');
    console.log('verifying eur selected', eur.textContent);
    base = 'EUR';
    currency_plotter(base)
}

function yen() {
    console.log('eur function selected');
    let yen = document.getElementById('yen');
    console.log('verifying eur selected', yen.textContent);
    base = 'YEN';
    currency_plotter(base)
}

function gbp() {
    console.log('eur function selected');
    let gbp = document.getElementById('gbp');
    console.log('verifying eur selected', gbp.textContent);
    base = 'GBP';
    currency_plotter(base)
}

function aud() {
    console.log('eur function selected');
    let aud = document.getElementById('aud');
    console.log('verifying eur selected', aud.textContent);
    base = 'AUD';
    currency_plotter(base)
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
        console.log('The currency is ', currency.name, ' the ex rate is ', ex_rate)
        console.log('Create bars currency height : ', currency.height)
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
    console.log('the exchange rate is: ',ex_rate)
    if (currency.name === base) {
        currency.height = '50%'
        console.log('base height', currency.height)
    };
    // setting scale factors for bar height depending on the exchange rate
    // Finding pergentage difference between rates and using if tree to determine height
    height = ((Math.abs(ex_rate - 1)) / ((ex_rate + 1)/2))*100;
    // Making difference positive/negative so height can the difference can be accurtatly reflected
    if (ex_rate < 1){
        height = height*-1
    };
    height = height + 50;
    console.log('the height percentage is', height)
    // if tree to scale extreme values or ones close to the base currency
    // for visual clarity
    if (height === 50) {
        currency.height = '50%'
    } else if (height > 95) {
        currency.height = '90%';
        console.log('the height is',currency.height);
    } else if (height > 80) {
        currency.height = '70%';
        console.log('the height is',currency.height);
    } else if (height > 55) {
        currency.height = height.toString() + '%';
        console.log('the height is',currency.height);
    } else if (height > 50) { 
        currency.height = '55%';
        console.log('the height is',currency.height);
    } else if (height > 45) {
        currency.height = '45%'
        console.log('the height is',currency.height);
    } else if (height > 20) {
        currency.height = height.toString() + '%';
        console.log('the height is',currency.height); 
    } else {
        currency.height = '20%'
        console.log('the height is',currency.height);
    }
    
    console.log(currency.name,' height ', currency.height)

    }
