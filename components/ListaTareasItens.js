import React,{useState, useEffect, useCallback} from "react";
import {Text, View, TouchableOpacity,FlatList, RefreshControl} from "react-native";
import {styles, StylesListaTareas} from './styles/Styles';
import Tarea from './TareaIten';
import { consultaTareasDiarias } from "../requestBackend/API-Diarias";
import useContextUsuario from "../hook/useContextUsuario";


const ListaTareasIten = ()=>{
    // control estado actualizar
    const [estadoActualizar, setEstadoActualizar] = useState(false);
    // informacion del contexto de usuario
    const infoUsuario = useContextUsuario();
    //variable para las tareas obtenidas de la bdd
    const [dataTareas, setDataTareas] = useState([]);
    // obteniendo la fecha actual del dispositivo
    const fecha = new Date();
    const fechaActual = `${fecha.getFullYear()}-${fecha.getMonth()+1>=13 ? 12 : fecha.getMonth()+1}-${fecha.getDate()}`;
    
    useEffect(()=>{
        consultaTareasDiarias();
    },[]);

    const consultarTareas = async() =>{

        const infoSolicitud = {
            "sesion": true,
            "idSession": infoUsuario.idPersona,
            "fechaFin" : fechaActual,
            "estado": 1
        }
        console.log(JSON.stringify(infoSolicitud));
        const data = await consultaTareasDiarias(infoSolicitud);
        if(data[0]==undefined){
            setDataTareas([
                {
                    "idActividad": "01",
                    "descripcion": "Usted no posee actividades hoy, !Mire Netflx!",
                    "fechaInicio": "2022-09-18 00:00:00",
                    "fechaFin":"2022-06-17 00:00:00",
                    "estado": null,
                    "proyecto_idProyecto":"01",
                    "idProyecto":"01",
                    "persona_idPersona": infoUsuario.idPersona
                }
            ]);
        }else{
            setDataTareas(data);
        }
        // console.log(dataTareas.length);
        // const nuevoArray = [];
        // //setDataTareas(data);
        // for (let index = 0; index < dataTareas.length; index++){
        //     //dataTareas[index].assign(dataTareas[index],{'idReferencia': `${index}-Ref`});
        //     const referencia = `${index}-ref`;
        //     dataTareas[index].;
        //     console.log(JSON.stringify(dataTareas[index]));
        // }
        //console.log(JSON.stringify(dataTareas));
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
    const dibujarItens = (tarea) =>{
        return(
         <Tarea infoTarea={tarea}/>
        );
    }

    return(
        <View style={StylesListaTareas.container}>
            <View style={StylesListaTareas.cabeceraLista}>
                <Text style={StylesListaTareas.tituloCabeceraLista}>LISTA DE TAREAS</Text>
            </View>
            <FlatList
                data={dataTareas}
                keyExtractor={(item) => {item.fechaInicio + '_' + item.fechaFin}}
                renderItem={dibujarItens}
                refreshControl={
                    <RefreshControl
                        refreshing={estadoActualizar}
                        onRefresh={actualizarActiva}
                        colors={['white']}
                        progressBackgroundColor='#FEB529'
                    />
                }               
            />
        </View>
    );
}

export default ListaTareasIten;