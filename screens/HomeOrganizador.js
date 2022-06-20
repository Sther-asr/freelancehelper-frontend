import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import ListaTareasIten from '../components/ListaTareasItens';
import useContextUsuario from '../hook/useContextUsuario';
import { nombreDia, nombreMes} from '../fuciones/DiaMesEspanol';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { StylesHome } from '../components/styles/Styles';
import IconoNuevo from '../components/IconoNuevo';


const HomeOrganizador = (props)=>{
 
    // trayendo info contexto
    const infoUsuario = useContextUsuario();
    // obteniendo la fecha actual del dispositivo
    const fecha = new Date();

    return(
        <View style={[StylesHome.container]}>
            <StatusBar backgroundColor='white'/>
            <View style={[StylesHome.containerHeaderInferior,{flexDirection:'column'}]}>
                
                <Text style={[StylesHome.titulo, StylesHome.colorTexto]}>FreeLanceHelper</Text>
                
                <View style={[{width:'100%', flexDirection:'row'}]}>
                    <View style={[StylesHome.containerBtnMenu]}>
                        <TouchableOpacity
                            style={[StylesHome.botonMenu]}
                            onPress={()=>props.navigation.openDrawer()}
                        >
                            <Image
                                style={[StylesHome.iconoMenu]}
                                source={require('../assets/icons/Linea-sup.png')}
                            />
                            <Image
                                style={[StylesHome.iconoMenu]}
                                source={require('../assets/icons/Linea-sup.png')}
                            />
                            <Image
                                style={[StylesHome.iconoMenu]}
                                source={require('../assets/icons/Linea-sup.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[StylesHome.containerInfoHeader]}>
                        <Text style={[StylesHome.saludo]}>❤¡Hola, {infoUsuario.nombrePersona}!</Text>
                        <Text style={[StylesHome.fechaHora, StylesHome.colorTexto]}>
                            {`${nombreDia(fecha.getDay())}, ${fecha.getDate()} ${nombreMes(fecha.getMonth())} ${fecha.getFullYear()}`}
                        </Text>
                    </View>
                </View>
            </View>

            {/*lista de tareas a mostrar */}
            <ListaTareasIten/>

            {/*boton azul + */}
            <View style={[StylesHome.containerBtnNueva]}>
                <IconoNuevo navegar={props}/>
            </View>
        </View>
    );
}

// export const StylesHome = StyleSheet.create({
//     container:{
//         backgroundColor:'#feb529', 
//         height:'100%',
//     },
//     colorTexto:{
//         color: '#B3B3B3'
//     },
//     containerHeaderInferior:{
//         backgroundColor:'white',
//         height:140,
//         borderBottomLeftRadius: 40,
//         borderBottomRightRadius:40,
//         marginBottom: '10%',
//         overflow:'hidden',
//     },
//     containerBtnMenu:{
//         width:'20%',
//         alignItems: 'center',
//     },
//     botonMenu:{
//         width:30,
//         height:30,
//         marginTop: 10
//     },
//     iconoMenu:{
//         width:'100%',
//         height: 4,
//         marginTop:5,
//         borderRadius:3
//     },
//     containerInfoHeader:{
//         width:'79%',
//         alignItems:'flex-end',
//         paddingRight:10
//     },
//     saludo:{
//         fontSize: 25,
//         color:'black'
//     },
//     fechaHora:{
//         fontSize:16,
//     },
//     titulo:{
//         fontSize:25,
//         textAlign:'center',
//         marginTop:20,
//         marginBottom:20,
//         fontWeight:'bold'
//     },
//     containerBtnNueva:{
//         width:'90%', 
//         marginLeft:'5%', 
//         marginRight:'5%', 
//         marginTop: 20,
//     },
//     botonNueva:{
//         width:60,
//         height:60,
//         overflow:'hidden',
//         marginLeft:'77%',
//         backgroundColor:'#53C4DE',
//         borderRadius: 40
//     }
// });

export default HomeOrganizador;