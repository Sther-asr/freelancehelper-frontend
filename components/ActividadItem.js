import React, { useState, useEffect } from "react";
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
import ModalAlert from "./ModalAlert";
import {
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const Actividad = ({ infoActividad, idProyecto, actualizar}) => {

  //contexto con informacion de sesion
  const infoUsuario = useContextUsuario();
  const [modalVisible, setModalVisible] = useState(false);
  //estados para utilizar el ModalAlert
  const [visual, setVisual] = useState(false);
  const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});
  // efecto para llamar el modal
  useEffect(() => {
    if (info.subTitulo === "" || info.parrafo === "" || info.titulo === "") { return }
    setVisual(true);
  }, [info]);
  //limpiar la info del modal al ocultarla
  useEffect(() => {
    if (visual === false) {
      setInfo({ "titulo": "", "subTitulo": "", "parrafo": "" });
    }
  }, [visual]);

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
    <View style={[StylesTarea.container, { borderTopWidth: 0, }]}>
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
        style={[StylesTarea.containerInfo, {marginRight:'9%'}]}
        onPress={() => {
          infoActividad.item.monto === "00.00" && infoActividad.item.idProyecto ==="00" && infoActividad.item.idProyecto==="00" ?
          setInfo({"titulo":"Alerta","subTitulo":"Actividad invalida", "parrafo":"Esto no es una actividad ¡Cree una!"}):
          setModalVisible(!modalVisible)
        }}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoActividad.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {(infoActividad.item.fechaFin).slice(0, 10) +" "+(infoActividad.item.fechaFin).slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoActividad.item.estado}</Text>
        </View>
      </TouchableOpacity>
      {
        infoActividad.item.estado !== "Terminado" ?
        (
            <TouchableOpacity
              onPress={() => {
                infoActividad.item.monto === "00.00" && infoActividad.item.idProyecto === "00" && infoActividad.item.idProyecto === "00" ?
                  setInfo({ "titulo": "Alerta", "subTitulo": "Actividad invalida", "parrafo": "Esto no es una actividad ¡No se puede eliminar!" }) :
                  eliminaActividad(infoActividad.item.idActividad)
              }}
            >
              <Image source={require("../assets/icons/trash.png")} />
            </TouchableOpacity>
        ):(
            <View></View>
        )
      }
      {/**Modal alert */}
      <ModalAlert
        VisibleModal={visual}
        setVisibleModal={() => setVisual(!visual)}
        textTitleModal={info.titulo}
        textSubtilulo={info.subTitulo}
        textParrafo={info.parrafo}
        backgroundColor="#A3A3A380"
        backgroundColorButton="#ffdd9b"
      />
    </View>
  );
};

export default Actividad;
