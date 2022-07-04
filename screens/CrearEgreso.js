import React,{useEffect, useState} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarCifrasNumericas } from "../fuciones/validador";
import { registrarEgreso } from "../requestBackend/API-Egresos";
import {styles, StylesCrearRecordatorio, StylesHome, StylesConsultaMovimientos, StylesHomeFinanzas} from '../components/styles/Styles'
import { SafeAreaView } from "react-native-safe-area-context";
import ModalAlert from "../components/ModalAlert";


const CrearEgreso = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 16);

    const [fecha, cargarFecha] = useState({"fecha":fechaActual.slice(0, 10)});
    const [hora, cargarHora] = useState({"hora":fechaActual.slice(11, 16)});

    const [infoEgreso, cargarInfoEgreso] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "motivo": "",
        "monto":"",
        "fecha":"",
        "persona_idPersona" : infousuario.idPersona
    });

    const [visual, setVisual] = useState(false);
    const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});
    // efecto para llamar el modal
    useEffect(()=>{
        if(info.subTitulo==="" || info.parrafo ==="" || info.titulo===""){return}
        setVisual(true);
    },[info]);
    //limpiar la info del modal al ocultarla
    useEffect(()=>{
        if(visual === false){
            setInfo({"titulo":"","subTitulo":"","parrafo":""});
        }
    },[visual]);

    // funcion para restablecer los campos input
    const restablecerCampos = ()=>{
        cargarInfoEgreso({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "motivo": "",
            "monto":"",
            "fecha":fechaActual,
            "persona_idPersona" : infousuario.idPersona
        });
        cargarFecha({"fecha":fechaActual.slice(0, 10)});
        cargarHora({"hora":fechaActual.slice(11, 16)});
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargarEstado = (index,valor, tipoState) =>{
        if(tipoState === "infoEgreso"){
           cargarInfoEgreso({...infoEgreso, [index]:valor}); 
        }
        if(tipoState === "fecha"){
            cargarFecha({...fecha, [index]:valor}); 
        }
        if(tipoState === "hora"){
            cargarHora({...hora, [index]:valor}); 
        }
        //console.log(JSON.stringify(infoEgreso));
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        if(infoEgreso.motivo===''|| infoEgreso.motivo ===null){
            setInfo({"titulo":"Alerta","subTitulo":"Motivo invalido", "parrafo":"El campo \'Motivo\' no puede estar vacio"});
            return;
        }
        if(infoEgreso.monto == '' || infoEgreso.monto===null){
            setInfo({"titulo":"Alerta","subTitulo":"Monto invalido", "parrafo":"El campo \'monto\' no puede estar vacio"});
            return;
        }
        if(validarCifrasNumericas(infoEgreso.monto)){
            setInfo({"titulo":"Alerta","subTitulo":"Monto invalido", "parrafo":"El campo \'monto\' solo permite numeros, comas y puntos (0-9 \",\" \".\") y un maximo de 2 decimales, ejemplo: \"10.32\""});
            return;
        }
        let resultado = validarDatosRegistroPersona(fecha);
        if(resultado.result != true){
            setInfo({"titulo":"Alerta","subTitulo":"Fecha invalida", "parrafo":resultado.alerta});
            return;
        }
        resultado = validarDatosRegistroPersona(hora);
        if(resultado.result != true){
            setInfo({"titulo":"Alerta","subTitulo":"Hora invalida", "parrafo":resultado.alerta});
            return;
        }
        ////////////////////////////////////
        cargarInfoEgreso({...infoEgreso, "fecha":`${fecha.fecha}T${hora.hora}:00`});
        
    }

    // funcion que se ejecuta al cambiar la fecha del estado de infoEgreso
    useEffect(()=>{
        if(infoEgreso.fecha!=="" && infoEgreso.monto!=="" && infoEgreso.motivo!==""){
            console.log(JSON.stringify(infoEgreso));
            handleCrearEgreso();
            cargarInfoEgreso({...infoEgreso, "fecha":""});
            return;
        }
    },[infoEgreso.fecha]);

    // funcion para realizar el registro
    const handleCrearEgreso = async () =>{
        const respuesta = await registrarEgreso(infoEgreso);
        if(!respuesta.registro === true){
            //Vibration.vibrate(1500);
            setInfo({"titulo":"Error","subTitulo":"El egreso no se pudo crear", "parrafo":`Situacion:\n ${respuesta.resultado === undefined? JSON.stringify(respuesta): JSON.stringify(respuesta.resultado)}`});
        }else{
            //Vibration.vibrate(200);
            restablecerCampos();
            setInfo({"titulo":"Crear egreso","subTitulo":"¡Aviso!", "parrafo":"Egreso creado con exito"});
        }
    }

    return (
        <ScrollView style={[StylesHome.container, StylesHomeFinanzas.colorFondo]}>
            <SafeAreaView style={[StylesConsultaMovimientos.todoAlto]}>
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario,{ alignItems: 'center' , height:'80%'}]}>
                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 37, width: 37 }]} source={require('../assets/icons/Egresos.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>Nuevo Egreso</Text>
                    </View>

                    {/*Entrada motivo*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_Título_del_Tag.png')}
                            style={[StylesCrearRecordatorio.inputPNG]}
                        />
                        <TextInput
                            onChangeText={(textoEntrando) => handleCargarEstado("motivo", textoEntrando, "infoEgreso")}
                            value={infoEgreso.motivo}
                            placeholder="Motivo"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*entrada monto*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_dinero.png')}
                            style={[StylesCrearRecordatorio.dualInputPNG,{marginTop:12}]}
                        />

                        <TextInput
                            onChangeText={(textoEntrando) => handleCargarEstado('monto', textoEntrando, "infoEgreso")}
                            value={infoEgreso.monto}
                            placeholder="Monto"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>


                    {/**campo fecha con hora */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Incio</Text>

                        <View style={[{ flexDirection: 'row' }]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '55%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("fecha", textoEntrando, "fecha")}
                                    value={fecha.fecha}
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
                                    onChangeText={(textoEntrando) => handleCargarEstado("hora", textoEntrando, "hora")}
                                    value={hora.hora}
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
                        <Text style={[styles.textBoton, { color: 'white' }]}>Crear</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {/**Modal alert */}
            <ModalAlert
                    VisibleModal={visual}
                    setVisibleModal={()=>setVisual(!visual)}
                    textTitleModal={info.titulo}
                    textSubtilulo={info.subTitulo}
                    textParrafo={info.parrafo}
                    backgroundColor="#A3A3A380"
                    backgroundColorButton="#97e5d0"
                />
        </ScrollView>
    );
}

export default CrearEgreso;