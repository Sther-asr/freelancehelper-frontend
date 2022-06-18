import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Logup from "../screens/Logup";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const NavegadorStack =(props)=>{
    return(
      <Stack.Navigator
          initialRouteName='Login'
        >
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerStyle:{backgroundColor:'#F56783'},
              headerTitle:'',
              headerTintColor:'white',
            }}
          />
          <Stack.Screen
            name='Logup'
            component={Logup}
            options={{
              headerStyle:{backgroundColor:'#a197ff'},
              headerTitle:'',
              headerTintColor:'white',
            }}
          />
        </Stack.Navigator>
    );
}
 
export default NavegadorStack;