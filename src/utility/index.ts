export const capitalize = (value: string) => {
  let [fChar, ...oChars] = value.split('');
  fChar = fChar.toUpperCase();
  return fChar + oChars.join('');
};

export const theme = (type: 'white' | 'black') => {
  if (type === 'white') {
    return {
      income: 'rgb(13, 221, 13)',
      incomeOverlay: 'rgb(29, 194, 29)',
      expense: '',
      expenseOverlay: '',
    };
  }

  return {
    income: 'rgb(13, 221, 13)',
    incomeOverlay: 'rgb(29, 194, 29)',
    expense: '',
    expenseOverlay: '',
  };
};
