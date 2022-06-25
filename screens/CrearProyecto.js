import React,{useState} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin, validarCifrasNumericas } from "../fuciones/validador";
import { registrarProyecto} from "../requestBackend/API-Proyectos";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import {styles, StylesCrearRecordatorio, StylesHome} from '../components/styles/Styles'


const CrearProyecto = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 10);

    const [fecha, cargarFecha] = useState({"fechaInicio":"", "fechaFin":""});
    const [hora, cargarHora] = useState({"horaInicio":"", "horaFin":""});

    const [infoProyecto, cargarInfoProyecto] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "descripcion": "",
        "monto":"",
        "fechaInicio":fechaActual, 
        "fechaFin":fechaActual.slice(0 , 8),
        "estado":"Activo"
    });
    // funcion para restablecer los campos input
    const restablecerCampos = ()=>{
        cargarInfoProyecto({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "monto":"",
            "fechaInicio":fechaActual, 
            "fechaFin":fechaActual.slice(0 , 8),
            "estado":"Activo"
        });
        cargarFecha({"fechaInicio":"", "fechaFin":""});
        cargarHora({"horaInicio":"", "horaFin":""});
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargarEstado = (index,valor, tipoState) =>{
        if(tipoState === "infoProyecto"){
           cargarInfoProyecto({...infoProyecto, [index]:valor}); 
        }
        if(tipoState === "fecha"){
            cargarFecha({...fecha, [index]:valor}); 
        }
        if(tipoState === "hora"){
            cargarHora({...hora, [index]:valor}); 
        }
        //console.log(JSON.stringify(infoProyecto));
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        if(infoProyecto.descripcion===''|| infoProyecto.descripcion ===null){
            Alert.alert(
                'Descripcion invalida', 'El campo \'descripción\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        if(infoProyecto.monto == '' || infoProyecto.monto===null){
            Alert.alert(
                'Monto invalido', 'El campo \'monto\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        if(validarCifrasNumericas(infoProyecto.monto)){
            Alert.alert(
                'Monto invalido', 'El campo \'monto\' solo permite numeros y puntos, ejemplo: "10.32"',[{text:'Entiendo'}]
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
        const fecha_inicio = `${fecha.fechaInicio}T${hora.horaInicio}:00`;
        const fecha_fin = `${fecha.fechaFin}T${hora.horaFin}:00`;
        cargarInfoProyecto({...infoProyecto, "fechaInicio":fecha_inicio, "fechaFin":fecha_fin});
        /////////////////////////////////
        if(!validarRangoFechaInicioFin(infoProyecto)){
            Alert.alert(
                'Rango de tiempo invalido', `La fecha incial "${infoProyecto.fechaInicio}" no puede ser mayor a la fecha final "${infoProyecto.fechaFin}"`,[{text:'Entiendo'}]
            );
            return;
        }
        handleCrearProyecto();
    }

    // funcion para realizar el registro
    const handleCrearProyecto = async () =>{
        const respuesta = await registrarProyecto(infoProyecto);
        if(!respuesta.registro === true){
            Vibration.vibrate(1500);
            Alert.alert(
                'El proyecto no se pudo crear', `Situacion:\n ${respuesta.resultado === undefined? JSON.stringify(respuesta): JSON.stringify(respuesta.resultado)}`,[{text:'Entiendo'}]
            );
        }else{
            Vibration.vibrate(200);
            Alert.alert(
                '¡Aviso!', 'Proyecto creado on exito',[{text:'Entiendo', onPress: ()=>restablecerCampos()}]
            );
        }
    }

    return (
        <ScrollView style={[StylesHome.container]}>
            <HeaderMenuPersonalizado
                title={"Crear Proyecto"}
                togleMenu={() => props.navigation.openDrawer()}
                saludo={"❤¡Hola, "}
                nombreUsuario={infousuario.nombrePersona}
            />
            {/* Logo */}
            <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')} />

            {/**formulario contenedor */}
            <View style={[{ alignItems: 'center' }, StylesCrearRecordatorio.containerFormulario]}>
                <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                {/* Saludo */}
                <View style={[StylesCrearRecordatorio.containerSaludo]}>
                    <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 33, width: 45 }]} source={require('../assets/icons/Icon-proyecto-color.png')} />
                    <Text style={StylesCrearRecordatorio.saludo}>Proyecto</Text>
                </View>

                {/*Entrada descripcion*/}
                <View style={[StylesCrearRecordatorio.containerInput]}>
                    <Image
                        source={require('../assets/icons/Tag_Título_del_Tag.png')}
                        style={[StylesCrearRecordatorio.inputPNG]}
                    />
                    <TextInput
                        onChangeText={(textoEntrando) => handleCargarEstado("descripcion", textoEntrando, "infoProyecto")}
                        value={infoProyecto.descripcion}
                        placeholder="Descripción"
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
                        onChangeText={(textoEntrando) => handleCargarEstado('monto', textoEntrando, "infoProyecto")}
                        value={infoProyecto.monto}
                        placeholder="monto"
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

        </ScrollView>
    );
}

export default CrearProyecto;