import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeFinanzas from '../../screens/HomeFinanzas';
import ConsultaMovimientos from '../../screens/ConsultaMovimientos';

const Drawer = createDrawerNavigator();


const NavegadorFinanzas = ()=>{

    return(
        <Drawer.Navigator
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
        </Drawer.Navigator>
    );
}

export default NavegadorFinanzas;