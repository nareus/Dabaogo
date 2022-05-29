import React, {useState} from 'react';
import {View} from 'react-native';
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
    const [error, errorHeader, errorBody] = await authenticate();
    setError(error);
    setErrorHeader(errorHeader);
    setErrorBody(errorBody);
    if (!error) {
      navigate();
    }
  };

  return (
    <View style={{width: '80%'}}>
      {hasError && (
        <View
          style={{
            marginTop: FORM_GAP,
            flexDirection: 'row',
            backgroundColor: '#FFFFA4',
            borderRadius: BORDER_RADIUS,
          }}>
          <View
            style={{
              paddingLeft: 10,
              paddingTop: 10,
              paddingBottom: 10,
              width: '20%',
            }}>
            <Icon name="warning" type="FontAwesome" color="#D4A600" size={40} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '80%',
              padding: 10,
            }}>
            {errorHeader != '' ? (
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  {errorHeader}
                </Text>
                <View style={{padding: GAP_FORM_FIELD / 2}}></View>
              </View>
            ) : (
              <View></View>
            )}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                color: FORM_INPUT_TEXT,
              }}>
              {errorBody}
            </Text>
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

export default FormErrorAndSubmit;
