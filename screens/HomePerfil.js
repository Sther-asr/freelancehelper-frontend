import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import { StylesPerfil } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { Dimensions, Modal, Alert, Vibration } from "react-native";
import PerfilContraseñaModal from "../components/PerfilContraseñaModal";
import { validarDatosRegistroPersona } from "../fuciones/validador";
import { actualizarPerfil } from "../requestBackend/API-Diarias";
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
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  // Datos
  const [nombrePersona, setNombre] = useState(infoUsuario.nombrePersona);
  const [usuario, setUsuario] = useState(infoUsuario.usuario);
  const [correo, setCorreo] = useState(infoUsuario.correo);
  const [perfil, setPerfil] = useState({
    sesion: true,
    idSession: infoUsuario.idPersona,
    nombrePersona: "",
    usuario: "",
    correo: "",
  });
  //Handler para habilitar or desabilitar TextInput
  const [isEditable, setIsEditable] = useState(false);


  // UseEffect
  useEffect(() => {
    console.log(perfil);
    if (perfil.nombrePersona === "" || perfil.usuario === "" || perfil.correo === "") return;
    handleUpdatePerfil();
  }, [perfil]);
  // funcion para validar los campos antes de enviar
  const validarCampos = () => {
    console.log("Validar campos");
    console.log(nombrePersona);
    // Validar nombrePersona
    let resultado = validarDatosRegistroPersona({
      nombrePersona: nombrePersona,
      usuario: usuario,
      correo: correo,
    });
    if (resultado.result !== true) {
      console.log("Error");
      Alert.alert("Actualización inválida", resultado.alerta, [
        { text: "Entiendo" },
      ]);
      return;
    } else {
      setPerfil({
        ...perfil,
        nombrePersona: nombrePersona,
        usuario: usuario,
        correo: correo,
      });
    }
    // // Validar usuario
    // resultado = validarDatosRegistroPersona({ datos: usuario });
    // if (resultado.result != true) {
    //   Alert.alert("Nombre inválido", resultado.alerta, [{ text: "Entiendo" }]);
    //   return;
    // } else {
    //   setPerfil({
    //     ...perfil,
    //     usuario: usuario,
    //   });
    // }
    // // Validar correo
    // resultado = validarDatosRegistroPersona({ datos: correo });
    // if (resultado.result != true) {
    //   Alert.alert("Nombre inválido", resultado.alerta, [{ text: "Entiendo" }]);
    //   return;
    // } else {
    //   setPerfil({
    //     ...perfil,
    //     correo: correo,
    //   });
    // }
  };
  //función para habilitar/desabilitar la edicion
  const enableInputs = () => {
    setIsEditable(!isEditable);
  };
  // funcion para realizar el registro
  const handleUpdatePerfil = async () => {
    console.log("handleUpdatePerfil");
    const respuesta = await actualizarPerfil(perfil);
    if (!respuesta.resultado === true) {
      
      //Vibration.vibrate(1500);
      Alert.alert(
        "El perfil no se pudo actualizar",
        `Situacion:\n ${
          respuesta.resultado === undefined
            ? JSON.stringify(respuesta)
            : JSON.stringify(respuesta.resultado)
        }`,
        [{ text: "Entiendo" }]
      );
      // return;
    } else {
      Vibration.vibrate(200);
      Alert.alert("¡Aviso!", "Perfil actualizado con exito", [
        { text: "Entiendo"},
      ]);
      // onPress: () => restablecerCampos()
      // props.navigation.navigate("Organizador", { perfil });
      setIsEditable(false);
    }
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
              onChangeText={setNombre}
              value={nombrePersona}
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
              onChangeText={setUsuario}
              value={usuario}
              style={StylesPerfil.input}
              placeholder={"usuario"}
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
              onChangeText={setCorreo}
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
              onPress={isEditable ? validarCampos : () => setModalVisible(true)}
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
                altura={"50%"}
                colorBtnOcultar={"#00CE97"}
                textBtn={"Cerrar"}
              />
            </Modal>
          </View>
          {/**Modal de ayuda */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePerfil;
