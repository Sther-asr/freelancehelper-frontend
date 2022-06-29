import React from "react";
import 'react-native-gesture-handler';
import {View, Button} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Logup from "../../screens/Logup";
import Login from "../../screens/Login"
import NavegadorInferior from "./Tab-NavegadorInferior";

const Principal = (props) =>{
    return(
      <View>
        <StatusBar backgroundColor="orange"/>
        <Button
          onPress={()=>{
            props.navigation.navigate('Logup')
          }}
          title="Registrarse"
          color="#841584"
        />
      </View>
    );
}

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
          <Stack.Screen
            name='Organizador'
            component={NavegadorInferior}
            options={{
              headerStyle:{backgroundColor:'#a197ff'},
              headerTitle:'',
              headerTintColor:'white',
              headerShown:false,
            }}
          />
        </Stack.Navigator>
    );
}
 
export default NavegadorStack;