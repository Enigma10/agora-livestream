import { Dimensions, StyleSheet } from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height-83,
  },
chatView:{width:dimensions.width,
  position:'absolute', bottom:0,height:300,overflow:'scroll'}
  ,videview:{
    width:dimensions.width,
    height: dimensions.height-200
  },
chatInput:{
  marginHorizontal:10,
  borderRadius:25,


},
inputtext:{borderRadius:25, borderTopLeftRadius:25,borderTopRightRadius:25,width:dimensions.width-50}

,halfView:{
  width:dimensions.width,
  height: dimensions.height-400
}
  ,remoteContainer: {
    width: '100%',
    height: 800,
    position: 'absolute',
    top: 5,
  },
  remoteContainerContent: {
    paddingHorizontal: 2.5,
  },
  remote: {
    width: 400,
    height: 600,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  roleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});
