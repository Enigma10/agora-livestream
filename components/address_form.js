import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'


export default function AdressForm() {
    return (
        <View style={{flex: 1, justifyContent: "space-between"}}>
        <View style={styles.form1ImageContainer}>
            <Image
                // @ts-ignore
                source={require("./assets/images/cart.png")}
            />
        </View>
            <Text style={{fontSize: 20, marginTop: 20}}>DIY yellow toy truck</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold',marginTop: 15}}>Rs. 399</Text>
        <View style={styles.
// @ts-ignore
        form1TextContainer}>
            <TouchableOpacity 
                onPress={()=>{
                 
                }}
                style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    padding: 15,
                    marginTop: 10,
                    margin: 5,
                    alignItems: 'center'
                }}
            >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Buy</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles =StyleSheet.create({
    mainContainer: {
        position: "absolute", 
        width:'100%', 
        height:'100%'
    },
    modalContent: {
        flex: 1,
        marginTop: '50%',
        marginBottom: 5,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        position: 'absolute',
        width: '40%',
        height: '20%',
        backgroundColor: 'white',
        top: '60%',
        left: '55%',
    },
    cataImage: {
        width: '100%', 
        height: '100%'
    },
    modal: {
        marginTop: '50%',
        height: '50%',
        backgroundColor: 'green'
    },
    form1ImageContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderBottomColor: 'black',
        borderTopColor: 'black',
        margin: 10
    },
    InputFieldForm2: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        marginTop: 6
    }
});

