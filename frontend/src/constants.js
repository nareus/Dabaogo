export const convertToMoney = price => {
  price = Math.round((price + Number.EPSILON) * 100) / 100;
  return (
    '$' +
    (price - Math.floor(price) === 0
      ? price + '.00'
      : price - Math.floor(price) > 0
      ? price + '0'
      : price)
  );
};

export const convertToQuantity = items => {
  const output = {};
  for (const item of items) {
    if (typeof output[item.foodId] === 'undefined') {
      output[item.foodId] = {
        quantity: 1,
        name: item.name,
        price: item.price,
        foodId: item.foodIid,
      };
    } else {
      output[item.foodId].quantity++;
    }
  }
  return Object.values(output);
};
