export const formatAmount = (value: number) => {
  const head = (value + '').split('');
  const tails: string[] = [];

  for (let i = head.length; i > 3; i -= 3) {
    const index = head.length - 3;
    const tail = head.splice(index, 3).join('');
    tails.push(tail);
  }

  return `${head.join('')},${tails.reverse().join(',')}.00`;
};

export const capitalize = (value: string) => {
  let [fChar, ...oChars] = value.split('');
  return fChar.toUpperCase() + oChars.join('');
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
