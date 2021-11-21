import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
        backgroundColor: 'transparent',
        top: '60%',
        left: '70%',
    },
    cataImage: {
        width: '100%', 
        height: '100%'

    },
productHeading:{fontWeight:'700',marginRight:20,marginLeft:10,fontSize:20}
    ,modal: {
        marginTop: '50%',
        height: '50%',
        backgroundColor: 'green'
    },
    form1ImageContainer: {
        alignItems: 'center',
        
    },
    InputFieldForm2: {
        marginHorizontal: 20,
        height: 40,
        marginTop: 6,
        backgroundColor: 'white',
        borderRadius: 50,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,


    }
});