import react from 'react';
import {View,Text, TouchableOpacity,Image,StyleSheet} from 'react-native';
import { styles,StylesHome,StylesDrawer } from "./styles/Styles";
import { useNavigation } from '@react-navigation/native';

/*
const MenuButton= ({text,OnPress,image}) =>{
    return(
        <TouchableOpacity
                style={StylesDrawer.boton}
                >
                
                <Image
                source={image}
                style={[styles.PNGinput]}
                    />
                    <Text style={StylesDrawer.texto}>
                    {text}
                </Text>
        </TouchableOpacity>


    )


}
*/
const MenuButton= ({text,OnPress,image}) =>{

    return(
        <TouchableOpacity
        style={StylesDrawer.boton}
        onPress={OnPress}
                >
                
                <Image
                source={image}
                style={[StylesDrawer.PNGinput]}
                    />
                    <Text style={StylesDrawer.texto} >
                    {text}
                </Text>

        </TouchableOpacity>


    )


}



export default MenuButton;