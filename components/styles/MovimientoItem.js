import { View, Text , Image} from 'react-native';
import React from 'react';
import { StylesCrearRecordatorio } from './Styles';

const MovimientoItem = (props) => {
  return (
    <View>
        {/**icono transaccion */}
        <Image
            source={true ? require('../../assets/icon/Menu-Finanzas-color.png') : require('../../assets/icon/Menu-Finanzas-color.png')}
        />
        {/**informacion de la transaccion */}
        <View>
            <Text>Titulo trasaccion</Text>
            <Text>fecha transaccion</Text>
        </View>
        {/**Monto de la transaccion */}
        <View>
            <Text>$1000,</Text>
            <Text>00</Text>
        </View>
    </View>
  );
}

export default MovimientoItem;