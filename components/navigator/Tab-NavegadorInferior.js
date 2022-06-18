import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavegadorOrganizador from './Drawer-NavegadorOrganizador';

const Tab = createBottomTabNavigator();

const Pantalla1 =()=>{
    return(
        <View>
            <Text>Pantalla prueba 1000</Text>
        </View>
    );
}

const NavegadorInferior = (props)=>{
    return(
        <Tab.Navigator>
            <Tab.Screen
                name='HomeOrganizador'
                component={NavegadorOrganizador}
                options={{
                    headerShown:false,
                    title:"Pantalla 02",
                    tabBarIcon: () => (
                      <Image source={require('../../assets/icons/Menu-organizador.png')} style={{width:30, height: 40}}/>
                    )
                }}
            />
            
            <Tab.Screen
                name='Pantalla1'
                component={Pantalla1}
            />
            
        </Tab.Navigator>
    );
}

export default NavegadorInferior;