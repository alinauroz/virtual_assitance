const formatNumber = number => {
    if (! isNaN(number[0])) {
        return '+' + number;
    }
    else if (/whatsapp/.test(number)){
        return number.substr(9, number.length);
    }
    else {
        return number;
    }
} 

module.exports = formatNumber;