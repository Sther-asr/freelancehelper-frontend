import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StylesHome } from './styles/Styles';
import { nombreDia, nombreMes } from '../fuciones/DiaMesEspanol';

const HeaderMenuPersonalizado = ({title, togleMenu, nombreUsuario, saludo}) => {
    const fecha = new Date();
    return (
        <View style={[StylesHome.containerHeaderInferior, { flexDirection: 'column' }]}>

            <Text style={[StylesHome.titulo, StylesHome.colorTexto]}>{title}</Text>

            <View style={[{ width: '100%', flexDirection: 'row' }]}>
                <View style={[StylesHome.containerBtnMenu]}>
                    <TouchableOpacity
                        style={[StylesHome.botonMenu]}
                        onPress={togleMenu}
                    >
                        <Image
                            style={[{ width: '100%', height: '100%' }]}
                            source={require('../assets/icons/Hamburguesita.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[StylesHome.containerInfoHeader]}>
                    <Text style={[StylesHome.saludo]}>{(saludo === undefined? '¡' : saludo + '')+nombreUsuario}!</Text>
                    <Text style={[StylesHome.fechaHora, StylesHome.colorTexto]}>
                        {`${nombreDia(fecha.getDay())}, ${fecha.getDate()} ${nombreMes(fecha.getMonth())} ${fecha.getFullYear()}`}
                    </Text>
                </View>
            </View>
        </View>
  );
}

export default HeaderMenuPersonalizado;