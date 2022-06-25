import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import ListaTareasIten from '../components/ListaTareasItens';
import useContextUsuario from '../hook/useContextUsuario';
import { nombreDia, nombreMes} from '../fuciones/DiaMesEspanol';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { StylesHome } from '../components/styles/Styles';
import IconoNuevo from '../components/IconoNuevo';
import HeaderMenuPersonalizado from '../components/HeaderMenuPersonalizado';

const HomeOrganizador = (props)=>{
 
    // trayendo info contexto
    const infoUsuario = useContextUsuario();
    // obteniendo la fecha actual del dispositivo
    const fecha = new Date();

    return(
        <View style={[StylesHome.container]}>
            <StatusBar backgroundColor='white'/>
            {/**Menu Personalizado */}
            <HeaderMenuPersonalizado 
                title="FreeLanceHelper" 
                togleMenu={()=>props.navigation.openDrawer()}
                saludo="❤Hola, "
                nombreUsuario={infoUsuario.nombrePersona}
            />
            {/*lista de tareas a mostrar */}
            <ListaTareasIten/>

            {/*boton azul + */}
            <View style={[StylesHome.containerBtnNueva]}>
                <IconoNuevo navegar={props}/>
            </View>
        </View>
    );
}



export default HomeOrganizador;