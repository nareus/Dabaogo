import * as React from 'react';
import { Text } from "react-native";

const MyAppText = (text: string, color: string = 'black', fontSize: number = 15) => {
    return (
        <Text style={{fontFamily: 'Baskerville', color: color, fontSize: fontSize}}>
            {text}
        </Text>
    );
}



export default MyAppText;