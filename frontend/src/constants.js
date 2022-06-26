export const convertToMoney = price => {
  return (
    '$' +
    (price - Math.floor(price) === 0
      ? price + '.00'
      : price - Math.floor(price) > 0
      ? price + '0'
      : price)
  );
};
