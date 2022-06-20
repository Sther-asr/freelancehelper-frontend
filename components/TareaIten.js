import React,{useState} from "react";
import {Text, View, TouchableOpacity, Alert, ScrollView} from "react-native";
import {StylesTarea} from './styles/Styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useContextUsuario from "../hook/useContextUsuario";
import {actualizarActividad} from '../requestBackend/API-Actividad';
import { Dialog, Portal, } from 'react-native-paper';
import { Text as Text2 } from 'react-native-paper';

const Tarea = ({infoTarea}) =>{
    // elementos necesarios para el area de dialogo BETA :(
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    //estado inicial del checkbox
    const [estadoTarea, setEstadoTarea] = useState(infoTarea.item.estado ==="Activo"? false : true);
    //contexto con informacion de sesion
    const infoUsuario = useContextUsuario();



    //funcion para  mostrar la info de la tarea
    const mostrarInfoTarea = ()=>{

        const cuerpoMensaje = `
            Descripción:\n
            ${infoTarea.item.descripcion}
            \n\nFecha de Inicio: \n${infoTarea.item.fechaInicio}
            \nFecha de culminación: \n${infoTarea.item.fechaFin}
            \nEstado terminada:\n ${estadoTarea ? 'Terminada':'No terminada'}
        `

        Alert.alert('Informacion actividad', cuerpoMensaje),
        [
            {text:"Ok", onPress: ()=>console.log('los datos')}
        ]
    }

    // funcion para mostrar la info de la tarea 2 BETA :(
    const mostrarInfoTarea2 = ()=>{
        return (
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>This is a title</Dialog.Title>
                    <Dialog.ScrollArea>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                            <Text2>This is a scrollable area</Text2>
                        </ScrollView>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>
        );
    }

    //funcion para cambiar estado de la tarea
    const actualizaEstado = async ()=>{
        if(infoTarea.item.estado === null){
            Alert.alert('¡AVISO!','Esto no es una tarea actualizable',[{text:'Entiendo!'}])
            return
        }
        const infoSolicitud = {
            "sesion": true,
            "idSesion": infoUsuario.idPersona,
            "descripcion": infoTarea.item.descripcion,
            "fechaInicio":infoTarea.item.fechaInicio,
            "fechaFin":infoTarea.item.fechaFin,
            "estado": (estadoTarea?"Activo":"Terminado"),
            "idActividad":infoTarea.item.idActividad,
            "idProyecto":infoTarea.item.idProyecto
        }
        console.log(infoSolicitud);
        const data = await actualizarActividad(infoSolicitud);
        
        console.log(JSON.stringify(data));

    }

    
    return(
        <View style={StylesTarea.container}>

            <TouchableOpacity style={StylesTarea.containerInfo} onPress={mostrarInfoTarea}>

                <Text style={StylesTarea.titulo}>
                    {infoTarea.item.descripcion}
                </Text>

                <View style={StylesTarea.containerFlex}>

                    <Text style={StylesTarea.hora}>
                        {infoTarea.item.fechaFin}
                    </Text>

                    <Text style={StylesTarea.hora}>#Etiqueta</Text>

                </View>

            </TouchableOpacity>

            <View style={StylesTarea.containerCheckBox}>
                <BouncyCheckbox 
                    onPress={() => {setEstadoTarea(!estadoTarea); actualizaEstado();}}
                    size={38}
                    fillColor='#B3B3B3'
                    isChecked={estadoTarea}
                />
            </View>
        </View>
    );
}

export default Tarea;