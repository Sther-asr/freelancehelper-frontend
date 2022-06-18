import React,{useState, useEffect} from "react";
import {Text, View, TouchableOpacity,FlatList} from "react-native";
import {styles, StylesListaTareas} from '../styles/Styles';
import Tarea from './TareaIten';


const ListaTareasIten = ({arregloTareas})=>{

    //funcion que dibuja cada elemento pasado a traves del llamado del flatList
    const dibujarItens = (tarea) =>{
        return(
         <Tarea infoTarea={tarea}/>
        );
    }

    return(
        <View style={StylesListaTareas.container}>
            <View style={StylesListaTareas.cabeceraLista}>
                <Text style={StylesListaTareas.tituloCabeceraLista}>LISTA DE TAREAS</Text>
            </View>
            <FlatList
                data={arregloTareas}
                keyExtractor={(item) => item.id}
                renderItem={dibujarItens}                  
            />
        </View>
    );
}

export default ListaTareasIten;