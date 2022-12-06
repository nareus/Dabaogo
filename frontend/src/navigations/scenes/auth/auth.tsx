import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import TopBarAuth from '../../../components/molecules/bar/TopBarAuth';
import SignInForm from '../../../components/organisms/SignInForm';
import SignUpForm from '../../../components/organisms/SignUpForm';
import {BACKGROUND_COLOR} from '../../../styles/colors';
import {toggleAuthState} from '../../../redux/authSlice';
import {StyleSheet} from 'react-native';
import {RootState} from '../../../redux';

const AuthScreen = (props: any) => {
  const dispatch = useDispatch();
  const {toggleState} = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <TopBarAuth
        selectionState={toggleState}
        onPress={() => props.navigation.navigate('Landing')}
        onSignInPress={() => dispatch(toggleAuthState(true))}
        onSignUpPress={() => dispatch(toggleAuthState(false))}
      />
      {toggleState ? (
        <SignInForm navigate={() => props.navigation.navigate('Home')} />
      ) : (
        <SignUpForm navigate={() => props.navigation.navigate('Home')} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default AuthScreen;
