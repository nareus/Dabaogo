import * as React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import { Text } from 'react-native-elements';
import {PRIMARY, SECONDARY} from '../../styles/colors';
import Toggle from '../../components/atoms/Toggle';
//import RestaurantCard from '../../components/atoms/RestaurantCard';

// const HomeScreen = props => {
//   return (
//     <SafeAreaView style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
//       <TopBarHome
//         selectionState={props.auth}
//         onPress={() => props.navigation.navigate('Landing')}
//         onSignInPress={() => props.toggleAuthState(true)}
//         onSignUpPress={() => props.toggleAuthState(false)}
//       />
//     </SafeAreaView>
//   );
// };

// const mapStateToProps = state => {
//   const {auth} = state;
//   return {auth};
// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       toggleAuthState,
//     },
//     dispatch,
//   );
const HomeScreen = () => {
  return (
    <View>
      <Toggle
        initialState={false}
        onSignInPress={() => {}}
        onSignUpPress={() => {}}
        selectionColor={PRIMARY}
        unselectionColor={SECONDARY}
        leftContent = {"Available Restaurants"}
        rightContent = {"Be a Transporter"} 
        height = {350}
        width = {50}
      />
      </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    // alignSelf: 'stretch',
    height: 40,
    // paddingBottom: 60,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    // paddingLeft: 10,
    // paddingRight: 10
  },
});

export default HomeScreen;