import { StyleSheet, Button, View, FlatList,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeOrganizador from '../screens/HomeOrganizador';

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
        <Drawer.Navigator>
            <Drawer.Screen
                name='HomeOrganizador'
                component={HomeOrganizador}
            />
            <Drawer.Screen
                name='PantallaPrueba'
                component={Pantalla}
            />
        </Drawer.Navigator>
    );
}

export default NavegadorOrganizador;