import React,{useState, useEffect} from "react";
import {Text, View, TouchableOpacity, Alert, ScrollView, Modal, Image} from "react-native";
import {StylesTarea} from './styles/Styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useContextUsuario from "../hook/useContextUsuario";
import {actualizarActividad} from '../requestBackend/API-Actividad';
import { actualizarRecordatorios } from "../requestBackend/API-Recordatorios";
import { procesoRegistroIngresoProyecto } from "../requestBackend/API-Diarias";
import AlertModalInfoTareas from "./AlertModalInfoTareas";
import {validarRangoFechaInicioFin} from "../fuciones/validador";

const Tarea = ({infoTarea, actualizarLista}) =>{
    const fechaTarea = new Date((infoTarea.item.fechaFin).slice(0,10)+"T"+(infoTarea.item.fechaFin).slice(11,16)).toISOString().slice(0,10);
    // estado para cambiar el color e icono de tarea atrasada
    const [atrasada, setAtrasada] = useState(false);
    //contexto con informacion de sesion
    const infoUsuario = useContextUsuario();

    const fechaActual = new Date().toISOString().slice(0, 16);

    // console.log(fechaActual.slice(0,10)+" === "+fechaTarea)

    // funcion para determinar si la tarea esta atrasada
    const handleStyleAtrasada = () =>{
        if(fechaActual.slice(0,10) !== fechaTarea){
            setAtrasada(true);
        }
    }
    useEffect(()=>{
        handleStyleAtrasada();
    },[])
    // handleStyleAtrasada();

    //funcion para cambiar estado de la tarea
    const actualizaEstado = async ()=>{
        if(infoTarea.item.estado === null && infoTarea.item.persona_idPersona === null){
            Alert.alert('¡AVISO!','Esto no es una tarea actualizable',[{text:'Entiendo!'}])
            return;
        }
        if(infoTarea.item.idActividad != null){
            const data = await actualizarActividad({
                "sesion": true,
                "idSesion": infoUsuario.idPersona,
                "descripcion": infoTarea.item.descripcion,
                "fechaInicio":infoTarea.item.fechaInicio,
                "fechaFin":infoTarea.item.fechaFin,
                "estado": (estadoTarea?"Activo":"Terminado"),
                "idActividad":infoTarea.item.idActividad,
                "idProyecto":infoTarea.item.idProyecto
            });
            if(data.resultado === true && data.info.affectedRows !==0){
                const data2 = await procesoRegistroIngresoProyecto(
                    {
                        "sesion":true,
                        "idSession": infoUsuario.idPersona,
                        "idProyecto":infoTarea.item.idProyecto,
                        "fecha": fechaActual
                    }
                );
                console.log(JSON.stringify(data2));
            }
        }
        
        if(infoTarea.item.idRecordatorio != null){
            const data = await actualizarRecordatorios({
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
        actualizarLista();

    }

    const [modalVisible, setModalVisible] = useState(false);
    //estado inicial del checkbox
    const [estadoTarea, setEstadoTarea] = useState(infoTarea.item.estado ==="Activo"? false : true);
    //console.log(infoTarea.item.descripcion + '-->' + estadoTarea);
    return(
        <View style={[StylesTarea.container,]}>

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

            {
                atrasada?
                (
                    <Image
                        style={[{width:10, height:40, marginRight:5}]}
                        source={require("../assets/icons/exclamacion.png")}
                    />
                ):(
                    <View></View>
                )
            }

            <TouchableOpacity style={[(atrasada ? {width:"75%"}: StylesTarea.containerInfo)]} onPress={()=>setModalVisible(!modalVisible)}>

                <Text style={StylesTarea.titulo}>
                    {infoTarea.item.descripcion}
                </Text>

                <View style={StylesTarea.containerFlex}>

                    <Text style={StylesTarea.hora}>
                        {infoTarea.item.fechaFin.slice(0, 16)}
                    </Text>

                    <Text style={[StylesTarea.hora, StylesTarea.etiqueta,
                        {backgroundColor:(infoTarea.item.idActividad===undefined?"#F56783":"#a197ff"), color:"white"}]}
                    ># {infoTarea.item.idActividad===undefined?"Recordatorio":"Actividad"}</Text>

                </View>

            </TouchableOpacity>

            <View style={[StylesTarea.containerCheckBox]}>
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