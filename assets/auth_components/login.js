import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import axios from "axios";

const Login = () => {

    const [countryCode, setCountryCode] = useState('');
    const [phone, setPhone] = useState('');
    const [sessionData, setSetSessionData] = useState('');
    const [otp, setOtp] = useState('');
    const [getOtpError, setgetOtpError] = useState('');
    const [verifyOtpError, setVerifyOtpError] = useState('');

    const URL = '#######################################';

    const handleGetOtp = async () => {
        console.log("get otp");
        try {
            let phoneData=countryCode+phone;
            console.log("made request");
            const sdata = await axios.post(`${URL}/send_otp`,{
                    "phone": phoneData
                }
            );
            console.log(sdata.data);
            if( sdata.data.Status === "Success" ) {
                setSetSessionData(sdata.data.Details);
            } else {
                setgetOtpError("Invalid Phone Number"); //set up error message
            }
        } catch (err) {
            console.log(err);
            setgetOtpError('Something went wrong');
        }
    }

    const handleLogIn = async () => {
        console.log("verify otp");
        try {
            const otpStatus = await axios.post(`${URL}/verify_otp`,{ 
                "details": sessionData,
                "otp": otp
             });
            console.log(otpStatus.data);
            if( otpStatus.data.Status === "Success" ) {
                console.log("Navigate to Home page");
                // navigate to login page              
            } else {
                setVerifyOtpError('Invalid OTP');
            }
        } catch(err){
            console.log(err);
            setVerifyOtpError('Something went wrong');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>LOGIN</Text>

                <Text style={styles.wrongInformation}>{getOtpError}</Text>
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

                <TouchableOpacity 
                    style={styles.getbutton}
                    onPress={()=>handleGetOtp()}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Get OTP</Text>
                </TouchableOpacity>

                <Text style={styles.wrongInformation}>{verifyOtpError}</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter OTP...'
                    onChangeText={(txt)=>setOtp(txt)}
                />

                <TouchableOpacity 
                    style={styles.verifybutton}
                    onPress={()=>handleLogIn()}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>LOG IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        backgroundColor: '#E0E0E0',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 80,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        borderTopWidth: 2,
        borderTopColor: 'black'
    },
    header: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'black'
    },
    inputField: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 15
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
    getbutton: {
        width: '30%',
        alignSelf: "center",
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40
    },
    verifybutton: {
        width: '30%',
        alignSelf: "center",
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
    },
    wrongInformation: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 15,
        marginBottom: -10
    }
});