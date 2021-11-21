import React, { Component } from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import styles from '../style_catalog';

export default class PaymentForm extends Component {

    render() {
        const {navigation}=this.props;
        return (
            <View>
            <Text style={{fontSize: 20, marginLeft: 15}}>Pay Using</Text>
            <View>
                <View>
                    <TextInput
                        placeholder='Gpay'
                        style={styles.InputFieldForm2}
                    />
                </View>
                <TouchableOpacity 
                    onPress={()=>{
                        alert("Your order hs been completed")
                       navigation.goBack();
                       navigation.goBack();
                       
                    }}
                    style={{
                        backgroundColor: 'black',
                        borderRadius: 10,
                        padding: 15,
                        marginTop: 10,
                        margin: 20,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Pay and Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}
