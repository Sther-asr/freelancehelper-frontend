import React,{useState} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import { styles, StylesHome, StylesCrearRecordatorio, StylesListaMovimientos , StylesConsultaMovimientos} from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin } from "../fuciones/validador";
import { registrarRecordatorio } from "../requestBackend/API-Recordatorios";
import ListaMovientosItems from "../components/ListaMovientosItems";
import { SafeAreaView } from "react-native-safe-area-context";


const ConsultaMovimientos = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 10);

    const [infoMovimientos, cargarinfoMovimientos] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "descripcion": "",
        "fechaInicio": fechaActual,
        "fechaFin": fechaActual.slice(0 , 8),
        "estado": "Activo"
    });
    // funcion para restablecer los campos input
    const restablecerCampos = ()=>{
        cargarinfoMovimientos({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "fechaInicio": "",
            "fechaFin": "",
            "estado": "Activo"
        });
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargarEstado = (index,valor, tipoState) =>{
        if(tipoState === "infoMovimientos"){
           cargarinfoMovimientos({...infoMovimientos, [index]:valor}); 
        }
        //console.log(JSON.stringify(infoMovimientos));
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        if(infoMovimientos.descripcion===''|| infoMovimientos.descripcion ===null){
            Alert.alert(
                'Descripcion invalida', 'El campo \'descripción\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        if(!validarRangoFechaInicioFin(infoMovimientos)){
            Alert.alert(
                'Rango de tiempo invalido', `La fecha incial "${infoMovimientos.fechaInicio}" no puede ser mayor a la fecha final "${infoMovimientos.fechaFin}"`,[{text:'Entiendo'}]
            );
            return;
        }
        console.log(JSON.stringify(infoMovimientos));
        //setTimeout(handleCrearRecordatorio, 300);
    }

    // funcion para realizar la consulta
    const handleCrearRecordatorio = async () =>{
        const respuesta = await registrarRecordatorio(infoMovimientos);
        if(!respuesta.registro === true){
            Vibration.vibrate(1500);
            Alert.alert(
                'El recordatorio no se pudo crear', `Situacion:\n ${respuesta.resultado === undefined? JSON.stringify(respuesta): JSON.stringify(respuesta.resultado)}`,[{text:'Entiendo'}]
            );
        }else{
            Vibration.vibrate(200);
            Alert.alert(
                '¡Aviso!', 'Recordatorio creado on exito',[{text:'Entiendo', onPress: ()=>restablecerCampos()}]
            );
        }
    }

    return (
        <View style={[ {backgroundColor:'#97e5d0'}, StylesConsultaMovimientos.todoAlto]}>
        
            <SafeAreaView>
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo,{marginVertical:'15%'}]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario ]}>

                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 30, width: 35 }]} source={require('../assets/icons/Billetera.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>Consultas</Text>
                    </View>

                    {/**campo rango de fecha*/}
                    <View style={[StylesConsultaMovimientos.containerInputDoble]}>
                        <Text style={[StylesConsultaMovimientos.textInputDoble]}>entre</Text>
                        <TextInput
                            onChange={(textoEntrando)=>{handleCargarEstado("fechaInicio",textoEntrando, "infoMovimientos")}}
                            value={infoMovimientos.fechaInicio}
                            placeholder="2020/01/01"
                            style={[StylesConsultaMovimientos.input]}
                            placeholderTextColor="#B3B3B3"
                        />
                        <Text style={[StylesConsultaMovimientos.textInputDoble]}>a</Text>
                        <TextInput
                            onChange={(textoEntrando)=>{handleCargarEstado("fechaFin",textoEntrando, "infoMovimientos")}}
                            value={infoMovimientos.fechaFin}
                            placeholder="2020/01/01"
                            style={[StylesConsultaMovimientos.input]}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*Button */}
                    <View style={[{flexDirection:'row', alignItems:'flex-start', width:'80%'}]}>
                    <TouchableOpacity
                        style={[StylesListaMovimientos.botonPequeno, { backgroundColor: '#00ce97', marginBottom:5 }]}
                        onPress={()=>{}}
                    >
                        <Text style={[styles.textBoton, { color: 'white' }]}>CONSULTAR</Text>
                    </TouchableOpacity>
                    </View>
                    {/**Lista de movimientos*/}
                    <ListaMovientosItems/>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default ConsultaMovimientos;