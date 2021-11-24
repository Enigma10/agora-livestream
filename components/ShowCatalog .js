// @ts-nocheck
import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Button, TextInput, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import styles from './style_catalog';

const ShowCatalog = ({navigation}) => {

    const [modal1,setModal1] = useState(false);
    const [showForm1,setShowForm1] = useState(0);
    const [showForm2,setShowForm2] = useState(0);
    const [img,setImg]=useState((require("./assets/images/login.jpg")));
    const [productName,setProductName]=useState("name");
    const [productPrice,setProductPrice]=useState("1000");
    const [productId ,setProductId] = useState("0");
    const [productDescription,setProductDescription]=useState("kasdgfj");
    const [productsToDisplay,setProductsToDisplay]=useState([]);

    const URL=`http://ec2-15-206-204-21.ap-south-1.compute.amazonaws.com:8000/catalog`;

    const fetchData = () => {
        axios.get(`${URL}/shows/3`)
        .then((response)=>{
            console.log(response.data[0]);
            setProductsToDisplay(response.data);
        })
        .catch((err)=>{
            console.alert("Something went wrong, try again later");
        })
    }

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
                        setShowForm1(0),
                        fetchData(),
                        setShowForm2(1)}} 
                            color="white"
                        />
                    </View>
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
                                <Image style={{width:200,height:180}}
                                    // @ts-ignore
                                    source={img}
                                />
                            </View><View>
                            <View style={{flexDirection:'row',marginBottom:15,}}><Text style={styles.productHeading}>Product Name:</Text>
                                <Text style={{fontSize: 20,}}>{productName}</Text></View>
                            <Text style={styles.productHeading}>Discription</Text>
                            <Text style={{marginLeft:10,fontSize:16}}>{productDescription}</Text>
                                <Text style={{marginLeft:10,fontSize: 20, fontWeight: 'bold',marginTop: 15}}>Rs. {productPrice}</Text></View>
                            <View style={styles.
// @ts-ignore
                            form1TextContainer}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                       navigation.navigate("Address",{
                                           'productInfo': {
                                               id:productId,
                                               productName: productName,
                                               productPrice: productPrice,
                                               productDescription: productDescription
                                           }
                                       });
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
                                    {
                                        productsToDisplay.map((data)=>{
                                            return (
                                                <View>
                                                    <TouchableOpacity onPress={()=>{
                                                        setModal1(true),
                                                        setShowForm1(1),
                                                        setShowForm2(0),
                                                        setImg({uri: `${data.image}`}),
                                                        setProductPrice(data.price),
                                                        setProductDescription(data.description),
                                                        setProductName(data.title),
                                                        setProductId(data.id)
                                                        }}>
                                                            <Image
                                                                style={styles.imageofSeeAll}
                                                                // @ts-ignore
                                                                source={{uri: `${data.image}`}}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17}}>Rs {data.price}</Text> 
                                                </View>
                                            );
                                        })
                                    }
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