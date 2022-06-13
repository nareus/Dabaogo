import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '@rneui/themed';
import {FORM_GAP, GAP_FORM_FIELD} from '../../styles/spacing';
import {Text} from 'react-native-elements';
import {BORDER_RADIUS} from '../../styles/mixins';
import SignInUpButton from '../atoms/SignInUpButton';
import {BUTTON_TEXT_2, FORM_INPUT_TEXT, PRIMARY} from '../../styles/colors';

const FormErrorAndSubmit = ({signInUp, authenticate, navigate}) => {
  const [hasError, setError] = useState(false);
  const [errorHeader, setErrorHeader] = useState('');
  const [errorBody, setErrorBody] = useState('');

  const onSubmit = async () => {
    const [error, tempErrorHeader, tempErrorBody] = await authenticate();
    setError(error);
    setErrorHeader(tempErrorHeader);
    setErrorBody(tempErrorBody);
    if (!error) {
      navigate();
    }
  };

  return (
    <View style={styles.bigContainer}>
      {hasError && (
        <View style={styles.container}>
          <View style={styles.text}>
            <Icon name="warning" type="FontAwesome" color="#D4A600" size={40} />
          </View>
          <View style={styles.inputField}>
            {errorHeader !== '' ? (
              <View>
                <Text style={styles.errorHeader}>{errorHeader}</Text>
                <View style={{padding: GAP_FORM_FIELD / 2}} />
              </View>
            ) : (
              <View />
            )}
            <Text style={styles.errorBody}>{errorBody}</Text>
          </View>
        </View>
      )}

      <View style={{paddingTop: GAP_FORM_FIELD}}>
        <SignInUpButton
          onPress={onSubmit}
          title={signInUp}
          backgroundColor={PRIMARY}
          color={BUTTON_TEXT_2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    width: '80%',
  },
  container: {
    marginTop: FORM_GAP,
    flexDirection: 'row',
    backgroundColor: '#FFFFA4',
    borderRadius: BORDER_RADIUS,
  },
  text: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: '20%',
  },
  inputField: {
    flexDirection: 'column',
    width: '80%',
    padding: 10,
  },
  errorHeader: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  errorBody: {
    fontWeight: 'bold',
    fontSize: 13,
    color: FORM_INPUT_TEXT,
  },
});

export default FormErrorAndSubmit;
