import * as React from 'react';
import { Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import { color } from 'react-native-reanimated';
import MyAppText from "./MyAppText";

const SignInUpButton = ({onPress, title, color, backgroundColor}) => (
    <TouchableOpacity onPress={onPress} style={{
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: backgroundColor}}>
        <Text style={{
            fontSize: 18,
            color: color,
            fontWeight: "bold",
            alignSelf: "center",
        }}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
    }
  });

export default SignInUpButton;