import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import styles from './style_catalog';
export default class AddressForm extends Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            flat: '',
            landmark: '',
            city: '',
            pincode: '',
            state: ''
        }
    }

    render() {
        const productInfo = this.props.route.params.productInfo;
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
                        onChangeText={(txt)=>this.setState({flat: txt})}
                    />
                    <TextInput
                        placeholder='Landmark'
                        style={styles.InputFieldForm2}
                        onChangeText={(txt)=>this.setState({flandmark: txt})}
                    />
                    <TextInput
                        placeholder='City'
                        style={styles.InputFieldForm2}
                        onChangeText={(txt)=>this.setState({city: txt})}
                    />
                    <TextInput
                        placeholder='Pincode'
                        style={styles.InputFieldForm2}
                        onChangeText={(txt)=>this.setState({pincode: txt})}
                    />
                    <TextInput
                        placeholder='state'
                        style={styles.InputFieldForm2}
                        onChangeText={(txt)=>this.setState({state: txt})}
                    />
                    
                    <TouchableOpacity 
                        onPress={()=>{
                           navigation.navigate("Payment", {
                                addressData : {
                                   flat: this.state.flat,
                                   landmark: this.state.landmark,
                                   city: this.state.city,
                                   pincode: this.state.pincode,
                                   state: this.state.state,
                                },
                                productInfo: productInfo
                           })
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
        </View>
        )
    }

}
