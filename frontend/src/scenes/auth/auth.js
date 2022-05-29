import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import TopBar from '../../components/molecules/TopBar';
import SignInForm from '../../components/organisms/SignInForm';
import SignUpForm from '../../components/organisms/SignUpForm';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import {toggleAuthState} from '../../redux/action/AuthActions';

const AuthScreen = props => {
  return (
    <SafeAreaView style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
      <TopBar
        selectionState={props.auth}
        onPress={() => props.navigation.navigate('Landing')}
        onSignInPress={() => props.toggleAuthState(true)}
        onSignUpPress={() => props.toggleAuthState(false)}
      />
      {props.auth ? (
        <SignInForm navigate={() => props.navigation.navigate('Home')} />
      ) : (
        <SignUpForm navigate={() => props.navigation.navigate('Home')} />
      )}
    </SafeAreaView>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
