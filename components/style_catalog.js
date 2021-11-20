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