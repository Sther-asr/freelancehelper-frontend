import React,{useState, useEffect, useCallback} from "react";
import {Text, View, FlatList, RefreshControl} from "react-native";
import {styles, StylesListaTareas} from './styles/Styles';
import Proyecto from './ProyectoItem';
import { consultaProyectos } from "../requestBackend/API-Proyectos";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from '@react-navigation/native';


const ListaProyectosItem = (props)=>{
    // control estado actualizar
    // const [estadoActualizar, setEstadoActualizar] = useState(false);
    // informacion del contexto de usuario
    const infoUsuario = useContextUsuario();
    //variable para las tareas obtenidas de la bdd
    const [dataProyectos, setDataProyectos] = useState([]);

    const isFocus = useIsFocused();
    
    
    useEffect(()=>{
        consultarProyectos();
    },[isFocus]);

    const consultarProyectos = async() =>{

        const infoSolicitud = {
            "sesion": true,
            "idSesion": infoUsuario.idPersona
        }
        console.log(JSON.stringify(infoSolicitud));
        const data = await consultaProyectos(infoSolicitud);
        //console.log(JSON.stringify(data));
        if(data[0]==undefined){
            setDataProyectos([
                {
                    "idProyecto": "01",
                    "descripcion": "Usted no posee proyectos, ¡ingrese unos!",
                    "fechaFin": "Hoy",
                    "fechaInicio": "Hoy",
                    "monto": "00",
                    "estado": "activo",
                    "persona_idPersona": infoUsuario.idPersona
                }
            ]);
        }else{
            setDataTareas(data);
        }
    }
   
    // funcion para cambiar el estado al actualizar la lista de tareas
    const actualizarActiva = useCallback(async ()=>{
        // cargando el estado de refreshing
        setEstadoActualizar(true);
        // ejecutar de forma asincrona la funcion de llamar las tareas
        await consultarTareas();
        // cargando el estado de refreshing
        setEstadoActualizar(false);
    });

    //funcion que dibuja cada elemento pasado a traves del llamado del flatList
    const dibujarItems = (proyecto) =>{
        return(
         <Proyecto infoProyecto={proyecto}/>
        );
    }

    return(
        <View style={StylesListaTareas.container}>
            <View style={StylesListaTareas.cabeceraLista}>
                <Text style={StylesListaTareas.tituloCabeceraLista}>LISTA DE TAREAS</Text>
            </View>
            <FlatList
                data={dataProyectos}
                keyExtractor={(item) => item.idProyecto}
                // keyExtractor={(item) => {return(item.fechaInicio + '_' + item.fechaFin + Math.random())}}
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

export default ListaProyectosItem;