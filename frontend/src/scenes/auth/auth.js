import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import TopBarAuth from '../../components/molecules/TopBarAuth';
import SignInForm from '../../components/organisms/SignInForm';
import SignUpForm from '../../components/organisms/SignUpForm';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import {toggleAuthState} from '../../redux/action/AuthActions';
import {StyleSheet} from 'react-native';

const AuthScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBarAuth
        selectionState={props.auth}
        onPress={() => props.navigation.navigate('Landing')}
        onSignInPress={() => props.toggleAuthState(true)}
        onSignUpPress={() => props.toggleAuthState(false)}
      />
      {props.auth ? (
        <SignInForm
          navigate={id =>
            props.navigation.navigate('Home', {
              id: id,
            })
          }
        />
      ) : (
        <SignUpForm
          navigate={id =>
            props.navigation.navigate('Home', {
              id: id,
            })
          }
        />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
