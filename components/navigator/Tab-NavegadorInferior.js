import React,{useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text, Image} from 'react-native';
import { createBottomTabNavigator,useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import NavegadorOrganizador from './Drawer-NavegadorOrganizador';
import ContextUsuario from '../../Context/ContextUsuario';
import {consultaDatosPersona} from "../../requestBackend/API-Persona";
const Tab = createBottomTabNavigator();

const Pantalla1 =()=>{
    return(
        <View>
            <Text>Pantalla prueba 1000</Text>
        </View>
    );
}

const Pantalla2 =()=>{
    return(
        <View>
            <Text>Pantalla prueba 2000</Text>
        </View>
    );
}

const NavegadorInferior = (props)=>{
    // almacenar info estado
    const [datosUsuario, setDatosUsuario] = useState({});
    useEffect(()=>{
        obtenerDatosPersona();
    },[])
    const obtenerDatosPersona = async()=>{
        const infoSolicitud = {
            "sesion" : true,
            "idSesion" : props.route.params.idUsuario
        }
        console.log(infoSolicitud);
        const data = await consultaDatosPersona(infoSolicitud);
        setDatosUsuario(data[0]);
        console.log(JSON.stringify(datosUsuario));
    }
    //console.log(props.route.params);
    return(
        <ContextUsuario.Provider value={datosUsuario}>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({route})=>({
                    
                    tabBarActiveTintColor:'#FEB529',
                    //funcion para cambiar los iconos del menu inferior
                    tabBarIcon: ({focused}) =>{
                        let iconoElement ='';
                        let modificaIco = false;
                        switch (route.name) {
                            case 'Home':
                                iconoElement = focused ? require('../../assets/icons/Menu-organizador-color.png') : require('../../assets/icons/Menu-organizador.png');
                                modificaIco = true;
                                break;
                            case 'Finanzas':
                                iconoElement = focused ? require('../../assets/icons/Menu-Finanzas-color.png') : require('../../assets/icons/Menu-Finanzas.png');
                                break;
                            case 'Perfil':
                                iconoElement = focused ? require('../../assets/icons/Menu-Perfil-color.png') : require('../../assets/icons/Menu-Perfil.png');
                                break;
                            default:
                                break;
                        }
                        return(<Image source={iconoElement} style={[StylesNavInferior.iconoSeccion,modificaIco ? {height:33 }:{}]}/>);
                    }
                })
                
                }
            >
                <Tab.Screen
                    name='Home'
                    component={NavegadorOrganizador}
                    options={{
                        headerShown:false,
                        title:"Organizador",
                    }}
                />
                
                <Tab.Screen
                    name='Finanzas'
                    component={Pantalla1}
                    options={{
                        headerShown:false,
                        title:"Finazas",
                    }}
                />

                <Tab.Screen
                    name='Perfil'
                    component={Pantalla2}
                    options={{
                        headerShown:false,
                        title:"Perfil",
                    }}
                />
                
            </Tab.Navigator>
        </ContextUsuario.Provider>
    );
}

export const StylesNavInferior = StyleSheet.create({
    iconoSeccion:{
        width: 30,
        height:30
    }
});

export default NavegadorInferior;