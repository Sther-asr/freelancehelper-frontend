import React,{useState} from "react";
import {Text, View, TouchableOpacity, Alert, ScrollView, Modal} from "react-native";
import {StylesTarea} from './styles/Styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useContextUsuario from "../hook/useContextUsuario";
import {actualizarActividad} from '../requestBackend/API-Actividad';
import { actualizarRecordatorio } from "../requestBackend/API-Recordatorios";
import AlertModalInfoTareas from "./AlertModalInfoTareas";

const ProtectoItem = ({infoProyecto}) =>{

    //contexto con informacion de sesion
    const infoUsuario = useContextUsuario();

    const [modalVisible, setModalVisible] = useState(false);
    //estado inicial del checkbox
    const [estadoTarea, setEstadoTarea] = useState(infoTarea.item.estado ==="Activo"? false : true);
    //console.log(infoTarea.item.descripcion + '-->' + estadoTarea);
    return(
        <View style={StylesTarea.container}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
                <AlertModalInfoTareas
                    onPress={() => setModalVisible(!modalVisible)}
                    informacion={infoTarea.item}
                    titulo={`Información ${infoTarea.item.idRecordatorio=== undefined? 'Tarea':'Recordatorio'}`}
                    textBtn={"OK"}
                    colorBtnOcultar="pink"
                    colorFondoModal="#afafaf70"
                    altura='80%'
                />
            </Modal>

            <TouchableOpacity style={StylesTarea.containerInfo} onPress={()=>setModalVisible(!modalVisible)}>

                <Text style={StylesTarea.titulo}>
                    {infoTarea.item.descripcion}
                </Text>

                <View style={StylesTarea.containerFlex}>

                    <Text style={StylesTarea.hora}>
                        {infoTarea.item.fechaFin.slice(11, 16)}
                    </Text>

                    <Text style={StylesTarea.hora}>#Etiqueta</Text>

                </View>

            </TouchableOpacity>
        </View>
    );
}

export default Tarea;