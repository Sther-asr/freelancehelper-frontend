import { StyleSheet, Button, View, FlatList,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeOrganizador from '../../screens/HomeOrganizador';
import CrearRecordatorio from '../../screens/CrearRecordatorio';
import CrearProyecto from '../../screens/CrearProyecto';
import CrearActividad from '../../screens/CrearActividad';

const Drawer = createDrawerNavigator();

const Pantalla =()=>{
    return(
        <View>
            <Text>Pantalla prueba</Text>
        </View>
    );
}

const NavegadorOrganizador = ()=>{

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
                name='HomeOrganizador'
                component={HomeOrganizador}
            />
            <Drawer.Screen
                name='CrearRecordatorio'
                component={CrearRecordatorio}
            />
            <Drawer.Screen
                name='CrearProyecto'
                component={CrearProyecto}
            />
            <Drawer.Screen
                name='CrearActividad'
                component={CrearActividad}
            />
        </Drawer.Navigator>
    );
}

export default NavegadorOrganizador;