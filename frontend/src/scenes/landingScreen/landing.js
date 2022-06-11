import * as React from 'react';
import {StyleSheet, View} from 'react-native';
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
    <View style={styles.fullScreenContainer}>
      <View style={styles.logoView}>
        <Logo text={'DABAOGO'} />
      </View>
      <View style={styles.marginBtwnLogoAndButton} />
      <View style={styles.signUpInContainer}>
        <SignInUpButton
          onPress={() => {
            props.navigation.navigate('Auth');
            props.toggleAuthState(false);
          }}
          title={'Sign Up'}
          backgroundColor={PRIMARY}
          color={BACKGROUND_COLOR}
        />
        <View style={styles.paddingBtwnSignInAndUp} />
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

const styles = StyleSheet.create({
  fullScreenContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  logoView: {
    alignSelf: 'center',
    paddingTop: 150,
  },
  marginBtwnLogoAndButton: {
    marginTop: '120%',
  },
  signUpInContainer: {
    alignSelf: 'center',
    width: '80%',
  },
  paddingBtwnSignInAndUp: {
    padding: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
