import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList,Text, Image, TouchableOpacity} from 'react-native';
import { elementos } from '../../requestBackend/dataEjemplo';
import ListaTareasIten from './ListaTareasItens';
import { Button, Menu, Divider, Provider } from 'react-native-paper';



const HomeOrganizador = (props)=>{

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

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
                                source={require('../../assets/icons/Linea-sup.png')}
                            />
                            <Image
                                style={[StylesHome.iconoMenu]}
                                source={require('../../assets/icons/Linea-sup.png')}
                            />
                            <Image
                                style={[StylesHome.iconoMenu]}
                                source={require('../../assets/icons/Linea-sup.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[StylesHome.containerInfoHeader]}>
                        <Text style={[StylesHome.saludo]}>❤¡Hola, Stherlita!</Text>
                        <Text style={[StylesHome.fechaHora, StylesHome.colorTexto]}>viernes, 17 jun 2022</Text>
                    </View>
                </View>
            </View>

            {/*lista de tareas a mostrar */}
            <ListaTareasIten arregloTareas={elementos}/>

            {/*boton azul + */}
            <TouchableOpacity
                style={[StylesHome.containerBtnNueva, {position:'absolute',
                backgroundColor: 'red', bottom: 10, right: 20}]}
            >
                
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item onPress={() => {}} title="Item 1" />
                    <Menu.Item onPress={() => {}} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
                {/* <View style={[StylesHome.botonNueva]}>
                    <View style={[{width:50, height:50, backgroundColor:'pink'}]}>

                    </View>
                    <Text style={{fontSize:40, color:'white'}}>+</Text>
                </View> */}
            </TouchableOpacity>
        </View>
    );
}

export const StylesHome = StyleSheet.create({
    container:{
        backgroundColor:'#feb529', 
        height:'100%'
    },
    colorTexto:{
        color: '#B3B3B3'
    },
    containerHeaderInferior:{
        backgroundColor:'white',
        height:140,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius:40,
        marginBottom: '10%',
        overflow:'hidden',
    },
    containerBtnMenu:{
        width:'20%',
        alignItems: 'center',
    },
    botonMenu:{
        width:30,
        height:30,
        marginTop: 10
    },
    iconoMenu:{
        width:'100%',
        height: 4,
        marginTop:5,
        borderRadius:3
    },
    containerInfoHeader:{
        width:'79%',
        alignItems:'flex-end',
        paddingRight:10
    },
    saludo:{
        fontSize: 25,
        color:'black'
    },
    fechaHora:{
        fontSize:16,
    },
    titulo:{
        fontSize:25,
        textAlign:'center',
        marginTop:20,
        marginBottom:20,
        fontWeight:'bold'
    },
    containerBtnNueva:{
        width:60,
        height:60,
        overflow:'hidden',
        marginLeft:'77%',
        marginTop: 20
    },
    botonNueva:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#53C4DE',
        borderRadius:60
    }
});

export default HomeOrganizador;