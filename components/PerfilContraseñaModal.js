import React, { useState, useEffect } from "react";
import {cambioContrasena} from '../requestBackend/API-Usuarios';
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona} from '../fuciones/validador';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { styles, StylesModal, StylesPerfil } from "./styles/Styles";

const PerfilContrasenaModal = ({
  onPress,
  informacion,
  colorBtnOcultar,
  textBtn,
  titulo,
  colorFondoModal,
  altura,
}) => {
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [activacion, setActivacion] = useState(false);

   // trayendo info contexto
   const infoUsuario = useContextUsuario();

  // funcion para verificar datos antes del registro
  const validarCampos = () => {
    let resultado = validarDatosRegistroPersona({
        correo: correo,
        contrasena: confirmacion
    });
    if (resultado.result != true) {
      Alert.alert(
        "Contrasena inválida.",
        resultado.alerta,
        [{ text: "Entiendo" }]
      );
      return;
    }
    cambiarContrasena();
  };

  const cambiarContrasena = async () => {
    const usuario = {
      "contrasena" : confirmacion,
      "correo" : correo
    };
    console.log(usuario);
    // Funcion que llama la API para el cambio de contrasena
    const resultado = await cambioContrasena(usuario);
    console.log(resultado);
    if (resultado.actualizacion == true) {
      Alert.alert(
        "Cambio de contraseña exitoso",
        "¡Listo!",
        [{ text: "Ok"}]
      );
      restablecerCampos();
    //   onPress;
    } else {
      Alert.alert(
        "Cambio inválido",
        "Revise sus datos",
        [{ text: "Entendido" }]
      );
    }
  };

  //restablecer todos los estados al estado inicial
  const restablecerCampos = () =>{
    setContrasena("");
    setConfirmacion("");
    setCorreo("");
}
// Código para cambiar el enable del boton dependiendo si el texto está vacio
//   const validate = (contrasena, confirmacion) => {
//     if (contrasena < 6 && confirmacion < 6 && contrasena != confirmacion) {
//       return console.log("Son diferentes");
//     }
//   };
//   const validacion = validate(contrasena, confirmacion);
//   console.log(validate(contrasena, confirmacion));

  return (
    <View
      style={[
        StylesModal.container,
        {
          backgroundColor:
            colorFondoModal === undefined ? "#AAAAAA50" : colorFondoModal,
        },
      ]}
    >
      <View
        style={[
          StylesModal.containerCuerpo,
          {
            height:
              altura === undefined
                ? StylesModal.containerCuerpo.height
                : altura,
          },
        ]}
      >
        {/* Botón ocultar */}
        <TouchableOpacity
          style={[
            StylesModal.botonCerrar,
            {
              backgroundColor:
                colorBtnOcultar === undefined ? "orange" : colorBtnOcultar,
              marginBottom: 10,
            },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>
            {textBtn === undefined ? "OCULTAR" : textBtn}
          </Text>
        </TouchableOpacity>
        {/* Fin del boton para ocultar */}
        <ScrollView>
          {/* View del form Contrasena */}
          <View
            style={[{ width: "100%", alignItems: "center", marginTop: "18%" }]}
          >
            {/* campo contrasena*/}
            <View style={StylesPerfil.containerInput}>
              <Image
                source={require("../assets/icons/clave.png")}
                style={[
                  StylesPerfil.PNGinput,
                  { width: 27, height: 31, marginTop: 8 },
                ]}
              />

              <TextInput
                onChangeText={setCorreo}
                value={correo}
                // onChange={""}
                placeholder={"correo"}
                style={StylesPerfil.input}
                placeholderTextColor="#B3B3B3"
              />
            </View>
            {/* Fin campo contrasena */}
            {/* campo confirmar contrasena*/}
            <View
              style={[StylesPerfil.containerInput, { marginBottom: "15%" }]}
            >
              <Image
                source={require("../assets/icons/clave.png")}
                style={[
                  StylesPerfil.PNGinput,
                  { width: 27, height: 31, marginTop: 8 },
                ]}
              />

              <TextInput
                onChangeText={setConfirmacion}
                value={confirmacion}
                // onChange={(ev) => validate(ev.target.value)}
                placeholder={"confirmar contrasena"}
                style={StylesPerfil.input}
                placeholderTextColor="#B3B3B3"
              />
            </View>
            {/* Fin campo confirmar contrasena */}
            {/* Botón guardar cambios */}
            <TouchableOpacity
              style={[
                StylesModal.botonCerrar,
                {
                  backgroundColor: activacion ? "#EDEDEC" : colorBtnOcultar,
                  marginBottom: "20%",
                  alignSelf: "center",
                },
              ]}
              onPress={validarCampos}
              //   disabled={contrasena && confirmacion ? activacion === false : activacion === true}
            >
              <Text style={[styles.textlogo, { fontWeight: "600" }]}>
                Guardar cambios
              </Text>
            </TouchableOpacity>
            {/* Fin boton guardar cambios */}
          </View>
          {/* Fin del form */}
        </ScrollView>
      </View>
    </View>
  );
};
export default PerfilContrasenaModal;
