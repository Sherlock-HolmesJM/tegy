export const formatAmount = (value: number, type: '+' | '-') => {
  const head = (value + '').split('');
  const tail: string[] = [];

  for (let i = 0; i < head.length; i += 3) {
    const index = head.length - 3;
    const pt = head.splice(index, 3).join('');
    tail.push(pt);
  }

  return `${type} ${head.join('')},${tail.join(',')}.00`;
};

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
