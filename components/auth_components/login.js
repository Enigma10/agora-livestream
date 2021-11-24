import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";

const Login = ({navigation}) => {

    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [sessionData, setSessionData] = useState('');
    const [otp, setOtp] = useState('');
    const [getOtpError, setgetOtpError] = useState('');
    const [verifyOtpError, setVerifyOtpError] = useState('');
    const [OTPScreen, setOTPScreen]=useState(false);

    const URL = 'http://ec2-15-206-204-21.ap-south-1.compute.amazonaws.com:8000/user';

    const handleGetOtp = async () => {
        console.log("get otp");
        try {
            console.log(`${countryCode}${phone}`);
            const checkUser = await axios.post(`${URL}/check_user`,{
                "phone": `${countryCode}${phone}`
            })
            console.log(checkUser.data.message);
            console.log(checkUser);
            console.log(checkUser.data);
            if( checkUser.data.message === "User Already Exist" ) {
                try {
                    const sdata = await axios.post(`${URL}/send_otp`,{
                        "phone": countryCode+phone
                    });
                    if( sdata.data.Status === "Success" ) {
                        setOTPScreen(true);
                        setSessionData(sdata.data.Details);
                    } else {
                        setgetOtpError("Invalid Phone Number"); //set up error message
                    }
                } catch {
                    setgetOtpError('Could not sent OTP, check your network');
                }
            }
            else { alert("You don't have an account please signup");
                navigation.navigate('Signup',{number:{num:phone,code:countryCode},});
            }
        } catch {
            console.log("couln't send");
            setgetOtpError('Something went wrong, check your network');
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
                setOTPScreen(false);
                navigation.navigate("Home");
            } else {
                setVerifyOtpError('Invalid OTP');
            }
        } catch(err){
            console.log(err);
            setVerifyOtpError('Something went wrong, check your network');
        }
    }

    return (
        <View style={styles.container}>
        <View style={{overflow:'hidden'}}>
                <Image source={require(
                    //@ts-ignore
                    '../assets/images/login.jpg')} style={{overflow:"hidden" ,height: 300,width: 300}}/>
            </View>
            <View style={styles.content}>
                <ScrollView>
                    <Text style={styles.wrongInformation}>{getOtpError}</Text>
                    <View style={styles.phoneContainer}>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.countryCode}
                            placeholder='+91'
                            value={countryCode}
                            onChangeText={(val)=>{setCountryCode(val)}}
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

                    <TouchableOpacity 
                        style={styles.getbutton}
                        onPress={()=>{
                               handleGetOtp()
                            }
                        }
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Get OTP</Text>
                    </TouchableOpacity>

                    <Text style={styles.wrongInformation}>{verifyOtpError}</Text>
                    {
                        OTPScreen?<View>
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
                            onPress={()=>{
                                handleLogIn()
                            }}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold'}}>LOG IN</Text>
                        </TouchableOpacity>
                        </View>:<></>
                    }
                    {/* <View style={{}}>
                        <Text style={[styles.txt,{marginTop:1}]} onPress={() => {setOTPScreen(false);navigation.navigate("Signup")  ;}}>'Switch to SignUp page'</Text>
                    </View> */}
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