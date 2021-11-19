
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native'
import { Button,IconButton, RadioButton } from 'react-native-paper'

export default function Test(props) {

    return (
        <View>{console.log(props)}
            <Text>woorrking</Text>
            <Button onPress={()=>props.navigation.navigate("home")}>hello</Button>
        </View>
    )
}
