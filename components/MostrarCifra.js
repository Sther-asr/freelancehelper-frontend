import { View, Text, StyleSheet} from 'react-native';
import { StylesMostrarCifras} from './styles/Styles';
import React from 'react';

const MostrarCifra = ({titulo, monto, moneda, estilos}) => {
  return (
    <View style={[StylesMostrarCifras.container,(estilos === undefined ? {} : estilos)]}>
      <View style={[StylesMostrarCifras.containerTitulo]}>
        <Text style={[StylesMostrarCifras.textTitulo]}>{(titulo === undefined || titulo === null ? "Nombre Campo" : titulo)}</Text>
      </View>
      <View style={[StylesMostrarCifras.containerElementosCifras]}>
        <View style={[StylesMostrarCifras.containerCifras]}>
            <Text style={[StylesMostrarCifras.textCifras]}>{(monto === undefined || monto === null ? "0.00" : monto)}</Text>
            <Text style={[StylesMostrarCifras.textCifras,{marginLeft:4}]}>{(moneda === undefined || moneda === null ? "USD" : moneda)}</Text>
        </View>
      </View>
    </View>
  );
}


export default MostrarCifra;