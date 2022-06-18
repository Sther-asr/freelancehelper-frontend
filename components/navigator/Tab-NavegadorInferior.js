import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text, Image} from 'react-native';
import { createBottomTabNavigator,useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import NavegadorOrganizador from './Drawer-NavegadorOrganizador';

const Tab = createBottomTabNavigator();

const Pantalla1 =()=>{
    return(
        <View>
            <Text>Pantalla prueba 1000</Text>
        </View>
    );
}

const Pantalla2 =()=>{
    return(
        <View>
            <Text>Pantalla prueba 2000</Text>
        </View>
    );
}

const NavegadorInferior = (props)=>{
    return(
        <Tab.Navigator
            initialRouteName='HomeOrganizador'
            screenOptions={({route})=>({
                
                tabBarActiveTintColor:'#FEB529',
                //funcion para cambiar los iconos del menu inferior
                tabBarIcon: ({focused}) =>{
                    let iconoElement ='';
                    switch (route.name) {
                        case 'HomeOrganizador':
                            iconoElement = focused ? require('../../assets/icons/Menu-organizador-color.png') : require('../../assets/icons/Menu-organizador.png');
                            break;
                        case 'Finanzas':
                            iconoElement = focused ? require('../../assets/icons/Menu-Finanzas-color.png') : require('../../assets/icons/Menu-Finanzas.png');
                            break;
                        case 'Perfil':
                            iconoElement = focused ? require('../../assets/icons/Menu-Perfil.png') : require('../../assets/icons/Menu-Perfil.png');
                            break;
                        default:
                            break;
                    }
                    return(<Image source={iconoElement} style={[StylesNavInferior.iconoSeccion,{height:33}]}/>);
                }
            })
            
            }
        >
            <Tab.Screen
                name='HomeOrganizador'
                component={NavegadorOrganizador}
                options={{
                    headerShown:false,
                    title:"Organizador",
                }}
            />
            
            <Tab.Screen
                name='Finanzas'
                component={Pantalla1}
                options={{
                    headerShown:false,
                    title:"Finazas",
                }}
            />

            <Tab.Screen
                name='Perfil'
                component={Pantalla2}
                options={{
                    headerShown:false,
                    title:"Perfil",
                }}
            />
            
        </Tab.Navigator>
    );
}

export const StylesNavInferior = StyleSheet.create({
    iconoSeccion:{
        width: 32,
        height:30
    }
});

export default NavegadorInferior;