import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [sessionData, setSetSessionData] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [getOtpError, setgetOtpError] = useState('');
    const [verifyOtpError, setVerifyOtpError] = useState('');

    const URL = '#################################';

    const handleGetOtp = async () => {
        console.log("get otp");
        if(phone==='' || email==='' || name==='') {
            setgetOtpError('Please Fill all the Fields');
            return ;
        }

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
                setgetOtpError("Invallid phone Number"); //set up error message
            }
        } catch (err) {
            console.log(err);
            setgetOtpError('Something went wrong');
        }
    }

    const handleVerifyOtp = async () => {
        console.log("verify otp");
        try {
            const otpStatus = await axios.post(`${URL}/verify_otp`,{ 
                "details": sessionData,
                "otp": otp
             });
            console.log(otpStatus.data);
            if( otpStatus.data.Status === "Success" ) {
                try {
                    const createUser = await axios.post(`${URL}/signup`, {
                        "phone": countryCode+phone,
                        "name": name,
                        "role": "B",
                        "email": email
                    });
                    console.log("User Created, Navigate to Home page");
                    if(createUser!=null){
                        navigation.navigate('Home')
                    }
                    // navigate to login page
                } catch(err) {
                    console.log("Something went wrong");
                }
                
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
                <Text style={styles.header}>Fill up Your details</Text>

                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Name...'
                    onChangeText={(txt)=>setName(txt)}
                />

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

                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Email...'
                    onChangeText={(txt)=>setEmail(txt)}
                />

                <Text style={styles.wrongInformation}>{getOtpError}</Text>

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
                    onPress={()=>handleVerifyOtp()}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Verify OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        backgroundColor: '#E0E0E0',
        paddingTop: 20,
        paddingBottom: 20,
       flex:1
    },
    header: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
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
        
    },
    phoneField: {
        width: '75%',
        marginLeft:5
        ,backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderBottomRightRadius:50,
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
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
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
        marginBottom: 30
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
        fontSize: 15
    }
});