require("regenerator-runtime/runtime");
const { convertValute } = require('../js/convert_value');

const input = document.querySelector('#value');
const valuteSelect = document.querySelector('#valute');
const output = document.querySelector('#new_value');
let valute = {};
let valuteDb;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

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

    const request = indexedDB.open('valutes', 1);

    request.onerror = function(e) {
        console.log('error: ', e.target.error.name);
    }

    request.onupgradeneeded = function(e) {
        valuteDb = e.target.result;

        const objectStore = valuteDb.createObjectStore('valutes', {keyPath: 'Name'});

        for (let key in valute) {
            objectStore.add(valute[key]);
        }
    }

    for (let key in valute) {
        const option = document.createElement('option');
        option.setAttribute('title', valute[key].Name);
        option.innerHTML = valute[key].CharCode

        valuteSelect.appendChild(option);
    }
};

createOptions();

input.addEventListener('input', function(e) {
    const value = this.value;
    const valuteCode = valuteSelect.value;

    const nominal = valuteDb.transaction("valutes").objectStore("valutes").get(value).onsuccess = function(e) {
        return e.target.result
    };

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
