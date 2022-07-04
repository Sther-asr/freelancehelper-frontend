import React,{useState, useEffect, useCallback} from "react";
import {Text, View, FlatList, RefreshControl, Image, TouchableOpacity, StyleSheet} from "react-native";
import {styles, StylesListaTareas, StylesListaMovimientos} from './styles/Styles';
import MovimientoItem from "./MovimientoItem";



const ListaMovientosItems = ({datas, setEstadoActualizar, estadoActualizar, accionarConsulta}) => {

    // estado para los botonones
    const [fondoColor, setFondoColor] = useState(false);
    
    // funcion para cambiar el estado al actualizar la lista de tareas
    const actualizarActiva = useCallback(async () => {
        // cargando el estado de refreshing
        setEstadoActualizar(true);
        // ejecutar de forma asincrona la funcion de llamar las tareas
        accionarConsulta("Mensual");
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

    
    
    return (
        <View style={[StylesListaTareas.container,{height:'53%'}]}>
            <View style={[StylesListaTareas.cabeceraLista,{flexDirection:'row', alignItems:'center'}]}>
                <Image
                    source={require("../assets/icons/Flecha-1-finanzas.png")}
                    style={[{width:24, height:22, marginRight:'2%',}]}
                />
                <Text style={[StylesListaTareas.tituloCabeceraLista, {color:'#B3B3B3', marginRight:'5%'}]}>Transacciones</Text>
                {/**botones de rango MES */}
                <TouchableOpacity 
                    style={[StylesListaMovimientos.botonPequeno, (fondoColor? coloresFondo.gris :coloresFondo.verde )]}
                    onPress={()=>{accionarConsulta("Mensual"); setFondoColor(false)}}
                >
                    <Text style={[styles.textlogo, {fontWeight:'600'}]}>MES</Text>
                </TouchableOpacity>
                {/**botones de rango AÑO */}
                <TouchableOpacity 
                    style={[StylesListaMovimientos.botonPequeno, (fondoColor? coloresFondo.verde : coloresFondo.gris)]}
                    onPress={()=>{accionarConsulta("Anual"); setFondoColor(true)}}
                >
                    <Text style={[styles.textlogo, {fontWeight:'600'}]}>AÑO</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={datas}
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

const coloresFondo = StyleSheet.create({
    gris:{
        backgroundColor:'gray',
        marginLeft:5
    },
    verde:{
        backgroundColor:'#00ce97',
        marginLeft:5
    }
})

export default ListaMovientosItems;