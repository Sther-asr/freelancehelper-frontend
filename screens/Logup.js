import React,{useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import {Text, ScrollView, View, TextInput, Image, Dimensions, TouchableOpacity, Alert, Modal} from "react-native";
import {styles, StylesModal} from '../components/styles/Styles';
import {registrarPersona} from '../requestBackend/API-Personas';
import {useTogglePasswordVisibility} from "./useToggle";
import InfoModalAyudaRegistro from "../components/InfoModalAyudaRegistro";
import { validarDatosRegistroPersona} from '../fuciones/validador';
import ModalAlert from "../components/ModalAlert";

const Logup = (props) =>{
    /*Delaracion de estados */
    const [nombre,cargarNombre] = useState("");
    const [apellido,cargarApellido] = useState("");
    const [usuario, cargarUsuario] = useState("");
    const [correo, cargarCorreo] = useState("");
    const [contrasena, cargarContrasena] = useState("");
    const [fechaNacimiento,cargarFechaNacimiento] = useState("");
    const [datosPersona, cargarDatosPersona] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [modalVisible, setModalVisible] = useState(false);
    //restablecer todos los estados al estado inicial
    const restablecerCampos = () =>{
        cargarNombre("");
        cargarApellido("");
        cargarUsuario("");
        cargarCorreo("");
        cargarContrasena("");
        cargarFechaNacimiento("");
        cargarDatosPersona("");
        handlePasswordVisibility(true);
        setInfo({"titulo":"","subTitulo":"","parrafo":""});
    }
    const [visual, setVisual] = useState(false);
    const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});
    // efecto para llamar el modal
    useEffect(()=>{
        if(info.subTitulo==="" || info.parrafo ==="" || info.titulo===""){return}
        setVisual(true);
    },[info]);


    //funcion registrar
    const registrarNuevoUsuario = async ()=>{
        const persona = {
            "nombrePersona" : nombre,
            "apellidoPersona" : apellido,
            "fechaNacimiento" : fechaNacimiento,
            "usuario" : usuario,
            "correo" : correo,
            "contrasena" : contrasena
        }
        console.log(persona);
        const resultado = await registrarPersona(persona);
        console.log(resultado.registro);
        if(resultado.registro == true ) {
            // Alert.alert(
            //     "Registro exitoso, dirijase a inicio",
            //     `Bienvenido "${persona.nombrePersona + ' ' + persona.apellidoPersona}"`,
            //     [
            //         {text:"Ok", onPress: ()=>props.navigation.navigate('Login')}
            //     ]
            // );
            restablecerCampos();
            props.navigation.navigate('Login')
            
            }else{
            setInfo({"titulo":"Registro","subTitulo":"Registro invalido", "parrafo":"Revise sus datos, Usuario o correo ya existente"});
        }
    }

    // funcion para verificar datos antes del registro
    const validarCampos = () =>{
        let resultado = validarDatosRegistroPersona({
            "nombrePersona" : nombre,
            "apellidoPersona" : apellido,
            "fechaNacimiento" : fechaNacimiento,
            "usuario" : usuario,
            "correo" : correo,
            "contrasena" : contrasena
        });
        if(resultado.result != true){
            setInfo({"titulo":"Registro","subTitulo":"Aviso de registro invalido", "parrafo":resultado.alerta});
            return;
        }
        registrarNuevoUsuario();
    }

    return(
        <ScrollView Style={styles.container}>
            <StatusBar translucent={true} backgroundColor='#a197ff'/>
            
            <View style={{backgroundColor:'#a197ff', width: Dimensions.get('window').width, alignItems: 'center'}}>
                <Image
                    style={styles.TituloPNG}
                    source={require('../assets/icons/Logo-sup.png')}
                />
                <View style={styles.containerFrase}>
                    <Text style={[styles.textlogo,{color: 'white'}]}>registrate </Text>
                    <Image 
                        source={require('../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={[styles.textlogo,{color: 'white'}]}> organizate </Text>
                    <Image 
                        source={require('../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={[styles.textlogo,{color: 'white'}]}> planea</Text>
                </View>
                {/*contendor de formulario */}
                <View style={styles.containerLogup}>
                    <Image
                        source={require('../assets/icons/Linea-sup.png')}
                        style={styles.lineasup}
                    />

                    {/* campo nombre*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../assets/icons/Menu-Perfil.png')}
                            style={[styles.PNGinput]}
                        />
                        
                        <TextInput
                            onChangeText={cargarNombre}
                            value={nombre}
                            placeholder="nombre"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/* campo apellido*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../assets/icons/Menu-Perfil.png')}
                            style={[styles.PNGinput]}
                        />
                        
                        <TextInput
                            onChangeText={cargarApellido}
                            value={apellido}
                            placeholder="apellido"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/* campo usuario*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../assets/icons/Menu-Perfil.png')}
                            style={[styles.PNGinput]}
                        />
                        
                        <TextInput
                            onChangeText={cargarUsuario}
                            value={usuario}
                            placeholder="usuario"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*correo campo */}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../assets/icons/email.png')}
                            style={[styles.PNGinput,{height:22, marginTop:15}]}
                        />
                        
                        <TextInput
                            onChangeText={cargarCorreo}
                            value={correo}
                            placeholder="email"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*campo fechaNacimiento */}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../assets/icons/Menu-Calendario.png')}
                            style={[styles.PNGinput]}
                        />
                        
                        <TextInput
                            onChangeText={cargarFechaNacimiento}
                            value={fechaNacimiento}
                            placeholder="Fecha Nacimiento 1999-12-01"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/* campo contraseña*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../assets/icons/clave.png')}
                            style={[styles.PNGinput,{height:34, marginTop:8}]}
                        />
                        
                        <TextInput
                            onChangeText={cargarContrasena}
                            value={contrasena}
                            placeholder="contraseña"
                            style={[styles.input,{width:'68%'}]}
                            placeholderTextColor="#B3B3B3"
                            secureTextEntry={passwordVisibility}
                        />
                        <TouchableOpacity
                            onPress={handlePasswordVisibility}
                        >
                            {
                                //mostrar icono tachado
                                passwordVisibility ? (
                                    <Image
                                        source={require('../assets/icons/ojoTachado.png')}
                                        style={[styles.PNGinput,{height:22.5,width: 30 ,marginTop:12}]}
                                    />
                                ):(
                                    //mostrar icono normal
                                    <Image
                                        source={require('../assets/icons/ojoNormal.png')}
                                        style={[styles.PNGinput,{height:22.5,width: 30 ,marginTop:12}]}
                                    />
                                )
                            }
                        </TouchableOpacity>
                    </View>

                    {/*boton registrarse */}
                    <TouchableOpacity
                        style={[styles.boton,{backgroundColor:'#FEB529'}]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, {color:'white'}]}>Registrarse</Text>
                    </TouchableOpacity>

                    {/**Modal de ayuda */}
                    
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <InfoModalAyudaRegistro onPress={() => setModalVisible(!modalVisible)}/>
                        </Modal>
                    

                    {/*boton registrarse */}
                    <TouchableOpacity
                        style={[styles.boton]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={[styles.textBoton, { color: '#a197ff', textDecorationLine:'underline' }]}>Ayuda</Text>
                    </TouchableOpacity>
                </View>

                {/**modal validaciones */}
                <ModalAlert
                    VisibleModal={visual}
                    setVisibleModal={() => setVisual(!visual)}
                    textTitleModal={info.titulo}
                    textSubtilulo={info.subTitulo}
                    textParrafo={info.parrafo}
                    backgroundColor="#A3A3A380"
                    backgroundColorButton="#a197ff80"
                />
            </View>
        </ScrollView>
    );
}

export default Logup;