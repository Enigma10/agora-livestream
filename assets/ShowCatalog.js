import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Button, TextInput, ScrollView } from "react-native";

const ShowCatalog = () => {

    const [modal1,setModal1] = useState(false);
    const [showForm1,setShowForm1] = useState(0);
    const [showForm2,setShowForm2] = useState(0);
    const [showForm21,setShowForm21] = useState(0);
    const [showForm22,setShowForm22] = useState(0);
    const [showForm3,setShowForm3] = useState(0);

    return (
        <View style={styles.mainContainer}>            
            <TouchableOpacity 
                style={styles.container}
                onPress={()=>{
                    setModal1(true),
                    setShowForm1(1),
                    setShowForm2(0)
                }}
            >
                <Image 
                    style={styles.cataImage}
                    source={require('../assets/cart.png')}
                />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modal1}
                animationType='slide'
                style={styles.modal}
                onRequestClose={()=>{
                    setModal1(false),
                    setShowForm1(0),
                    setShowForm2(0),
                    setShowForm21(0),
                    setShowForm22(0),
                    setShowForm3(0)
                }}
            >
                <View style={styles.modalContent}>
                    <Button 
                        title="Close Modal"
                        onPress={()=>setModal1(false)}
                    />
                    {/* form 1 */}
                    {
                        showForm1 === 1 &&
                        <View style={{flex: 1, justifyContent: "space-between"}}>
                            <View style={styles.form1ImageContainer}>
                                <Image
                                    source={require('../assets/cart.png')}
                                />
                            </View>
                                <Text style={{fontSize: 20, marginTop: 20}}>DIY yellow toy truck</Text>
                                <Text style={{fontSize: 20, fontWeight: 'bold',marginTop: 15}}>Rs. 399</Text>
                            <View styles={styles.form1TextContainer}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        setShowForm1(0),
                                        setShowForm2(1),
                                        setShowForm21(1)
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
                    }
                    {/* form 1 end's here */}

                    {/* form 2 */}
                    {
                        showForm2===1 &&
                        <View>
                            <Text style={{alignSelf: 'center', fontSize: 20}}> Purchase </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                borderBottomWidth: 10,
                                borderBottomColor: 'black',
                            }}>
                                <View style={{width: '30%'}}>
                                    <Image
                                        source={require('../assets/cart.png')}
                                        style={{width: 70, height: 70}}
                                    />
                                </View>
                                <View style={{width: '30%'}}>
                                    <Text style={{fontSize: 20, marginTop: 20}}>DIY yellow toy truck</Text>
                                </View>
                                <View style={{width: '30%'}}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold',marginTop: 15}}>Rs. 399</Text>
                                </View>
                            </View>
                            {/* form21 inside form2 */}
                            {
                                showForm21 === 1 &&
                                <View>
                                    <Text style={{fontSize: 20, marginLeft: 15}}>Shipping Address</Text>
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
                                            setShowForm1(0),
                                            setShowForm21(0),
                                            setShowForm22(1)
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
                            }
                            {/* form21 inside form2 ends here */}
                            {/* form 22 starts here */}
                            {
                                showForm22 === 1 &&
                                <View>
                                    <Text style={{fontSize: 20, marginLeft: 15}}>Pay Using</Text>
                                    <View>
                                        <View>
                                            <TextInput
                                                placeholder='Gpay'
                                                style={styles.InputFieldForm2}
                                            />
                                        </View>
                                        <TouchableOpacity 
                                            onPress={()=>{
                                                setShowForm1(0),
                                                setShowForm21(0),
                                                setShowForm22(0),
                                                setShowForm2(0),
                                                setShowForm3(1)
                                            }}
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
                            }
                            {/* form 22 ends here */}
                        </View>
                    }
                    {/* form 2 end's here */}
                    {/* form 3 start here */}
                    {
                        showForm3 === 1 &&
                        <View>
                            <Image 
                                source={require('../assets/cart.png')}
                                style={{
                                    width: '80%',
                                    height: '80%',
                                    alignSelf: 'center',
                                }}
                            />
                            <TouchableOpacity 
                                onPress={()=>{
                                    setShowForm1(0),
                                    setShowForm21(0),
                                    setShowForm22(0),
                                    setShowForm2(0),
                                    setShowForm3(0),
                                    setModal1(0)
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
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Back to LIVE</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {/* form 3 ends here */}
                </View>
            </Modal>
        </View>
    );
}

export default ShowCatalog;

const styles = StyleSheet.create({
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