import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text, Image} from 'react-native';
import { createBottomTabNavigator,useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import NavegadorOrganizador from './Drawer-NavegadorOrganizador';
import NavegadorFinanzas from "./Drawer-NavegadorFinanzas";
import Perfil from '../../screens/Perfil';
import ContextUsuario from '../../Context/ContextUsuario';
// import {consultaDatosPersona} from "../../requestBackend/API-Persona";
const Tab = createBottomTabNavigator();



const NavegadorInferior = (props)=>{
    // // almacenar info estado
    // const [datosUsuario, setDatosUsuario] = useState({});
    // useEffect(()=>{
    //     obtenerDatosPersona();
    // },[])
    // const obtenerDatosPersona = async()=>{
    //     const infoSolicitud = {
    //         "sesion" : true,
    //         "idSesion" : props.route.params.idUsuario
    //     }
    //     console.log(infoSolicitud);
    //     const data = await consultaDatosPersona(infoSolicitud);
    //     setDatosUsuario(data[0]);
    //     console.log(JSON.stringify(datosUsuario));
    // }
    //console.log(JSON.stringify(props.route.params.datosUsuario));
    
    return(
        <ContextUsuario.Provider value={props.route.params.datosUsuario}>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({route})=>({
                    
                    tabBarActiveTintColor:'#FEB529',
                    //funcion para cambiar los iconos del menu inferior
                    tabBarIcon: ({focused}) =>{
                        let iconoElement ='';
                        let organizadorIco = false;
                        let perfilIco = false;
                        switch (route.name) {
                            case 'Home':
                                iconoElement = focused ? require('../../assets/icons/Menu-organizador-color.png') : require('../../assets/icons/Menu-organizador.png');
                                organizadorIco = true;
                                break;
                            case 'Finanzas':
                                iconoElement = focused ? require('../../assets/icons/Menu-Finanzas-color.png') : require('../../assets/icons/Menu-Finanzas.png');
                                break;
                            case 'Perfil':
                                iconoElement = focused ? require('../../assets/icons/Menu-Perfil-color.png') : require('../../assets/icons/Menu-Perfil.png'); perfilIco = true;
                                break;
                            default:
                                break;
                        }
                        return(<Image source={iconoElement} style={[StylesNavInferior.iconoSeccion, organizadorIco ? {height:29, width:24 } : {}, perfilIco ? {width:31} : {} ]}/>);
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
                    component={NavegadorFinanzas}
                    options={{
                        headerShown:false,
                        title:"Finanzas",
                    }}
                />

                <Tab.Screen
                    name='Perfil'
                    component={Perfil}
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
        height: 31,
    }
});

export default NavegadorInferior;