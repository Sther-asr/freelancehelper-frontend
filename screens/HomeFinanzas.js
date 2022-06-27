import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useContextUsuario from "../hook/useContextUsuario";
import { StylesHome, StylesHomeFinanzas, styles, StylesConsultaMovimientos } from "../components/styles/Styles";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import MostrarCifra from "../components/MostrarCifra";

const HomeFinanzas = (props) => {
  // trayendo info contexto
  const infoUsuario = useContextUsuario();
  // obteniendo la fecha actual del dispositivo
  const fecha = new Date();

  return (
    <ScrollView style={[{ backgroundColor: "#feb529" }]}>
      <SafeAreaView style={[StylesHome.container, StylesHomeFinanzas.colorFondo, StylesConsultaMovimientos.todoAlto]}>
        <StatusBar backgroundColor="white" />
        {/**Menu Personalizado */}
        <HeaderMenuPersonalizado
          //   saludo="❤Hola, "
          togleMenu={() => props.navigation.openDrawer()}
          propfecha={false}
        />
        {/* </View> */}
        <View style={[{ width: '84%', marginHorizontal: '8%', alignItems: 'center' }]}>

          <MostrarCifra
            titulo={"Saldo"}
            monto={"1000,00"}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          <MostrarCifra
            titulo={"Egresos Mensuales"}
            monto={"300,45"}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          <MostrarCifra
            titulo={"Ahorro"}
            monto={"200,30"}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          {/*Button */}
          <TouchableOpacity
            style={[styles.boton, { backgroundColor: '#EF7F9D', width: '85%' }]}
            onPress={() => props.navigation.navigate("ConsultaMovimientos")}
          >
            <Text style={[styles.textBoton, { color: 'white' }]}>Consultar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeFinanzas;