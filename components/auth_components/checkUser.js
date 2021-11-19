import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from "axios";


const CheckUser = ({navigation}) => {

    const [error,setError] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');

    const URL = '##########################################';

    const handleClick = async () => {

        if(countryCode==='' || phone==='') {
            setError("Fill all the details");
            return ;
        }


        try {
            let phoneData=countryCode+phone;
            const check = await axios.post(`${URL}/check_user`,{
                    "phone": phoneData
                }
            );
            if( check.data.message === "User Already Exist" ) {
                console.log("User exists take to login page");
                navigation.navigate('Login');

            } else {
                console.log("User doesn't exists , take to sign up page");
                navigation.navigate('Signup');

            }
        } catch (err) {
            console.log(err);
            setError('Something went wrong');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.phoneContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.countryCode}
                        placeholder='+91'
                        onChangeText={(txt)=>setCountryCode(txt)}
                    />
                    <TextInput
                        keyboardType='numeric'
                        style={styles.phoneField}
                        placeholder='Enter Phone...'
                        onChangeText={(txt)=>setPhone(txt)}
                    />
                </View>

                <Text style={styles.wrongInformation}>{error}</Text>

                <TouchableOpacity 
                    style={styles.proceedButton}
                    onPress={()=>handleClick()}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CheckUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',

    },
    content: {
        paddingTop: 20,
        paddingBottom: 20,
       elevation:6,
       backgroundColor: '#E0E0E0',
       
    },
    phoneContainer: {
        alignSelf: 'center',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    phoneField: {
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 15

    },
    countryCode: {
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 15
    },
    proceedButton: {
        width: '30%',
        alignSelf: "center",
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        margin: 30
    },
    wrongInformation: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 15
    }
});