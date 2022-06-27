import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import { StylesPerfil } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { Dimensions, Modal } from "react-native";
import PerfilContraseñaModal from "../components/PerfilContraseñaModal";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

const Perfil = (props) => {
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  // Datos
  const [nombre, cargarNombre] = useState("");
  const [usuario, cargarUsuario] = useState("");
  const [correo, cargarCorreo] = useState("");

  // trayendo info contexto
  const infoUsuario = useContextUsuario();

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
              onChangeText={cargarNombre}
              value={nombre}
              placeholder={
                infoUsuario.nombrePersona ? infoUsuario.nombrePersona : "nombre"
              }
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
              onChangeText={cargarUsuario}
              value={usuario}
              placeholder={
                infoUsuario.usuario ? infoUsuario.usuario : "usuario"
              }
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
              onChangeText={cargarCorreo}
              value={correo}
              placeholder={infoUsuario.correo ? infoUsuario.correo : "correo"}
              style={StylesPerfil.input}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>

          {/*Seccion Dynamic Buttons */}
          <View>
            <TouchableOpacity
              style={isEditable ? StylesPerfil.saveChanges : ""}
              onPress={
                isEditable
                  ? () => console.log("Hola")
                  : () => setModalVisible(true)
              }
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <PerfilContraseñaModal
                onPress={() => setModalVisible(!modalVisible)}
                altura={'50%'}
                colorBtnOcultar={'#00CE97'}
                textBtn={'Cerrar'}
              />
            </Modal>
          </View>
          {/**Modal de ayuda */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Perfil;
