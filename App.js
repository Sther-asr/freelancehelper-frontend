import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavegadorStack from './components/navigator/Stack';
import { elementos } from './requestBackend/dataEjemplo';
import ListaTareasIten from './components/screens/ListaTareasItens';





export default function App() {
  return (
    <NavigationContainer>
      <NavegadorStack/>
    </NavigationContainer>
    // <View style={{backgroundColor:'#feb529', paddingTop:80}}>
    //   <ListaTareasIten arregloTareas={elementos}/>
    // </View>
  );
}
