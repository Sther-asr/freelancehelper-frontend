import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { styles } from "../components/styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { inicioSesion } from "../requestBackend/API-Usuarios";
import { consultaAllDatosPersona } from "../requestBackend/API-Persona";
import { useTogglePasswordVisibility } from "./useToggle";
import { validarContrasena } from "../fuciones/validador";

EStyleSheet.build();

const Login = (props) => {

  /*Delaracion de estados */
  const [usuario, cargarUsuario] = useState("");
  const [contrasena, cargarContrasena] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [errores, setErrores] = useState({ usuario: false, contrasena: false });
  // almacenar info estado
  const [datosUsuario, setDatosUsuario] = useState({});

  // Funcion para que pase al home después de modificar los useState
  useEffect(() => {
    if(JSON.stringify(datosUsuario) === "{}") return;
    console.log("Hola useEffect");
    console.log(JSON.stringify(datosUsuario));
    props.navigation.navigate("Organizador", { datosUsuario });
  }, [datosUsuario]);

  const solicitudLogin = async (pantalla) => {
    //props.navigation.navigate(pantalla);
    const datos = {
      usuario: usuario,
      contrasena: contrasena,
    };
    const dataUsuario = await inicioSesion(datos);
    if (dataUsuario.respuesta === undefined) {
      // console.log(data);
      obtenerDatosPersona(dataUsuario.persona_idPersona);
      return;
    }

    Alert.alert("Inicio de sesion dice", `${JSON.stringify(dataUsuario)}`, [
      { text: "Ok", onPress: () => console.log("los datos") },
    ]);
    console.log(JSON.stringify(dataUsuario));
  };

  const obtenerDatosPersona = async (idPersona) => {
    console.log(idPersona);

    const dataPersona = await consultaAllDatosPersona({
      sesion: true,
      idSession: idPersona,
    });
    // console.log("Persona")
    console.log(dataPersona);
    setDatosUsuario(dataPersona);
    
  };

  const validarCampos = () => {
    let resultado = validarContrasena(contrasena);
    if (resultado != true) {
      Alert.alert("Contraseña no permitida", resultado.contrasena, [
        { text: "Entiendo" },
      ]);
      return;
    }
    if (usuario === "" || usuario === null) {
      Alert.alert("Usuario invalido", "El campo usuario no puede estar vacio", [
        { text: "Entiendo" },
      ]);
      return;
    }
    solicitudLogin();
  };
  
  return (
    <ScrollView>
      <SafeAreaView style={[{ backgroundColor: "#F56783" }, styles.container]}>
        <StatusBar translucent={true} backgroundColor="#F56783" />
        {/* Logo */}
        <Image
          style={styles.logo}
          source={require("../assets/icons/Logo-sup.png")}
        />
        {/* Contenedor del texto del logo */}
        <View style={styles.containerFrase}>
          <Text style={styles.textlogo}>registrate </Text>
          <Image
            source={require("../assets/icons/Punto.png")}
            style={styles.puntoPNG}
          />
          <Text style={styles.textlogo}> organizate </Text>
          <Image
            source={require("../assets/icons/Punto.png")}
            style={styles.puntoPNG}
          />
          <Text style={styles.textlogo}> planea</Text>
        </View>
        {/* Contenedor del form */}
        <View style={styles.containerLogin}>
          <Image
            style={[styles.lineasup, { marginBottom: 30 }]}
            source={require("../assets/icons/Linea-sup.png")}
          />

          {/* Saludo */}
          <Text style={styles.saludo}>¡Hola de nuevo!</Text>

          {/*Input field User*/}
          <View style={[styles.containerInput]}>
            <Image
              source={require("../assets/icons/Menu-Perfil.png")}
              style={[styles.PNGinput]}
            />
            <TextInput
              onChangeText={cargarUsuario}
              value={usuario}
              placeholder="usuario"
              style={styles.input}
              placeholderTextColor="#B3B3B3"
            />
          </View>

          {/* campo contraseña*/}
          <View style={styles.containerInput}>
            <Image
              source={require("../assets/icons/clave.png")}
              style={[styles.PNGinput, { height: 34, marginTop: 8 }]}
            />

            <TextInput
              onChangeText={cargarContrasena}
              value={contrasena}
              placeholder="contraseña"
              style={[styles.input, { width: "68%" }]}
              placeholderTextColor="#B3B3B3"
              secureTextEntry={passwordVisibility}
            />
            <TouchableOpacity onPress={handlePasswordVisibility}>
              {
                //mostrar icono tachado
                passwordVisibility ? (
                  <Image
                    source={require("../assets/icons/ojoTachado.png")}
                    style={[
                      styles.PNGinput,
                      { height: 22.5, width: 30, marginTop: 12 },
                    ]}
                  />
                ) : (
                  //mostrar icono normal
                  <Image
                    source={require("../assets/icons/ojoNormal.png")}
                    style={[
                      styles.PNGinput,
                      { height: 22.5, width: 30, marginTop: 12 },
                    ]}
                  />
                )
              }
            </TouchableOpacity>
          </View>

          {/*Button */}
          <TouchableOpacity
            style={[styles.boton,{backgroundColor:"#00CE97" }]}
            onPress={validarCampos}
          >
            <Text style={[styles.textBoton, { color: "white"}]}>Ingresar</Text>
          </TouchableOpacity>

          {/*Seccion de Registro */}
          <View style={styles.registro}>
            <Text style={[styles.texto, { color: "#808080", marginTop: 20 }]}>
              ¿No posees cuenta?
            </Text>

            <TouchableOpacity
              style={[styles.boton, { marginBottom: 100 }]}
              onPress={() => props.navigation.navigate("Logup")}
            >
              <Text style={[styles.textBoton, { color: "#a197ff" }]}>
                REGÍSTRATE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
