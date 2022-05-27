import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View } from "react-native";
import Logo from '../../components/atoms/Logo';
import SignInUpButton from '../../components/atoms/SignInUpButton';

function LandingScreen({navigation}) {
    return (
        <View>
            <View style={{alignSelf: 'center', paddingTop: 150,}}>
                <Logo></Logo>
            </View>
            <View style={{marginTop: "120%"}}></View>
            <View style={{alignSelf: 'center', width: "80%"}}>
                <SignInUpButton onPress={() => navigation.navigate('SignUp')} title={'Sign Up'} backgroundColor={'#F19896'} color='white'/>
                <View style={{padding:8}}></View>
                <SignInUpButton onPress={() => navigation.navigate('SignIn')} title={'Sign In'} backgroundColor={'#E0DFDF'} color='#666666'/>
            </View>
        </View>
    )
}
export default LandingScreen;