import { createDrawerNavigator, DrawerContentScrollView  } from '@react-navigation/drawer';
import { View } from 'react-native';
import { StylesDrawer, StylesHomeFinanzas } from '../styles/Styles';
import MenuDrawer from "../../components/MenuDrawer";
import MenuButton from '../../components/MenuButton';
import HomeFinanzas from '../../screens/HomeFinanzas';
import ConsultaMovimientos from '../../screens/ConsultaMovimientos';
import CrearEgreso from '../../screens/CrearEgreso';

const Drawer = createDrawerNavigator();

const Menu = ({ navigation }) => {

    return (

        <DrawerContentScrollView
            contentContainerStyle={[StylesDrawer.scroll]}
        >
            <View style={[StylesDrawer.view,StylesHomeFinanzas.colorFondo,]} >
                <View style={StylesDrawer.imageView} >
                    <MenuDrawer
                    // title={"FreeLanceHelper"}                
                    />
                </View>

                <View style={[StylesDrawer.menu, {height:'90%'}]} >
                    <MenuButton
                        text="Movimientos"
                        OnPress={() => navigation.navigate('ConsultaMovimientos')}
                        image={require('../../assets/icons/Billetera.png')}
                    />

                    <MenuButton
                        text="Crear Egreso"
                        OnPress={() => navigation.navigate('CrearEgreso')}
                        image={require('../../assets/icons/Egresos.png')}
                    />

                </View>
            </View>

        </DrawerContentScrollView>



    );
}

const NavegadorFinanzas = ()=>{

    return(
        <Drawer.Navigator
            drawerContent={(props)=> <Menu {...props}/>}
            screenOptions={{
                headerShown: true,
                swipeEnabled: true,
                headerStyle:{
                backgroundColor: 'white',
                height: 80
                },
                headerTintColor: '#B3B3B3',
                headerTitleStyle:{
                fontSize:25,
                fontWeight: 'bold',
                },
                drawerPosition: 'left',
                drawerType: 'front',
                overlayColor: "#AAAAAA80",
                headerTitleAlign:'center',
                headerShown: false
            }}
        >
            <Drawer.Screen
                name='HomeFinanzas'
                component={HomeFinanzas}
            />
            <Drawer.Screen
                name='ConsultaMovimientos'
                component={ConsultaMovimientos}
            />
            <Drawer.Screen
                name='CrearEgreso'
                component={CrearEgreso}
            />
        </Drawer.Navigator>
    );
}

export default NavegadorFinanzas;