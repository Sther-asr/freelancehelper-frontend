import React,{useState, useEffect, useCallback} from "react";
import { View, FlatList, RefreshControl} from "react-native";
import { StylesListaTareas} from './styles/Styles';
import Recordatorio from './RecordatorioItem';
import { consultarRecordatorios } from "../requestBackend/API-Recordatorios";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from '@react-navigation/native';


const ListaRecordatoriosItem = (props)=>{

    // informacion del contexto de usuario
    const infoUsuario = useContextUsuario();
    //variable para las tareas obtenidas de la bdd
    const [dataRecordatorios, setDataRecordatorios] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const isFocus = useIsFocused();
    
    useEffect(()=>{
        consultarRecordatorio();
    },[isFocus]);

    const consultarRecordatorio = async() =>{

        const infoSolicitud = {
            "sesion": true,
            "idSesion": infoUsuario.idPersona
        }
        console.log(JSON.stringify(infoSolicitud));
        const data = await consultarRecordatorios(infoSolicitud);
        if(data[0]==undefined){
            setDataRecordatorios([
                {
                    "idRecordatorio": "00",
                    "descripcion": "Usted no posee recordatorios, ¡ingrese unos!",
                    "fechaFin": "Hoy",
                    "fechaInicio": "Hoy",
                    "estado": "activo",
                    "persona_idPersona": infoUsuario.idPersona
                }
            ]);
        }else{
            setDataRecordatorios(data);
        }
    }

    //funcion que dibuja cada elemento pasado a traves del llamado del flatList
    const dibujarItems = (recordatorio) =>{
        return(
         <Recordatorio 
         infoRecordatorio={recordatorio} 
         actualizar={()=> setActualizar(!actualizar)}/>
        );
    }

    return(
        <View style={StylesListaTareas.container}>
            
            <FlatList
                data={dataRecordatorios}
                keyExtractor={(item) => item.idRecordatorio}
                renderItem={dibujarItems}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={estadoActualizar}
                //         onRefresh={actualizarActiva}
                //         colors={['white']}
                //         progressBackgroundColor='#FEB529'
                //     />
                // }               
            />
        </View>
    );
}

export default ListaRecordatoriosItem;