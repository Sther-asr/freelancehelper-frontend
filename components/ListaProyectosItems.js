import React, { useState, useEffect, useCallback } from "react";
import {View, FlatList, RefreshControl } from "react-native";
import {StylesListaTareas } from "./styles/Styles";
import Proyecto from "./ProyectoItem";
import { consultaProyectos } from "../requestBackend/API-Proyectos";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";

const ListaProyectosItem = (props) => {
  
  // informacion del contexto de usuario
  const infoUsuario = useContextUsuario();
  //variable para las tareas obtenidas de la bdd
  const [dataProyectos, setDataProyectos] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const isFocus = useIsFocused();

  useEffect(() => {
    consultarProyectos();
  }, [isFocus]);

  const consultarProyectos = async () => {
    const infoSolicitud = {
      sesion: true,
      idSesion: infoUsuario.idPersona,
    };
    const data = await consultaProyectos(infoSolicitud);
    if (data[0] == undefined) {
      setDataProyectos([
        {
          idProyecto: "00",
          descripcion: "Usted no posee proyectos, ¡ingrese unos!",
          fechaFin: undefined,
          fechaInicio: undefined,
          monto: "Pelaooo",
          estado: "activo",
          persona_idPersona: undefined,
        },
      ]);
    } else {
      setDataProyectos(data);
    }
  };

  //funcion que dibuja cada elemento pasado a traves del llamado del flatList
  const dibujarItems = (proyecto) => {
    return <Proyecto 
    infoProyecto={proyecto}
    navegar={props.navegar} 
    actualizar={()=> setActualizar(!actualizar)}
    />;
  };

  return (
    <View style={StylesListaTareas.container}>
      <FlatList
        data={dataProyectos}
        keyExtractor={(item) => item.idProyecto}
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
