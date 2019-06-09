const {convertValute} = require('../js/index_bundle');

const input = document.querySelector('#value');
const valuteSelect = document.querySelector('#valute');
const output = document.querySelector('#new_value');
let valute = {};

function getValuteData() {
    const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
    const headers = {
        method: 'GET',
        mode: 'cors'
    }

    return fetch(URL, headers)
            .then(res => res.json())
            .then(data => data.Valute)
            .then(valute => valute)
            .catch(err => console.log(err));
}

async function createOptions() {
    valute = await getValuteData();
    // let selectInnerHtml = '';

    for (key in valute) {
        // const newStr = `<option title=${valute[key].Name}>${valute[key].CharCode}</option>`;
        const option = document.createElement('option');
        option.setAttribute('title', valute[key].Name);
        option.innerHTML = valute[key].CharCode

        valuteSelect.appendChild(option);
        // selectInnerHtml = selectInnerHtml + newStr;
    }
};

createOptions();

input.addEventListener('input', function(e) {
    const value = this.value;
    const valuteCode = valuteSelect.value
    const outputValue = convertValute(value, valute[valuteCode].Nominal, valute[valuteCode].Value);
    
    output.value = outputValue;
});

valuteSelect.addEventListener('change', function(e) {
    const valuteCode = this.value;
    const value = input.value;
    if (value === '') return;
    const outputValue = convertValute(value, valute[valuteCode].Nominal, valute[valuteCode].Value);

    output.value = outputValue;
})

