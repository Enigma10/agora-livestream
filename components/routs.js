
import React,{useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import  {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test from './test';
import CheckUser from './auth_components/checkUser';
import Login from './auth_components/login';
import Signup from './auth_components/signup';
import App from '../App';
const Home = App;
const Stk = createNativeStackNavigator();


export default function Appli(){
return (
  <NavigationContainer>    
<Stk.Navigator>
<Stk.Screen
name="Login"
component={Login}
/>
<Stk.Screen
name="Signup"
component={Signup}

/>
<Stk.Screen
name="ChekUser"
component={CheckUser}

/>
<Stk.Screen
name="Home"
component={App}

/>

</Stk.Navigator>

  </NavigationContainer>
);

}