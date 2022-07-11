import React, { useState, useEffect } from "react";
import {  View, FlatList } from "react-native";
import { StylesListaTareas } from "./styles/Styles";
import { consultarActividades } from "../requestBackend/API-Actividad";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";
import Actividad from "./ActividadItem";

const ListaProyectosItem = ({idProyecto}) => {
  
  // informacion del contexto de usuario
  const infoUsuario = useContextUsuario();
  //variable para las tareas obtenidas de la bdd
  const [dataActividades, setDataActividades] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const isFocus = useIsFocused();

  useEffect(() => {
    consultaActividades();
  }, [isFocus]);

  useEffect(() => {
    consultaActividades();
  }, [actualizar]);

  const consultaActividades = async () => {
    const infoSolicitud = {
      sesion: true,
      idSesion: infoUsuario.idPersona,
      idProyecto: idProyecto
    };
    console.log(JSON.stringify(infoSolicitud));
    const data = await consultarActividades(infoSolicitud);
    //console.log(JSON.stringify(data));
    if (data[0] == undefined) {
        setDataActividades([
        {
          idProyecto: "00",
          descripcion: "Usted no posee actividades en este proyecto, ¡ingrese unos!",
          fechaFin: "0000-00-00",
          fechaInicio: "0000-00-00",
          estado: "activo",
          idActividad:"00",
          monto:"00.00"
        },
      ]);
    } else {
        setDataActividades(data);
    }
  };

  //funcion que dibuja cada elemento pasado a traves del llamado del flatList
  const dibujarItems = (actividad) => {
    return <Actividad 
    infoActividad={actividad}
    idProyecto={idProyecto}
    actualizar={()=> setActualizar(!actualizar)} />;
  };

  return (
    <View style={StylesListaTareas.container}>
      <FlatList
        data={dataActividades}
        keyExtractor={(item) => item.idActividad}
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
};

export default ListaProyectosItem;
