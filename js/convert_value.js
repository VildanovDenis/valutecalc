const convertValute = (value, valuteNominal, valuteValue) => {
    const converted = (value * valuteNominal / valuteValue).toFixed(2);
    if (isNaN(converted)) {
        return 'Введите корректное значeние'
    }
    return (value * valuteNominal / valuteValue).toFixed(2);
}

module.exports = { convertValute };