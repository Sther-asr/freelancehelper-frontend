import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useContextUsuario from "../hook/useContextUsuario";
import { nombreDia, nombreMes } from "../fuciones/DiaMesEspanol";
import { StylesHome } from "../components/styles/Styles";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";

const HomeFinanzas = (props) => {
  // trayendo info contexto
  const infoUsuario = useContextUsuario();
  // obteniendo la fecha actual del dispositivo
  const fecha = new Date();

  return (
    // <ScrollView style={[{ backgroundColor: "#feb529" }]}>
      <SafeAreaView style={[StylesHome.container]}>
        <StatusBar backgroundColor="white" />
        {/**Menu Personalizado */}
        <HeaderMenuPersonalizado
        //   saludo="❤Hola, "
          togleMenu={() => props.navigation.openDrawer()}
          propfecha={false}
        />
        {/* </View> */}
      </SafeAreaView>
    // </ScrollView>
  );
};

export default HomeFinanzas;