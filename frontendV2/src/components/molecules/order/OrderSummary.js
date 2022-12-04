import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { convertToMoney } from '../../../constants';
import { PRIMARY } from '../../../styles/colors';
import { BORDER_RADIUS } from '../../../styles/mixins';
import { PADDING_LEFT } from '../../../styles/spacing';

// interface IItem {
//     quantity: number,
//     name: string,
//     price: number,
// }

// interface IData {
//   items: IItem[],
//   subtotal: number,
//   deliveryFee: number,
//   serviceFee: number,
// }

const OrderRow = ({ item }) => {
  return (
    <View style={styles.orderRow}>
      <View style={styles.orderRow}>
        <Text style={styles.text}>{item.quantity}x </Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <Text style={styles.text}>{convertToMoney(item.price)}</Text>
    </View>
  );
};

const BottomDetails = ({ name, price }) => {
  return (
    <View style={styles.orderRow}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{convertToMoney(price)}</Text>
    </View>
  );
};

const OrderSummary = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        {data.items.map((item, index) => {
          return <OrderRow item={item} key={index} />;
        })}
      </View>
      <BottomDetails name="Subtotal" price={data.subtotal} />
      <BottomDetails
        name="Delivery Fee"
        price={data.items.length * data.deliveryFee}
      />
      <BottomDetails name="Service Fee" price={data.serviceFee} />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  topHalf: {
    paddingBottom: 20
  },
  container: {
    padding: PADDING_LEFT,
    backgroundColor: PRIMARY,
    borderRadius: BORDER_RADIUS
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    // padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});
export default OrderSummary;
