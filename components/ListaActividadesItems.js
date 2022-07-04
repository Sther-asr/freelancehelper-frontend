import React, { useState, useEffect, useCallback } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { styles, StylesListaTareas } from "./styles/Styles";
import { consultarActividades } from "../requestBackend/API-Actividad";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";
import Actividad from "./ActividadItem";

const ListaProyectosItem = ({idProyecto}) => {
  // control estado actualizar
  // const [estadoActualizar, setEstadoActualizar] = useState(false);
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
          idProyecto: "01",
          descripcion: "Usted no posee actividades en este proyecto, ¡ingrese unos!",
          fechaFin: "Hoy",
          fechaInicio: "Hoy",
          estado: "activo",
          idActividad:"01"
        },
      ]);
    } else {
        setDataActividades(data);
    }
  };

  // funcion para cambiar el estado al actualizar la lista de tareas
  const actualizarActiva = useCallback(async () => {
    // cargando el estado de refreshing
    setEstadoActualizar(true);
    // ejecutar de forma asincrona la funcion de llamar las tareas
    await consultarTareas();
    // cargando el estado de refreshing
    setEstadoActualizar(false);
  });

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
