export const getTheme = (type: 'white' | 'black') => {
  if (type === 'white') {
    return {
      income: 'rgb(14, 187, 172)',
      incomeOverlay: 'rgb(20, 163, 151)',
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

export default getTheme;
export type Theme = typeof getTheme;
