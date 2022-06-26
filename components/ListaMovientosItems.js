import React,{useState, useEffect, useCallback} from "react";
import {Text, View, FlatList, RefreshControl, Image, TouchableOpacity } from "react-native";
import {styles, StylesListaTareas, StylesListaMovimientos} from './styles/Styles';
import MovimientoItem from "./MovimientoItem";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from '@react-navigation/native';



const ListaMovientosItems = (props) => {
    // control estado actualizar
    const [estadoActualizar, setEstadoActualizar] = useState(false);
    // informacion del contexto de usuario
    const infoUsuario = useContextUsuario();
    //variable para las tareas obtenidas de la bdd
    const [dataMovimientos, setDataMovimientos] = useState([
        {"motivo":"Compra", "monto":"1300,47", "fecha":"2020-06-25", "proyecto_idProyecto":"1", "persona_idPersona":"4", "idEgreso":"1"},
        {"motivo":"Pago", "monto":"3000,00", "fecha":"2020-06-24", "proyecto_idProyecto":"1", "persona_idPersona":"4", "idIngreso":"1"},
        {"motivo":"Compra", "monto":"1300,47", "fecha":"2020-06-25", "proyecto_idProyecto":"1", "persona_idPersona":"4", "idEgreso":"1"},
        {"motivo":"Pago", "monto":"3000,00", "fecha":"2020-06-24", "proyecto_idProyecto":"1", "persona_idPersona":"4", "idIngreso":"1"},
        {"motivo":"Compra", "monto":"1300,47", "fecha":"2020-06-25", "proyecto_idProyecto":"1", "persona_idPersona":"4", "idEgreso":"1"},
        {"motivo":"Pago", "monto":"3000,00", "fecha":"2020-06-24", "proyecto_idProyecto":"1", "persona_idPersona":"4", "idIngreso":"1"}
    ]);
    // obteniendo la fecha actual del dispositivo
    const fechaActual = new Date().toISOString().slice(0, 10);
    // const isFocus = useIsFocused();
    // console.log(fechaActual);
    
    
    // useEffect(()=>{
    //     //consultarTareas();
    // },[isFocus]);

    // funcion para cambiar el estado al actualizar la lista de tareas
    const actualizarActiva = useCallback(async () => {
        // cargando el estado de refreshing
        setEstadoActualizar(true);
        // ejecutar de forma asincrona la funcion de llamar las tareas
        //await consultarTareas();
        // cargando el estado de refreshing
        setEstadoActualizar(false);
    });

    //funcion que dibuja cada elemento pasado a traves del llamado del flatList
    const dibujarItens = ({item}) => {
        
        const tipo = item.idEgreso === undefined ? "Ingreso" : "Egreso";console.log(JSON.stringify(tipo))
        return (
            <MovimientoItem 
                tipo={tipo}
                motivo={item.motivo}
                monto={item.monto}
                fecha={item.fecha}
            />
        );
    }

    return (
        <View style={[StylesListaTareas.container,{height:'53%'}]}>
            <View style={[StylesListaTareas.cabeceraLista,{flexDirection:'row', alignItems:'center'}]}>
                <Image
                    source={require("../assets/icons/Flecha-1-finanzas.png")}
                    style={[{width:24, height:22, marginRight:'2%',}]}
                />
                <Text style={[StylesListaTareas.tituloCabeceraLista, {color:'#B3B3B3', marginRight:'5%'}]}>Transacciones</Text>
                {/**botones de rango MES */}
                <TouchableOpacity style={[StylesListaMovimientos.botonPequeno, {backgroundColor:'#00ce97', marginLeft:5}]}>
                    <Text style={[styles.textlogo, {fontWeight:'600'}]}>MES</Text>
                </TouchableOpacity>
                {/**botones de rango AÑO */}
                <TouchableOpacity style={[StylesListaMovimientos.botonPequeno, {backgroundColor:'gray', marginLeft:5}]}>
                    <Text style={[styles.textlogo, {fontWeight:'600'}]}>AÑO</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={dataMovimientos}
                keyExtractor={(item) => { return (item.fecha + '_' +  Math.random() + Math.random()) }}
                renderItem={dibujarItens}
                refreshControl={
                    <RefreshControl
                        refreshing={estadoActualizar}
                        onRefresh={actualizarActiva}
                        colors={['white']}
                        progressBackgroundColor='#97e5d0'
                    />
                }
            />
        </View>
    );
}

export default ListaMovientosItems;