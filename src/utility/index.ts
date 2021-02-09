export const capitalize = (value: string) => {
  let [fChar, ...oChars] = value.split('');
  fChar = fChar.toUpperCase();
  return fChar + oChars.join('');
};

export const getTheme = (type: 'white' | 'black') => {
  if (type === 'white') {
    return {
      income: 'rgb(13, 221, 13)',
      incomeOverlay: 'rgb(29, 194, 29)',
      expense: 'red',
      expenseOverlay: '',
      transparentGray: 'rgb(0, 0, 0, 0.1)',
    };
  }

  return {
    income: 'rgb(13, 221, 13)',
    incomeOverlay: 'rgb(29, 194, 29)',
    expense: '',
    expenseOverlay: '',
    transparentGray: 'rgb(0, 0, 0, 0.1)',
  };
};
