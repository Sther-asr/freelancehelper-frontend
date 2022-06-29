import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import { StylesPerfil } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { Dimensions, StyleSheet } from "react-native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

const HomePerfil = (props) => {
  // trayendo info contexto
  const infoUsuario = useContextUsuario();
  const [datos, setDatos] = useState({
    sesion: true,
    idSession: infoUsuario.idPersona,
    usuario: "",
    correo: "",
    nombrePersona: "",
  });
  //funcion para actualizar cada uno de los elementos del estado inicial
  const handleCargarEstado = (index, valor, tipoState) => {
    if (tipoState === "datos") {
      setDatos({ ...datos, [index]: valor });
    }
    //console.log(JSON.stringify(datos));
  };
  //Handler para habilitar or desabilitar TextInput
  const [isEditable, setIsEditable] = useState(false);
  const enableInputs = () => {
    setIsEditable(!isEditable);
  };
  let text = isEditable ? "Guardar cambios" : "CAMBIAR CONTRASEÑA";

  return (
    <ScrollView style={[{ backgroundColor: "#F4B3C2" }]}>
      <SafeAreaView
        style={[
          {
            backgroundColor: "#F4B3C2",
            height: Dimensions.get("window").height,
          },
        ]}
      >
        <StatusBar backgroundColor="white" />
        {/**Menu Personalizado */}
        <HeaderMenuPersonalizado />
        <View style={[StylesPerfil.form]}>
          {/* Editar usuario */}
          <View style={[StylesPerfil.vieweditar]}>
            <TouchableOpacity onPress={() => enableInputs()}>
              <Image
                source={require("../assets/icons/Peril-Editar.png")}
                style={[StylesPerfil.PNGinput, { width: 25, height: 25 }]}
              />
            </TouchableOpacity>
          </View>
          {/* Imagen usuario*/}
          <Image
            source={require("../assets/icons/Perfil-color.png")}
            style={[StylesPerfil.imgUsuario]}
          />
          {/* campo nombre*/}
          <View style={StylesPerfil.containerInput}>
            <Image
              source={require("../assets/icons/Perfil-Nombre-usuario.png")}
              style={[StylesPerfil.PNGinput]}
            />

            <TextInput
              onChangeText={(textoEntrando) =>
                handleCargarEstado("nombrePersona", textoEntrando, "datos")
              }
              value={infoUsuario.nombrePersona}
              placeholder={"nombre"}
              style={StylesPerfil.input}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>
          {/* campo usuario*/}
          <View style={StylesPerfil.containerInput}>
            <Image
              source={require("../assets/icons/Perfil-Nombre-usuario.png")}
              style={[StylesPerfil.PNGinput]}
            />

            <TextInput
              onChangeText={(textoEntrando) =>
                handleCargarEstado("usuario", textoEntrando, "datos")
              }
              value={infoUsuario.nombrePersona}
              placeholder={"usuario"}
              style={StylesPerfil.input}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>
          {/* campo email*/}
          <View style={StylesPerfil.containerInput}>
            <Image
              source={require("../assets/icons/email.png")}
              style={[StylesPerfil.PNGinput, { height: 22, marginTop: 12 }]}
            />

            <TextInput
              onChangeText={(textoEntrando) =>
                handleCargarEstado("correo", textoEntrando, "datos")
              }
              value={infoUsuario.correo}
              placeholder={"correo"}
              style={StylesPerfil.input}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>

          {/*Seccion Dynamic Buttons */}
          <View>
            <TouchableOpacity
              style={isEditable ? StylesPerfil.saveChanges : ""}
              onPress={isEditable ? () => console.log("Hola") : ""}
            >
              <Text
                style={[
                  isEditable
                    ? StylesPerfil.textSaveChange
                    : StylesPerfil.textChangePassword,
                ]}
              >
                {text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePerfil;
