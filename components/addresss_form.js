import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import styles from './style_catalog';
export default class AddressForm extends Component {
    render() {
        const {navigation}= this.props;
        return (
            <View style={{flex:1}}>
           
            {
              <ScrollView>
                <View>
                    <Text style={{marginVertical:10,fontSize: 20, marginLeft: 15,textAlign:'center'}}> Pleases fill all details</Text>
                    <TextInput
                    
                        placeholder='Flat/House Number'
                        style={styles.InputFieldForm2}
                    />
                    <TextInput
                        placeholder='Landmark'
                        style={styles.InputFieldForm2}
                    />
                    <TextInput
                        placeholder='Flat/House Number'
                        style={styles.InputFieldForm2}
                    />
                    <TextInput
                        placeholder='City'
                        style={styles.InputFieldForm2}
                    />
                    <TextInput
                        placeholder='Pincode'
                        style={styles.InputFieldForm2}
                    />
                    <TextInput
                        placeholder='state'
                        style={styles.InputFieldForm2}
                    />
                    
                    <TouchableOpacity 
                        onPress={()=>{
                           navigation.navigate("Payment")
                        }}
                        style={{
                            backgroundColor: 'black',
                            borderRadius: 10,
                            padding: 15,
                            marginTop: 10,
                            margin: 20,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            }
            {/* form21 inside form2 ends here */}
            {/* form 22 starts here */}
         
            {/* form 22 ends here */}
        </View>
        )
    }

}

