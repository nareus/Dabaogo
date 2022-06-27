import React, {Fragment, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Padding from '../../components/atoms/Padding';
import TransporterConfirmBottom from '../../components/molecules/TransporterConfirmBottom';
import {BACKGROUND_COLOR} from '../../styles/colors';
import TransporterOrderCard from '../../components/atoms/TransporterOrderCard';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import TransporterOrderProgress from '../../components/molecules/TransporterOrderProgress';
import TopBarOrder from '../../components/molecules/TopBarOrder';

// interface IData {
//   items: IItem[],
//   subtotal: number,
//   deliveryFee: number,
//   serviceFee: number,
// }

// interface IItem {
//     quantity: number,
//     name: string,
//     price: number,
// }

const TransporterOrder = props => {
  // console.log(props.route.params);

  const [buttonTitle, setButtonTitle] = useState('Confirm');
  const [count, setCount] = useState(1);
  const [stage, setStage] = useState([false, false, false, false]);
  const [currentStatus, setCurrentStatus] = useState('Waiting for Orders');
  const [pulseState] = useState([true, false, false, false, false]);

  const handlePress = async () => {
    if (count <= 5) {
      setCount(count + 1);
      const newStage = [false, false, false, false];
      for (let i = 0; i < count; i = i + 1) {
        newStage[i] = true;
      }
      setStage(newStage);
      await axios.put(`${BACKEND_URL}/orders`, {
        stage: newStage,
        orderId: 13,
      });
      if (count === 1) {
        setButtonTitle('Reached Outlet');
        setCurrentStatus('On the way there');
      }
      if (count === 2) {
        setButtonTitle('Picked Up Food');
        setCurrentStatus('Waiting for food');
      }
      if (count === 3) {
        setButtonTitle('Delivered');
        setCurrentStatus('On the way back');
      }
      if (count === 4) {
        setButtonTitle('Done');
        setCurrentStatus('Food has been delivered!');
      }
      if (count === 5) {
        props.navigation.navigate('Home');
      }
      //console.log(response)
    }
  };

  /*
    Current status includes
    1. Finding food transporter
    2. on the way there
    3. waiting for food
    4. on the way back
    5. Food has been delivered!
    6. Done // this is a dummy, to stop delivered from flashing
    */

  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeAreaView}>
        <ScrollView style={styles.container} scrollToOverflowEnabled={false}>
          <Text style={styles.header}>Transporter Status</Text>
          <Padding />
          <TransporterOrderProgress
            isDone={stage}
            currentStatus={currentStatus}
            pulseState={pulseState}
          />
          <Padding />
          <TransporterOrderCard
            location={'Tembusu College'}
            orders={'1x Chicken Chop Rice'}
            price={'$5.50'}
          />
          <Padding />
          <TransporterOrderCard
            location={'Tembusu College'}
            orders={'2x Vinegar Beef Noodles (Dry)'}
            price={'$11.00'}
          />
          <Padding />
          <TransporterOrderCard
            location={'Tembusu College'}
            orders={'1x Chili Oil Chive Dumplings (6 pcs)'}
            price={'$3.90'}
          />
          <Padding />
        </ScrollView>
        <TransporterConfirmBottom
          price={'20.40'}
          onPress={handlePress}
          buttonTitle={buttonTitle}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeAreaView} />
      <TopBarOrder
        onPress={() => props.navigation.goBack()}
        text={'Transport Status'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topSafeAreaView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  bottomSafeAreaView: {
    flex: 0,
    backgroundColor: 'white',
  },
  bigContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default TransporterOrder;
