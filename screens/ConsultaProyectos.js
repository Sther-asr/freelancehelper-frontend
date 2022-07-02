import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import {
  StylesConsultasOrganizador,
  styles,
  StylesHome,
} from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ListaProyectosItems from "../components/ListaProyectosItems";
import { consultaProyecto } from "../requestBackend/API-Proyectos";

const ConsultaProyectos = (props) => {
  // utilizando contexto de usuario
  const infoUsuario = useContextUsuario();
  // control estado actualizar
  const [estadoActualizar, setEstadoActualizar] = useState(false);
  // const isFocus = useIsFocused();

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
    const data = await consultaProyecto({
      sesion: true,
      idSession: infoUsuario.idPersona,
    });
    console.log(JSON.stringify(data));
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
        <View style={[{ flexDirection: "row", backgroundColor: "red"}]}>
          {/* Titulo */}
          <View style={[{ flexDirection: "row", justifyContent: 'flex-start' }]}>
            <Image
              style={[
                styles.lineasup,
                { marginBottom: 0, alignSelf: "center" },
              ]}
              source={require("../assets/icons/Icon-proyecto-color.png")}
            />
            <Text>Proyectos</Text>
          </View>
          {/* Boton azul */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CrearProyecto")}
          >
            <Image
              style={[StylesHome.botonNueva]}
              source={require("../assets/icons/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        
        <View style={[StylesHome.containerBtnNueva]}>

        </View>

        <ListaProyectosItems
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
