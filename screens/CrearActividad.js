import React,{useState} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import { styles, StylesHome } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin, validarCifrasNumericas } from "../fuciones/validador";
import { registrarProyecto} from "../requestBackend/API-Proyectos";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";


const CrearActividad = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 10);

    const [infoActividad, cargarInfoActividad] = useState({
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
        cargarInfoActividad({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "monto":"",
            "fechaInicio":fechaActual, 
            "fechaFin":fechaActual.slice(0 , 8),
            "estado":"Activo"
        });
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargar = (index,valor) =>{
        cargarInfoActividad({...infoActividad, [index]:valor});
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        if(infoActividad.descripcion===''|| infoActividad.descripcion ===null){
            Alert.alert(
                'Descripcion invalida', 'El campo \'descripción\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        if(infoActividad.monto == '' || infoActividad.monto===null){
            Alert.alert(
                'Monto invalido', 'El campo \'monto\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        if(validarCifrasNumericas(infoActividad.monto)){
            Alert.alert(
                'Monto invalido', 'El campo \'monto\' solo permite numeros y puntos, ejemplo: "10.32"',[{text:'Entiendo'}]
            );
            return;
        }
        let resultado = validarDatosRegistroPersona(infoActividad);
        if(resultado.result != true){
            Alert.alert(
                'Fecha invalida', resultado.alerta,[{text:'Entiendo'}]
            );
            return;
        }
        if(!validarRangoFechaInicioFin(infoActividad)){
            Alert.alert(
                'Rango de tiempo invalido', `La fecha incial "${infoActividad.fechaInicio}" no puede ser mayor a la fecha final "${infoActividad.fechaFin}"`,[{text:'Entiendo'}]
            );
            return;
        }
        handleCrearProyecto();
    }

    // funcion para realizar el registro
    const handleCrearProyecto = async () =>{
        const respuesta = await registrarProyecto(infoActividad);
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
                togleMenu={()=>props.navigation.openDrawer()}
                saludo={"❤¡Hola, "}
                nombreUsuario={infousuario.nombrePersona}
            />

            <View style={{width:'100%', padding:10, alignItems:'flex-end'}}>
                <Text style={[styles.textlogo,{fontSize:30, fontWeight:'700',marginRight:'10%', marginTop:30}]}>¡Nueva actividad para!</Text>
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
                        value={infoActividad.descripcion}
                        placeholder="Descripcion"
                        style={styles.input}
                        placeholderTextColor="#B3B3B3"
                    />
                </View>

                {/*entrada monto*/}
                <View style={[styles.containerInput]}>
                    <Image
                        source={require('../assets/inputTemp.png')}
                        style={[styles.PNGinput]}
                    />

                    <TextInput
                        onChangeText={(textoEntrando) => handleCargar('monto', textoEntrando)}
                        value={infoActividad.monto}
                        placeholder="monto"
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
                        value={infoActividad.fechaInicio}
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
                        value={infoActividad.fechaFin}
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

export default CrearActividad;