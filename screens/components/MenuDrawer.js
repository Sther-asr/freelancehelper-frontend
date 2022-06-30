
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StylesHome,StylesDrawer } from "./styles/Styles";


const MenuDrawer = () => {

  return (
    <View style={[StylesDrawer.containerHeader]}>
      <Image
        style={[StylesDrawer.logo]}
        source={require("../assets/icons/FreelanceHelper-gris.png")}
      />
     
    </View>
  );
};
export default MenuDrawer;






/*import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StylesHome,StylesDrawer } from './styles/Styles';
import { nombreDia, nombreMes } from '../fuciones/DiaMesEspanol';

const MenuDrawer = ({title}) => {

    return (
        <View style={[StylesDrawer.containerHeaderInferior, { flexDirection: 'column' }]}>

            <Text style={[StylesDrawer.titulo, StylesDrawer.colorTexto]}>{title}</Text>

            <View style={[{ width: '100%', flexDirection: 'row' }]}>
             
            </View>
        </View>
  );
}




export default MenuDrawer;
*/