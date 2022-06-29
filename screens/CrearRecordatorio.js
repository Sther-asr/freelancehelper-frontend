import React,{useState, useEffect} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import { styles, StylesHome, StylesCrearRecordatorio,StylesConsultaMovimientos } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin } from "../fuciones/validador";
import { registrarRecordatorio } from "../requestBackend/API-Recordatorios";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import { SafeAreaView } from "react-native-safe-area-context";


const CrearRecordatorio = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 16);
    const [fecha, cargarFecha] = useState({"fechaInicio":fechaActual.slice(0, 10), "fechaFin":""});
    const [hora, cargarHora] = useState({"horaInicio":fechaActual.slice(11, 16), "horaFin":""});

    const [infoRecordatorio, cargarinfoRecordatorio] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "descripcion": "",
        "fechaInicio": "",
        "fechaFin": "",
        "estado": "Activo"
    });
    // funcion para restablecer los campos input
    const restablecerCampos = ()=>{
        cargarinfoRecordatorio({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "fechaInicio": "",
            "fechaFin": "",
            "estado": "Activo"
        });
        cargarFecha({"fechaInicio":fechaActual.slice(0, 10), "fechaFin":""});
        cargarHora({"horaInicio":fechaActual.slice(11, 16), "horaFin":""});
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargarEstado = (index,valor, tipoState) =>{
        if(tipoState === "infoRecordatorio"){
           cargarinfoRecordatorio({...infoRecordatorio, [index]:valor}); 
        }
        if(tipoState === "fecha"){
            cargarFecha({...fecha, [index]:valor}); 
        }
        if(tipoState === "hora"){
            cargarHora({...hora, [index]:valor}); 
        }
        //console.log(JSON.stringify(infoRecordatorio));
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        if(infoRecordatorio.descripcion===''|| infoRecordatorio.descripcion ===null){
            Alert.alert(
                'Descripcion invalida', 'El campo \'descripción\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        let resultado = validarDatosRegistroPersona(fecha);
        if(resultado.result != true){
            Alert.alert(
                'Fecha invalida', resultado.alerta,[{text:'Entiendo'}]
            );
            return;
        }
        resultado = validarDatosRegistroPersona(hora);
        if(resultado.result != true){
            Alert.alert(
                'Hora invalida', resultado.alerta,[{text:'Entiendo'}]
            );
            return;
        }
        ////////////////////////////////////
        cargarinfoRecordatorio({...infoRecordatorio, "fechaInicio":`${fecha.fechaInicio}T${hora.horaInicio}:00`, "fechaFin":`${fecha.fechaFin}T${hora.horaFin}:00`});
        /////////////////////////////////
    }
    useEffect(()=>{
        if(infoRecordatorio.fechaFin !=="" && infoRecordatorio.fechaInicio!==""){
            if(!validarRangoFechaInicioFin(infoRecordatorio)){
                Alert.alert(
                    'Rango de tiempo invalido', `La fecha incial "${infoRecordatorio.fechaInicio}" no puede ser mayor a la fecha final "${infoRecordatorio.fechaFin}"`,[{text:'Entiendo'}]
                );
                cargarinfoRecordatorio({...infoRecordatorio, "fechaInicio":"", "fechaFin":""});
                return;
            }
            //console.log(JSON.stringify(infoRecordatorio));
            handleCrearRecordatorio();
        }
        
    },[infoRecordatorio.fechaFin])

    // funcion para realizar el registro
    const handleCrearRecordatorio = async () =>{
        const respuesta = await registrarRecordatorio(infoRecordatorio);
        if(!respuesta.registro === true){
            Vibration.vibrate(1500);
            Alert.alert(
                'El recordatorio no se pudo crear', `Situacion:\n ${respuesta.resultado === undefined? JSON.stringify(respuesta): JSON.stringify(respuesta.resultado)}`,[{text:'Entiendo'}]
            );
        }else{
            Vibration.vibrate(200);
            Alert.alert(
                '¡Aviso!', 'Recordatorio creado con exito',[{text:'Entiendo', onPress: ()=>restablecerCampos()}]
            );
        }
    }

    return (
        <ScrollView style={[StylesHome.container]}>
            <SafeAreaView style={[StylesConsultaMovimientos.todoAlto]}>

                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario,{ alignItems: 'center' , height:'80%'}]}>

                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 30, width: 30 }]} source={require('../assets/icons/Icon-recordatorio-color.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>Recordatorio</Text>
                    </View>

                    {/*Entrada descripcion*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_Título_del_Tag.png')}
                            style={[StylesCrearRecordatorio.inputPNG]}
                        />
                        <TextInput
                            onChangeText={(textoEntrando) => handleCargarEstado("descripcion", textoEntrando, "infoRecordatorio")}
                            value={infoRecordatorio.descripcion}
                            placeholder="Descripción"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/**campo fecha con hora INCIO */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Incio</Text>

                        <View style={[{ flexDirection: 'row' }]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '55%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("fechaInicio", textoEntrando, "fecha")}
                                    value={fecha.fechaInicio}
                                    placeholder="año/mes/dia"
                                    style={[StylesCrearRecordatorio.input]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '40%', marginLeft: '5%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Tiempo.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("horaInicio", textoEntrando, "hora")}
                                    value={hora.horaInicio}
                                    placeholder="00:00"
                                    style={[StylesCrearRecordatorio.input, { width: '68%' }]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                        </View>
                    </View>

                    {/**campo fecha con hora FIN*/}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Finalización</Text>

                        <View style={[{ flexDirection: 'row' }]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '55%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("fechaFin", textoEntrando, "fecha")}
                                    value={fecha.fechaFin}
                                    placeholder="año/mes/dia"
                                    style={[StylesCrearRecordatorio.input]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '40%', marginLeft: '5%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Tiempo.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("horaFin", textoEntrando, "hora")}
                                    value={hora.horaFin}
                                    placeholder="00:00"
                                    style={[StylesCrearRecordatorio.input, { width: '68%' }]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                        </View>
                    </View>

                    {/*Button */}
                    <TouchableOpacity
                        style={[styles.boton, { backgroundColor: '#00CE97' }]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, { color: 'white' }]}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default CrearRecordatorio;