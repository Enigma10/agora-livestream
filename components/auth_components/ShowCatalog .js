import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Button, TextInput, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import styles from './style_catalog';

const ShowCatalog = ({navigation}) => {

    const [modal1,setModal1] = useState(false);
    const [showForm1,setShowForm1] = useState(0);
    const [showForm2,setShowForm2] = useState(0);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={()=>{
                        setModal1(true),
                        setShowForm1(1),
                        setShowForm2(0)
                    }}
                >
                    <View 
                        style={{backgroundColor:"blue", width:70 ,borderRadius:50}}
                    >
                        <IconButton icon="shopping" size={38} onPress={()=>{setModal1(true),
                            setShowForm1(1),setShowForm2(0)}} 
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        width: '50%',
                        padding: 5,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 10
                    }}
                    onPress={()=>{
                        setModal1(true),
                        setShowForm1(0),
                        setShowForm2(1)
                    }}
                >
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>See All</Text>
                </TouchableOpacity>
            </View>            
            <Modal
                transparent={true}
                visible={modal1}
                animationType='slide'
                style={styles.modal}
                onRequestClose={()=>{
                    setModal1(false),
                    setShowForm1(0),
                    setShowForm2(0)
                }}
            >
                <View style={styles.modalContent}>
                    <IconButton size={30} color={'blue'} icon="close-circle-outline" onPress={()=>setModal1(false)}/>
                    {/* form 1 */}
                    {
                        showForm1 === 1 &&
                        <View style={{flex: 1, justifyContent: "space-between"}}>
                            <View style={styles.form1ImageContainer}>
                                <Image
                                    // @ts-ignore
                                    source={require("./assets/images/cart.png")}
                                />
                            </View><View>
                            <View style={{flexDirection:'row',marginBottom:15,}}><Text style={styles.productHeading}>Product Name:</Text>
                                <Text style={{fontSize: 20,}}>DIY yellow toy truck</Text></View>
                            <Text style={styles.productHeading}>Discription</Text>
                            <Text style={{marginLeft:10,fontSize:16}}>
                            Django is a Python-based free and open-source web framework that follows the model–template–views architectural pattern. It is maintained by the Django Software Foundation, an independent organization established in the US as a 501 non-profit.
                            </Text>
                                <Text style={{marginLeft:10,fontSize: 20, fontWeight: 'bold',marginTop: 15}}>Rs. 399</Text></View>
                            <View style={styles.
// @ts-ignore
                            form1TextContainer}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                       navigation.navigate("Address");
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
                        showForm2 === 1 && 
                        <View style={{marginTop: -40}}>
                            <Text style={[styles.productHeading,{alignSelf: 'center', borderBottomWidth: 4, borderBottomColor: 'black'}]}> All Products </Text>
                            <ScrollView>
                                <View style={styles.imageContainerSeeAll}>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.imageofSeeAll}
                                            // @ts-ignore
                                            source={require("./assets/images/cart.png")}
                                        />
                                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs 399</Text>
                                    </View>
                                    
                                </View>
                            </ScrollView>
                        </View>
                    }
                    {/* form 2 ends here */}
                </View>
            </Modal>
        </View>
    );
}

export default ShowCatalog;