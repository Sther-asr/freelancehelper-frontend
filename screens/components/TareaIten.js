import React,{useState} from "react";
import {Text, View, TouchableOpacity, Alert, ScrollView, Modal} from "react-native";
import {StylesTarea} from './styles/Styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useContextUsuario from "../hook/useContextUsuario";
import {actualizarActividad} from '../requestBackend/API-Actividad';
import { actualizarRecordatorio } from "../requestBackend/API-Recordatorios";
import AlertModalInfoTareas from "./AlertModalInfoTareas";

const Tarea = ({infoTarea}) =>{

    //contexto con informacion de sesion
    const infoUsuario = useContextUsuario();

    //funcion para  mostrar la info de la tarea
    // const mostrarInfoTarea = ()=>{

    //     const cuerpoMensaje = `
    //         Descripción:\n
    //         ${infoTarea.item.descripcion}
    //         \n\nFecha de Inicio: \n${infoTarea.item.fechaInicio}
    //         \nFecha de culminación: \n${infoTarea.item.fechaFin}
    //         \nEstado terminada:\n ${estadoTarea ? 'Terminada':'No terminada'}
    //     `

    //     Alert.alert('Informacion actividad', cuerpoMensaje),
    //     [
    //         {text:"Ok", onPress: ()=>console.log('los datos')}
    //     ]
    // }


    //funcion para cambiar estado de la tarea
    const actualizaEstado = async ()=>{
        if(infoTarea.item.estado === null && infoTarea.item.persona_idPersona === null){
            Alert.alert('¡AVISO!','Esto no es una tarea actualizable',[{text:'Entiendo!'}])
            return;
        }
        let data = null;
        if(infoTarea.item.idActividad != null){
            data = await actualizarActividad({
                "sesion": true,
                "idSesion": infoUsuario.idPersona,
                "descripcion": infoTarea.item.descripcion,
                "fechaInicio":infoTarea.item.fechaInicio,
                "fechaFin":infoTarea.item.fechaFin,
                "estado": (estadoTarea?"Activo":"Terminado"),
                "idActividad":infoTarea.item.idActividad,
                "idProyecto":infoTarea.item.idProyecto
            });
        }
        
        if(infoTarea.item.idRecordatorio != null){
            data = await actualizarRecordatorio({
                "sesion": true,
                "idSesion": infoUsuario.idPersona,
                "descripcion": infoTarea.item.descripcion,
                "fechaInicio":infoTarea.item.fechaInicio,
                "fechaFin":infoTarea.item.fechaFin,
                "estado": (estadoTarea?"Activo":"Terminado"),
                "idRecordatorio": infoTarea.item.idRecordatorio
            });
        }
        setEstadoTarea(!estadoTarea); 
        console.log(JSON.stringify(data));

    }

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

            <View style={StylesTarea.containerCheckBox}>
                <BouncyCheckbox 
                    onPress={() => {actualizaEstado();}}
                    size={38}
                    fillColor='#B3B3B3'
                    isChecked={estadoTarea}
                />
            </View>
        </View>
    );
}

export default Tarea;