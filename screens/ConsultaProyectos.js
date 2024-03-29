import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import {
  StylesConsultasOrganizador,
  styles,
  StylesHome,
} from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from '@react-navigation/native';
import ListaProyectosItems from "../components/ListaProyectosItems";
import { consultaProyectos } from "../requestBackend/API-Proyectos";

const ConsultaProyectos = (props) => {
  // utilizando contexto de usuario
  const infoUsuario = useContextUsuario();
  const isFocus = useIsFocused();
  // realizando consulta cada vex que se accede a la pantalla
  useEffect(()=>{
    console.log("Consultando los proyectos");
    // obtenerProyectos();
},[isFocus]);

  // control estado actualizar
  const [estadoActualizar, setEstadoActualizar] = useState(false);
  // estado contenedor del resultado de la busqueda de movimientos
  const [dataProyectos, setDataProyectos] = useState([
    {
      descripcion: "No posee descripcion",
      monto: "0,00",
      fecha: "0000/00/00 00:00",
      idProyecto: null,
      persona_idPersona: null,
    },
  ]);
  // funcion para realizar la consulta
  const obtenerProyectos = async (periodo) => {
    const data = await consultaProyectos({
      sesion: true,
      idSesion: infoUsuario.idPersona,
    });
    if (data.length !== 0) {
      setDataProyectos(data);
    } else {
      setDataProyectos([
        {
          idProyecto: "01",
          descripcion: "Usted no posee proyectos",
          fechaInicio: "2022-09-18 00:00:00",
          fechaFin: "2022-06-17 00:00:00",
          estado: null,
          persona_idPersona: null,
          monto: "0",
        },
      ]);
    }
  };
  return (
    <SafeAreaView style={[{ backgroundColor: "#FFDD9B" }, styles.container]}>
      <StatusBar translucent={true} backgroundColor="#FFDD9B" />
      {/* Logo */}
      <Image
        style={StylesConsultasOrganizador.logo}
        source={require("../assets/icons/FreelanceHelper-gris.png")}
      />

      {/* Contenedor del form */}
      <View style={[StylesConsultasOrganizador.container]}>
        <Image
          style={[styles.lineasup, { marginBottom: 0, alignSelf: "center" }]}
          source={require("../assets/icons/Linea-sup.png")}
        />
        {/* Titulo + boton */}
        <View style={[{ flexDirection: "row", width: '80%', justifyContent: 'space-between'}]}>
          {/* Titulo */}
          <View style={[{ flexDirection: "row", alignSelf: "center"}]}>
            <Image
              style={[
                {alignSelf: "center", height: 27, width:37, marginRight: 8}
              ]}
              source={require("../assets/icons/Icon-proyecto-color.png")}
            />
            <Text style={{fontSize: 23, fontWeight: '500', color: '#666666'}}>Proyectos</Text>
          </View>
          {/* Boton azul */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CrearProyecto")}
          >
            <Image
              style={[StylesHome.botonNueva, {height: 32, width:32, alignSelf: "center", margin: 0}]}
              source={require("../assets/icons/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        
        <View style={[StylesHome.containerBtnNueva]}>

        </View>

        <ListaProyectosItems
        navegar={props.navigation}
            // estadoActualizar={estadoActualizar}
            // setEstadoActualizar={setEstadoActualizar}
            // datas={dataProyectos}
            // accionarConsulta={obtenerProyectos}
          />
      </View>
    </SafeAreaView>
  );
};

export default ConsultaProyectos;
