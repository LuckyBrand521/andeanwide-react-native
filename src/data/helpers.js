export const numberWithCommas = x => {
  return x
    .toString()
    .replace(/\./g, ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export const validateCurrency = number => {
  const last = number[number.length - 1];
  if (last == ',' || Number(last) >= 0) {
    if (number == 'NaN' + last) {
      return last;
    }
    let str = '';
    number.split('.').map(item => {
      str += item;
    });
    let float_num = parseFloat(str.replace(/,/g, '.')).toLocaleString();
    //float_num.replace(/\./g, '#');
    str = float_num.replace(/\./g, '#');
    str = str.replace(/,/g, '.').replace(/#/g, ',');

    return str;
  } else {
    return number.slice(0, number.length - 1);
  }
};

export const getFloatFromString = number => {
  number = number.replace(/\./g, '').replace(/,/g, '.');
  return parseFloat(number);
};
