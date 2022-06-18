import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList,Text} from 'react-native';
import Tarea from './TareaIten';
import { elementos } from '../../requestBackend/dataEjemplo';
import ListaTareasIten from './ListaTareasItens';



const HomeOrganizador = ()=>{

    return(
        <View style={{backgroundColor:'#feb529', paddingTop:80}}>
            <StatusBar backgroundColor='white'/>
            <ListaTareasIten arregloTareas={elementos}/>
        </View>
    );
}

export default HomeOrganizador;