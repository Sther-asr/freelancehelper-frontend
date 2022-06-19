import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavegadorStack from './components/navigator/Stack';
import { elementos } from './requestBackend/dataEjemplo';





export default function App() {
  return (
    <NavigationContainer>
      <NavegadorStack/>
    </NavigationContainer>
    // <View style={{backgroundColor:'#feb529', paddingTop:80, marginTop:90}}>
    //   <MenuFlotanteOrganizador/>
    // </View>
  );
}
