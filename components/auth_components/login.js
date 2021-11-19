import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";

const Login = ({navigation}) => {

    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [sessionData, setSetSessionData] = useState('');
    const [otp, setOtp] = useState('');
    const [getOtpError, setgetOtpError] = useState('');
    const [verifyOtpError, setVerifyOtpError] = useState('');
    const [OTPScreen, setOTPScreen]=useState(false);

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
                setOTPScreen(true);
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
               <View style={{overflow:'hidden'}}>
            <Image source={require(
                //@ts-ignore
                '../assets/images/login.jpg')} style={{overflow:"hidden" ,height: 300,
    width: 300}}/>
    </View>
            <View style={styles.content}>
                <ScrollView>
               

                <Text style={styles.wrongInformation}>{getOtpError}</Text>
                <View style={styles.phoneContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.countryCode}
                        placeholder='+91'
                        onChangeText={(txt)=>setCountryCode(txt)}
                        value={countryCode}
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
                    onPress={()=>{
                    //    handleGetOtp()
                    setOTPScreen(true);
                    }
                    }
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Get OTP</Text>
                </TouchableOpacity>

                <Text style={styles.wrongInformation}>{verifyOtpError}</Text>
                {OTPScreen?<View>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter OTP...'
                    onChangeText={(txt)=>setOtp(txt)}
                />

                <TouchableOpacity 
                    style={styles.verifybutton}
                    onPress={()=>{
                        //handleLogIn()
                    navigation.navigate("Home");
                    }}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>LOG IN</Text>
                </TouchableOpacity>
                </View>:<></>}
                <View style={{}}><Text style=
            {[styles.txt,{marginTop:1}]} onPress={() => {setOTPScreen(false);navigation.navigate("Signup")  ;}}>'Switch to SignUp page'</Text>
            </View>
            </ScrollView>

        </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
flex:1,
        backgroundColor: '#E0E0E0',

    },
    content: {
       // backgroundColor: '#E0E0E0',
       paddingTop: 20,
       flex:1
        
    },
    header: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'black'
    },
    txt: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        
      }
    ,inputField: {
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
        borderBottomRightRadius:50
        ,marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginTop: 20,
    },
    imgcontainer:{
width:20
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