import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { StylesTarea } from "./styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { eliminarRecordatorio } from "../requestBackend/API-Recordatorios";
import AlertModalInfo from "./AlertModalInfo";
import {
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const Recordatorio = ({ infoRecordatorio, actualizar }) => {
  //contexto con informacion de sesion
  const infoUsuario = useContextUsuario();
  const [modalVisible, setModalVisible] = useState(false);

  //estados para utilizar el ModalAlert
  const [visual, setVisual] = useState(false);
  const [info, setInfo] = useState({ titulo: "", subTitulo: "", parrafo: "" });
  // efecto para llamar el modal
  useEffect(() => {
    if (info.subTitulo === "" || info.parrafo === "" || info.titulo === "") {
      return;
    }
    setVisual(true);
  }, [info]);
  //limpiar la info del modal al ocultarla
  useEffect(() => {
    if (visual === false) {
      setInfo({ titulo: "", subTitulo: "", parrafo: "" });
    }
  }, [visual]);

  const eliminarRecordatorios = async (id) => {
    const data = await eliminarRecordatorio({
      sesion: true,
      idSesion: infoUsuario.idPersona,
      idRecordatorio: id
    });
    if (data.affectedRows != 0) {
      console.log("idActividad", id);
      console.log(data);
      actualizar();
    }
  };

  return (
    <View style={[StylesTarea.container, { borderTopWidth: 0 }]}>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <AlertModalInfo
          onPress={() => {
            setModalVisible(!modalVisible);
            actualizar();
          }}
          informacion={infoRecordatorio.item}
          textBtn={"Cerrar"}
          colorBtnOcultar="pink"
          colorFondoModal="#afafaf70"
          altura={responsiveScreenHeight(70)}
        />
      </Modal>

      <TouchableOpacity
        style={[StylesTarea.containerInfo]}
        onPress={() => {
          infoRecordatorio.item.idRecordatorio === "00" &&
          infoRecordatorio.item.fechaInicio === "Hoy"
            ? setInfo({
                titulo: "Alerta",
                subTitulo: "Recordatorio inválido",
                parrafo: "Esto no es un recordatorio, ¡cree uno!",
              })
            : setModalVisible(!modalVisible);
        }}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoRecordatorio.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {(infoRecordatorio.item.fechaFin).slice(0, 10) +" "+(infoRecordatorio.item.fechaFin).slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoRecordatorio.item.estado}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          infoRecordatorio.item.idRecordatorio === "00" &&
          infoRecordatorio.item.fechaInicio === "Hoy"
            ? setInfo({
                titulo: "Alerta",
                subTitulo: "Recordatorio inválido",
                parrafo: "Esto no es un recordatorio, ¡cree uno!",
              })
            : eliminarRecordatorios(infoRecordatorio.item.idRecordatorio);
        }}
      >
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
