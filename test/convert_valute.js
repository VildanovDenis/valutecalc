const assert = require('assert');
const { convertValute } = require('../js/convert_value');

describe('Вызов функции с нечисловыми значениями', () => {
    it('', () => {
        const expectedValue = 'Введите корректное значeние';
        const actualValue = convertValute(null, '123', {});

        assert.equal(actualValue, expectedValue);
    });
    it('', () => {
        const expectedValue = 'Введите корректное значeние';
        const actualValue = convertValute([], {}, {});

        assert.equal(actualValue, expectedValue);
    });
});

describe('Вызов функции с численными значениями', () => {
    it('', () => {
        const expectedValue = 240.00;
        const actualValue = convertValute(120, 100, 50);

        assert.equal(actualValue, expectedValue);
    });
    it('', () => {
        const expectedValue = 100.00;
        const actualValue = convertValute(1300, 1, 13);

        assert.equal(actualValue, expectedValue);
    });
    it('', () => {
        const expectedValue = 100.00;
        const actualValue = convertValute('1300', '1', '13');

        assert.equal(actualValue, expectedValue);
    });
    it('', () => {
        const expectedValue = 96.30;
        const actualValue = convertValute('1300', '1', '13.5');

        assert.equal(actualValue, expectedValue);
    });
    it('', () => {
        const expectedValue = 97.38;
        const actualValue = convertValute('1355.51', '1', '13.92');

        assert.equal(actualValue, expectedValue);
    });
});