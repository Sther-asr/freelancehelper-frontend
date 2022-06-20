import React,{useState} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import { styles, StylesHome } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin } from "../fuciones/validador";
import { registrarRecordatorio } from "../requestBackend/API-Recordatorios";


const CrearRecordatorio = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fecha = new Date();
    
    const [infoTarea, cargarInfotarea] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "descripcion": "",
        "fechaInicio": "",
        "fechaFin": "",
        "estado": "Activo"
    });
    // funcion para restablecer los campos input
    const restablecerCampos = ()=>{
        cargarInfotarea({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "fechaInicio": "",
            "fechaFin": "",
            "estado": "Activo"
        });
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargar = (index,valor) =>{
        cargarInfotarea({...infoTarea, [index]:valor});
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        if(infoTarea.descripcion===''|| infoTarea.descripcion ===null){
            Alert.alert(
                'Descripcion invalida', 'El campo \'descripción\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        let resultado = validarDatosRegistroPersona(infoTarea);
        if(resultado.result != true){
            Alert.alert(
                'Fecha invalida', resultado.alerta,[{text:'Entiendo'}]
            );
            return;
        }
        if(!validarRangoFechaInicioFin(infoTarea)){
            Alert.alert(
                'Rango de tiempo invalido', `La fecha incial "${infoTarea.fechaInicio}" no puede ser mayor a la fecha final "${infoTarea.fechaFin}"`,[{text:'Entiendo'}]
            );
            return;
        }
        crearRecordatorio();
    }

    // funcion para realizar el registro
    const crearRecordatorio = async () =>{
        const respuesta = await registrarRecordatorio(infoTarea);
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
        <ScrollView style={[StylesHome.container]}>
            <View style={{width:'100%', padding:10, alignItems:'flex-end'}}>
                <Text style={[styles.textlogo,{fontSize:30, fontWeight:'700',marginRight:'10%', marginTop:30}]}>¡Agrega algo!</Text>
            </View>

            {/**formulario contenedor */}
            <View style={[{alignItems:'center'}]}>
                {/*entrada descripcion*/}
                <View style={[styles.containerInput]}>
                    <Image
                        source={require('../assets/inputTemp.png')}
                        style={[styles.PNGinput]}
                    />

                    <TextInput
                        onChangeText={(textoEntrando) => handleCargar('descripcion', textoEntrando)}
                        value={infoTarea.descripcion}
                        placeholder="Descripcion"
                        style={styles.input}
                        placeholderTextColor="#B3B3B3"
                    />
                </View>

                {/*entrada fecha inicio*/}
                <View style={[styles.containerInput]}>
                    <Image
                        source={require('../assets/icons/Menu-Calendario.png')}
                        style={[styles.PNGinput]}
                    />

                    <TextInput
                        onChangeText={(textoEntrando) => handleCargar('fechaInicio', textoEntrando)}
                        value={infoTarea.fechaInicio}
                        placeholder="Inicio 2000-01-01"
                        style={styles.input}
                        placeholderTextColor="#B3B3B3"
                    />
                </View>

                {/*entrada fecha fin*/}
                <View style={[styles.containerInput]}>
                    <Image
                        source={require('../assets/icons/Menu-Calendario-color.png')}
                        style={[styles.PNGinput]}
                    />

                    <TextInput
                        onChangeText={(textoEntrando) => handleCargar('fechaFin', textoEntrando)}
                        value={infoTarea.fechaFin}
                        placeholder="Fin 2000-02-02"
                        style={styles.input}
                        placeholderTextColor="#B3B3B3"
                    />
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

export default CrearRecordatorio;