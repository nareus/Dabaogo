import * as React from 'react';
import {View} from 'react-native';
import Logo from '../../components/atoms/Logo';
import SignInUpButton from '../../components/atoms/SignInUpButton';
import {
  BUTTON_BACKGROUND_1,
  BACKGROUND_COLOR,
  BUTTON_TEXT_1,
  PRIMARY,
} from '../../styles/colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleAuthState} from '../../redux/action/AuthActions';

function LandingScreen(props) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{alignSelf: 'center', paddingTop: 150}}>
        <Logo text={'DABAOGO'} />
      </View>
      <View style={{marginTop: '120%'}}></View>
      <View style={{alignSelf: 'center', width: '80%'}}>
        <SignInUpButton
          onPress={() => {
            props.navigation.navigate('Auth');
            props.toggleAuthState(false);
          }}
          title={'Sign Up'}
          backgroundColor={PRIMARY}
          color={BACKGROUND_COLOR}
        />
        <View style={{padding: 8}}></View>
        <SignInUpButton
          onPress={() => {
            props.navigation.navigate('Auth');
            props.toggleAuthState(true);
          }}
          title={'Sign In'}
          backgroundColor={BUTTON_BACKGROUND_1}
          color={BUTTON_TEXT_1}
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  const {auth} = state;
  return {auth};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleAuthState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
