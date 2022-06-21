import React, {useState} from "react";
import {View } from 'react-native';
import { ScrollView, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import {styles} from '../components/styles/Styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {inicioSesion} from '../requestBackend/API-Usuarios';
import {consultaDatosPersona} from "../requestBackend/API-Persona";
import {useTogglePasswordVisibility} from "./useToggle";
import {validarContrasena} from '../fuciones/validador';

EStyleSheet.build();

const Login = (props) =>{
    /*Delaracion de estados */
    const [usuario, cargarUsuario] = useState("");
    const [contrasena, cargarContrasena] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [errores, setErrores] = useState({usuario:false, contrasena: false});
    // almacenar info estado
    const [datosUsuario, setDatosUsuario] = useState({});

    const obtenerDatosPersona = async (idPersona) => {
        const data = await consultaDatosPersona({
            "sesion": true,
            "idSesion": idPersona
        });
        setDatosUsuario(data[0]);
        console.log(JSON.stringify(datosUsuario));
        props.navigation.navigate('Organizador', {datosUsuario});
    }
    //funcion para restablecer los campos
    const restablecerCampos = () =>{
        cargarUsuario("");
        cargarContrasena("");
        handlePasswordVisibility(true);
    }
    // if(props.route.params.usuario!=undefined){cargarUsuario(props.route.params.usuario)}
    // if(props.route.params.contrasena!=undefined){cargarContrasena(props.route.params.contrasena)}

    const solicitudLogin = async (pantalla)=>{
        //props.navigation.navigate(pantalla);
        const datos = {
            "usuario" : usuario,
            "contrasena" : contrasena
        }
        const data = await inicioSesion(datos);
        
        if(data.respuesta === undefined){
            obtenerDatosPersona(data[0].persona_idPersona);
            return;
        }

        Alert.alert(
            "Inicio de sesion dice",
            `${JSON.stringify(data)}`,
            [
                {text:"Ok", onPress: ()=>console.log('los datos')}
            ]
        );
        console.log(JSON.stringify(data))        
    }

    const validarCampos = () =>{
        let resultado = validarContrasena(contrasena);
        if(resultado != true){
            Alert.alert(
                'Contraseña no permitida', resultado.contrasena,[{text:'Entiendo'}]
            );
            return;
        }
        if(usuario===''|| usuario ===null){
            Alert.alert(
                'Usuario invalido', 'El campo usuario no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        solicitudLogin();
    }

    return (
        <SafeAreaView style={{backgroundColor: '#F56783'}}>
            <ScrollView  contentContainerStyle={styles.container}>
                <StatusBar translucent={true} backgroundColor='#F56783'/>
                {/* Logo */}
                <Image style={styles.logo} source={require('../assets/icons/Logo-sup.png')}/>
                {/* Contenedor del texto del logo */}
                <View style={styles.containerFrase}>
                    <Text style={styles.textlogo}>registrate </Text>
                    <Image 
                        source={require('../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={styles.textlogo}> organizate </Text>
                    <Image 
                        source={require('../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={styles.textlogo}> planea</Text>
                </View>
                {/* Contenedor del form */}
                <View style={styles.containerLogin}>
                    <Image style={[styles.lineasup, {marginBottom: 30}]} source={require('../assets/icons/Linea-sup.png')}/>
                    
                    {/* Saludo */}
                    <Text style={styles.saludo}>¡Hola de nuevo!</Text>
                    
                    {/*Input field User*/}
                    <View style={[styles.containerInput]}>
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
                                        style={[styles.PNGinput,{height:34,width: 34 ,marginTop:8}]}
                                    />
                                ):(
                                    //mostrar icono normal
                                    <Image
                                        source={require('../assets/icons/ojoNormal.png')}
                                        style={[styles.PNGinput,{height:34,width: 34 ,marginTop:8}]}
                                    />
                                )
                            }
                        </TouchableOpacity>
                    </View>

                    {/*Button */}
                    <TouchableOpacity
                        style={[styles.boton,{backgroundColor:'#00CE97'}]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, {color:'white'}]}>Ingresar</Text>
                    </TouchableOpacity>

                    {/*Seccion de Registro */}
                    <View style={styles.registro}>
                        <Text style={[styles.texto,{color: '#808080', marginTop: 20}]}>¿No posees cuenta?</Text>
                    
                        <TouchableOpacity
                            style={[styles.boton]}
                            onPress={()=>props.navigation.navigate('Logup')}
                        >
                        <Text style={[styles.textBoton, {color:'#a197ff'}]}>REGÍSTRATE</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Login;