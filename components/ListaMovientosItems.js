import React,{useState, useEffect, useCallback} from "react";
import {Text, View, FlatList, RefreshControl, Image, TouchableOpacity } from "react-native";
import {styles, StylesListaTareas, StylesListaMovimientos} from './styles/Styles';
import MovimientoItem from "./MovimientoItem";
import { consultaMovimientos } from "../requestBackend/API-Diarias";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from '@react-navigation/native';



const ListaMovientosItems = ({datas}) => {
    // control estado actualizar
    const [estadoActualizar, setEstadoActualizar] = useState(false);
    // informacion del contexto de usuario
    const infoUsuario = useContextUsuario();
    //variable para las tareas obtenidas de la bdd
    const [dataMovimientos, setDataMovimientos] = useState([
        {"motivo":"No posee movimientos", 
        "monto":"0,00", 
        "fecha":"0000/00/00 00:00", 
        "proyecto_idProyecto":null, 
        "persona_idPersona":null, 
        "idEgreso":null}
    ]);
    // obteniendo la fecha actual del dispositivo
    const fechaActual = new Date().toISOString().slice(0, 10);
    const isFocus = useIsFocused();
    
    
    
    useEffect(()=>{
        console.log("Consultando los movimientos del mes");
        obtenerMovimientos("Mensual");
    },[isFocus]);

    // funcion para cambiar el estado al actualizar la lista de tareas
    const actualizarActiva = useCallback(async () => {
        // cargando el estado de refreshing
        setEstadoActualizar(true);
        // ejecutar de forma asincrona la funcion de llamar las tareas
        obtenerMovimientos("Mensual");
        // cargando el estado de refreshing
        setEstadoActualizar(false);
    });

    //funcion que dibuja cada elemento pasado a traves del llamado del flatList
    const dibujarItens = ({item}) => {      
        const tipo = item.idEgreso === undefined ? "Ingreso" : "Egreso";
        return (
            <MovimientoItem 
                tipo={tipo}
                motivo={item.motivo}
                monto={item.monto}
                fecha={item.fecha}
            />
        );
    }

    // funcion para realizar la consulta
    const obtenerMovimientos = async (periodo) =>{
        if(periodo === "Mensual"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fecha": fechaActual,
                "tipo": "Mensual"
            });
            console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }
        }

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