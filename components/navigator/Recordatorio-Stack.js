import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CrearRecordatorio from "../../screens/CrearRecordatorio";
import ConsultaRecordatorios from "../../screens/ConsultaRecordatorios";

const Stack = createNativeStackNavigator();

const RecordatorioStack =(props)=>{
    return(
      <Stack.Navigator
          initialRouteName='Recordatorios'
        >
          <Stack.Screen
            name='Recordatorios'
            component={ConsultaRecordatorios}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              // headerShown: false,
            }}
          />
          <Stack.Screen
            name='CrearRecordatorio'
            component={CrearRecordatorio}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
              // headerShown: false,
            }}
          />
        </Stack.Navigator>
    );
}
 
export default RecordatorioStack;