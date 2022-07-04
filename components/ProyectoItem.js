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
import { eliminarProyectos } from "../requestBackend/API-Proyectos";
import AlertModalInfo from "./AlertModalInfo";
import {
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const Proyecto = ({infoProyecto, navegar}) => {

  //contexto con informacion de sesion
  const infoUsuario = useContextUsuario();
  const [modalVisible, setModalVisible] = useState(false);

  const eliminarProyecto = async (id) => {
    const data = await eliminarProyectos({
      sesion: true,
      idSession: infoUsuario.idPersona,
      idProyecto: id,
    });
    // console.log("idProyecto", id);
    // console.log(data);
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
          informacion={infoProyecto.item}
          textBtn={"Cerrar"}
          colorBtnOcultar="pink"
          colorFondoModal="#afafaf70"
          altura={responsiveScreenHeight(70)}
        />
      </Modal>

      <TouchableOpacity
        style={[StylesTarea.containerInfo]}
        onPress={() => navegar.navigate('Actividades', {"idProyecto":infoProyecto.item.idProyecto})}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoProyecto.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoProyecto.item.fechaFin.slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoProyecto.item.estado}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => setModalVisible(!modalVisible)}
      >
        <Image
          source={require("../assets/icons/Peril-Editar.png")}
          style={[{ height: 22, width: 22, marginRight: 8 }]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => eliminarProyecto(infoProyecto.item.idProyecto)}
      >
        <Image source={require("../assets/icons/trash.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default Proyecto;
