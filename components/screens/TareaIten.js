import React,{useState} from "react";
import {Text, View, TouchableOpacity,} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import {StylesTarea} from '../styles/Styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";

EStyleSheet.build();

const Tarea = ({infoTarea}) =>{
    console.log(infoTarea, '.......')
    const [estadoTarea, setEstadoTarea] = useState(false);
    return(
        <View style={StylesTarea.container}>

            <View style={StylesTarea.containerInfo}>

                <Text style={StylesTarea.titulo}>
                    {infoTarea.item.descripcion}
                </Text>

                <View style={StylesTarea.containerFlex}>

                    <Text style={StylesTarea.hora}>
                        {infoTarea.item.fechaFin}
                    </Text>

                    <Text style={StylesTarea.hora}>#Etiqueta</Text>

                </View>

            </View>

            <View style={StylesTarea.containerCheckBox}>
                <BouncyCheckbox 
                    onPress={() => {console.log('press')}}
                    size={38}
                    fillColor='#B3B3B3'
                />
            </View>
        </View>
    );
}

export default Tarea;