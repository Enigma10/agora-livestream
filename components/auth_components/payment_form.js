import React, { Component } from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import styles from '../style_catalog';

import RazorpayCheckout from 'react-native-razorpay';

export default class PaymentForm extends Component {

    
    render() {
        const {navigation}=this.props;
        const makePayment = () => {
            var options = {
                description: 'Payment',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_xw4IV62vgToVNZ', // Your api key
                amount: '39900',
                name: 'Itachi Sticker',
                prefill: {
                  email: 'marketLive@razorpay.com',
                  contact: '9191919191',
                  name: 'Razorpay Software'
                },
                theme: {color: '#000000'}
              }
              RazorpayCheckout.open(options).then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
              navigation.navigate("Home");
        }
        return (
            <View>
            <Text style={{fontSize: 20, marginLeft: 15}}>Pay Using</Text>
            <View>
                {/* <View>
                    <TextInput
                        placeholder='Gpay'
                        style={styles.InputFieldForm2}
                    />
                </View> */}
                <TouchableOpacity 
                    onPress={()=>makePayment()}
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
