import React,{useState} from "react";
import { ImageBackground, View, Text, Image} from 'react-native';
import { Button, Menu, Divider} from 'react-native-paper';
import { StylesHome } from "./styles/Styles";




const IconoNuevo = ({navegar}) =>{
    // elementos necesarios para manejar el menu flotante
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    //console.log(navegar.navigation.navigate('CrearRecordatorio'));
    return(
        <ImageBackground style={[StylesHome.botonNueva]} source={require('../assets/icons/plus.png')}>

            <Menu
                visible={visible}
                onDismiss={closeMenu}
                contentStyle={{ borderRadius: 30, overflow: 'hidden', width: 170 }}
                anchor={
                    <Button onPress={openMenu} style={{ marginTop: 13, }}></Button>
                }
            >
                <View style={{ height: 40, width: '100%', marginTop: -5, alignItems: 'center', borderBottomWidth: 0.8, borderColor: '#B3B3B3' }}>
                    <Image
                        style={[StylesHome.iconoMenu, { width: 40, marginBottom: 0 }]}
                        source={require('../assets/icons/Linea-sup.png')}
                    />
                    <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 2 }}>CREAR</Text>
                </View>
                <Divider />
                <Menu.Item onPress={() => { closeMenu()}} title="Proyecto" icon={() => { return (<Image source={require('../assets/icons/Crear-Proyecto.png')} style={{ width: 35, height: 25 }} />) }} />
                <Divider />
                <Menu.Item onPress={() => { closeMenu()}} title="Tarea" icon={() => { return (<Image source={require('../assets/icons/Crear-Tarea.png')} style={{ width: 27, height: 30, marginLeft: 4 }} />) }} />
                <Divider />
                <Menu.Item onPress={() => { closeMenu(); navegar.navigation.navigate('CrearRecordatorio')}} title="Recordatorio" icon={() => { return (<Image source={require('../assets/icons/Crear-Recordatorio.png')} style={{ width: 27, height: 30, marginLeft: 4 }} />) }} />
                <Divider />
            </Menu>


        </ImageBackground>
    );
}

export default IconoNuevo;