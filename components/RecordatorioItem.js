import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { StylesTarea } from "./styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { eliminarRecordatorio } from "../requestBackend/API-Recordatorios";
import AlertModalInfo from "./AlertModalInfo";
import {
    responsiveScreenHeight,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";

const Recordatorio = ({ infoRecordatorio }) => {
  //contexto con informacion de sesion
  const infoUsuario = useContextUsuario();
  const [modalVisible, setModalVisible] = useState(false);

  const eliminarRecordatorios = async (id) => {
    const data = await eliminarRecordatorio({
      sesion: true,
      idSesion: infoUsuario.idPersona,
      idRecordatorio: id
    });
    console.log("infoRecordatorio", id);
    console.log(data);
  };

  return (
    <View style={[StylesTarea.container, { borderTopWidth: 0 }]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <AlertModalInfo
                    onPress={() => setModalVisible(!modalVisible)}
                    informacion={infoRecordatorio.item}
                    textBtn={"Cerrar"}
                    colorBtnOcultar="pink"
                    colorFondoModal="#afafaf70"
                    altura={responsiveScreenHeight(70)}
                />
      </Modal>

      <TouchableOpacity
        style={[StylesTarea.containerInfo]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoRecordatorio.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoRecordatorio.item.fechaFin.slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoRecordatorio.item.estado}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eliminarRecordatorios(infoRecordatorio.item.idRecordatorio)}>
        {/* Logo */}
        <Image
          //   style={StylesConsultasOrganizador.logo}
          source={require("../assets/icons/trash.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Recordatorio;