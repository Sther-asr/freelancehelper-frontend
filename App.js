import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavegadorStack from './components/navigator/Stack';
import { elementos } from './requestBackend/dataEjemplo';
import {Provider } from 'react-native-paper';
import MovimientoItem from './components/MovimientoItem';
import ListaMovientosItems from './components/ListaMovientosItems';




export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <NavegadorStack/>
      </NavigationContainer>
    </Provider>
    // <View style={{backgroundColor:'#feb529', marginTop:90}}>
    //   <ListaMovientosItems/>
    // </View>
  );
}
