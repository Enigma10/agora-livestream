import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [sessionData, setSessionData] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [getOtpError, setgetOtpError] = useState('');
    const [verifyOtpError, setVerifyOtpError] = useState('');

    const URL = 'http://ec2-15-206-204-21.ap-south-1.compute.amazonaws.com:8000/user';

    const handleGetOtp = async () => {
        console.log("get otp");
        if(phone==='' || email==='' || name==='') {
            setgetOtpError('Please Fill all the Fields');
            return ;
        }

        try {
            const sdata = await axios.post(`${URL}/send_otp`,{
                    "phone": countryCode+phone
                }
            );
            console.log(sdata.data);
            if( sdata.data.Status === "Success" ) {
                setSessionData(sdata.data.Details);
            } else {
                setgetOtpError("Invalid phone Number"); //set up error message
            }
        } catch (err) {
            console.log(err);
            setgetOtpError('Something went wrong, check your network');
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
                        "phone": `${countryCode}+${phone}`,
                        "name": name,
                        "role": "B",
                        "email": email
                    });
                    if(createUser!=null){
                        navigation.navigate('Home')
                    }
                    else {
                        setVerifyOtpError("Could not create user, Invalid information");
                    }
                } catch(err) {
                    console.log(err['message']);
                    console.log("Something went wrong");
                }
            } else {
                setVerifyOtpError('Invalid OTP');
            }
        } catch(err){
            console.log(err['message']);
            setVerifyOtpError('Something went wrong, check your network');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Fill up Your details</Text>

                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Name...'
                    onChangeText={(txt)=>{
                        setName(txt),
                        setgetOtpError('')
                    }}
                />

                <View style={styles.phoneContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.countryCode}
                        placeholder='+91'
                        value={countryCode}
                    />
                    <TextInput
                        keyboardType='numeric'
                        style={styles.phoneField}
                        placeholder='Enter Phone...'
                        onChangeText={(txt)=>{
                            setPhone(txt),
                            setgetOtpError('')
                        }}
                    />
                </View>

                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Email...'
                    onChangeText={(txt)=>{
                        setEmail(txt),
                        setgetOtpError('')
                    }}
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
                    onChangeText={(txt)=>{
                        setOtp(txt),
                        setVerifyOtpError('')
                    }}
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