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
import { eliminarActividad } from "../requestBackend/API-Actividad";
import AlertModalInfo from "./AlertModalInfo";
import {
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const Actividad = ({ infoActividad, idProyecto, actualizar}) => {

  //contexto con informacion de sesion
  const infoUsuario = useContextUsuario();
  const [modalVisible, setModalVisible] = useState(false);

  const eliminaActividad = async (id) => {
    const data = await eliminarActividad({
      sesion: true,
      idSession: infoUsuario.idPersona,
      idProyecto: idProyecto,
      idActividad: id,
    });
    if (data.affectedRows != 0) {
      console.log("idActividad", id);
      console.log(data);
      actualizar();
    }
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
          onPress={() => {setModalVisible(!modalVisible); actualizar();}}
          informacion={infoActividad.item}
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
          # {infoActividad.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoActividad.item.fechaFin.slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoActividad.item.estado}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => eliminaActividad(infoActividad.item.idActividad)}
      >
        <Image source={require("../assets/icons/trash.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default Actividad;
