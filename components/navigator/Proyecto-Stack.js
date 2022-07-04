import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CrearProyecto from "../../screens/CrearProyecto";
import CrearActividad from "../../screens/CrearActividad";
import ConsultaProyectos from "../../screens/ConsultaProyectos";
import ConsultaActividades from "../../screens/ConsultaActividades";

const Stack = createNativeStackNavigator();

const ProyectoStack =(props)=>{
    return(
      <Stack.Navigator
          initialRouteName='Proyectos'
        >
          <Stack.Screen
            name='Proyectos'
            component={ConsultaProyectos}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              // headerShown: false,
            }}
          />
          <Stack.Screen
            name='CrearProyecto'
            component={CrearProyecto}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
              // headerShown: false,
            }}
          />
          <Stack.Screen
            name='Actividades'
            component={ConsultaActividades}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
              // headerShown: false,
            }}
          />
           <Stack.Screen
            name='CrearActividad'
            component={CrearActividad}
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
 
export default ProyectoStack;