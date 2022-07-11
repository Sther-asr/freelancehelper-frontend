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
import { eliminarProyectos } from "../requestBackend/API-Proyectos";
import AlertModalInfo from "./AlertModalInfo";
import ModalAlert from "./ModalAlert";
import {
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const Proyecto = ({infoProyecto, navegar, actualizarLista}) => {

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

  const eliminarProyecto = async (id) => {
    const data = await eliminarProyectos({
      sesion: true,
      idSession: infoUsuario.idPersona,
      idProyecto: id,
    });
    actualizarLista();
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
        onPress={() => {
            infoProyecto.item.idProyecto===0 && infoProyecto.item.persona_idPersona===undefined ?
            setInfo({"titulo":"Alerta","subTitulo":"Proyecto invalido", "parrafo":"Esto no es un proyecto ¡Cree uno!"}):
            navegar.navigate('Actividades', {"idProyecto":infoProyecto.item.idProyecto})
          }
        }
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoProyecto.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {(infoProyecto.item.fechaFin).slice(0, 10) +" "+(infoProyecto.item.fechaFin).slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoProyecto.item.estado}</Text>
        </View>
      </TouchableOpacity>
      {
        infoProyecto.item.estado !== "Terminado" ?
        (
            <TouchableOpacity
              onPress={() => {
                infoProyecto.item.idProyecto === 0 && infoProyecto.item.persona_idPersona === undefined ?
                  setInfo({ "titulo": "Alerta", "subTitulo": "Proyecto invalido", "parrafo": "Esto no es un proyecto ¡No se puede borrar!" }) :
                  eliminarProyecto(infoProyecto.item.idProyecto)

              }
              }
            >
              <Image source={require("../assets/icons/trash.png")} />
            </TouchableOpacity>
        ):(
          <View style={[{ height: 22, width: 29, marginRight: 0 }]}></View>
        )
      }
      <TouchableOpacity
       onPress={() => {
          infoProyecto.item.idProyecto===0 && infoProyecto.item.persona_idPersona===undefined ?
          setInfo({"titulo":"Alerta","subTitulo":"Proyecto invalido", "parrafo":"Esto no es un proyecto ¡No se puede editar!"}) :
          setModalVisible(!modalVisible)
        }
      }
      >
        <Image
          source={require("../assets/icons/ojoNormal.png")}
          style={[{ height: 22, width: 29, marginRight: 8, }]}
        />
      </TouchableOpacity>
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

export default Proyecto;
