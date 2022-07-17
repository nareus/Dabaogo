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

export const hostelData = [
  {
    title: 'Eusoff Hall',
    latitute: 1.2939743949678424,
    longitude: 103.7704899419,
  },
  {
    title: 'Kent Ridge Hall',
    latitute: 1.2920894517736832,
    longitude: 103.77559431805774,
  },
  {
    title: 'King Edward VII Hall',
    latitute: 1.2925745167614702,
    longitude: 103.78113967073556,
  },
  {
    title: 'Raffles Hall',
    latitute: 1.3002499944578878,
    longitude: 103.77397192655792,
  },
  {
    title: 'Sheares Hall',
    latitute: 1.2915980279369916,
    longitude: 103.77579268607768,
  },
  {
    title: 'Temasek Hall',
    latitute: 1.2930439689385727,
    longitude: 103.77145191306441,
  },
  {
    title: 'Ridge View Residential College',
    latitute: 1.2977337468324195,
    longitude: 103.77717421306438,
  },
  {
    title: 'College of Alice & Peter Tan',
    latitute: 1.3081012979796212,
    longitude: 103.77328508422882,
  },
  {
    title: 'Residential College 4',
    latitute: 1.3084155156728083,
    longitude: 103.77346104189996,
  },
  {
    title: 'Tembusu College',
    latitute: 1.3061184460772353,
    longitude: 103.77391144189991,
  },
  {
    title: 'Cinammon Wing & West Wing (NUS College)',
    latitute: 1.3068290157977014,
    longitude: 103.773578847907,
  },
  {
    title: 'UTown Residence',
    latitute: 1.305281951579697,
    longitude: 103.77391913858493,
  },
  {
    title: "Prince George's Park Residence",
    latitute: 1.2912783935983603,
    longitude: 103.78002526439816,
  },
];
