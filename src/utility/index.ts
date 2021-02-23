import getTheme from './theme';

export { getTheme };

export const clone = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export const calcPercent = (value: number, total: number) =>
  Math.round((value / total) * 100);

export const formatAmount = (value: number) => {
  const head = (value + '').split('');
  const tails: string[] = [];

  for (let i = head.length; i > 3; i -= 3) {
    const index = head.length - 3;
    const tail = head.splice(index, 3).join('');
    tails.push(tail);
  }

  if (tails.length === 0) return `${head.join('')}.00`;
  return `${head.join('')},${tails.reverse().join(',')}.00`;
};

export const capitalize = (value: string) => {
  let [fChar, ...oChars] = value.split('');
  return fChar.toUpperCase() + oChars.join('');
};
