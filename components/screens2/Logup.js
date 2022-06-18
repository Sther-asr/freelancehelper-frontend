import React,{useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {Text, ScrollView, View, TextInput, Image, Dimensions, TouchableOpacity} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from '../styles/Styles'
EStyleSheet.build();

const Logup = (props) =>{
    /*Delaracion de estados */
    const [nombre,cargarNombre] = useState("");
    const [apellido,cargarApellido] = useState("");
    const [usuario, cargarUsuario] = useState("");
    const [correo, cargarCorreo] = useState("");
    const [contrasena, cargarContrasena] = useState("");
    const [repContrasena, cargarRepContrasena] = useState("");
    const [fechaNacimiento,cargarFechaNacimiento] = useState("");

    //funcion registrar
    const registrar = ()=>{
        console.log('registrar');
    }

    return(
        <ScrollView Style={styles.container}>
            <StatusBar translucent={true} backgroundColor='#a197ff'/>
            
            <View style={{backgroundColor:'#a197ff', width: Dimensions.get('window').width, alignItems: 'center'}}>
                <Image
                    style={styles.TituloPNG}
                    source={require('../../assets/icons/Logo-sup.png')}
                />
                <View style={styles.containerFrase}>
                    <Text style={[styles.textlogo,{color: 'white'}]}>registrate </Text>
                    <Image 
                        source={require('../../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={[styles.textlogo,{color: 'white'}]}> organizate </Text>
                    <Image 
                        source={require('../../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={[styles.textlogo,{color: 'white'}]}> planea</Text>
                </View>
                {/*contendor de formulario */}
                <View style={styles.containerLogup}>
                    <Image
                        source={require('../../assets/icons/Linea-sup.png')}
                        style={styles.lineasup}
                    />

                    {/* campo nombre*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../../assets/icons/Menu-Perfil.png')}
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
                            source={require('../../assets/icons/Menu-Perfil.png')}
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
                            source={require('../../assets/icons/Menu-Perfil.png')}
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
                            source={require('../../assets/icons/email.png')}
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
                            source={require('../../assets/icons/Menu-Calendario.png')}
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
                            source={require('../../assets/icons/clave.png')}
                            style={[styles.PNGinput,{height:34, marginTop:8}]}
                        />
                        
                        <TextInput
                            onChangeText={cargarContrasena}
                            value={contrasena}
                            placeholder="contraseña"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                            secureTextEntry={true}
                        />
                    </View>

                    {/* campo reptir contraseña*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../../assets/icons/clave.png')}
                            style={[styles.PNGinput,{height:34, marginTop:8}]}
                        />
                        
                        <TextInput
                            onChangeText={cargarRepContrasena}
                            value={repContrasena}
                            placeholder="confirmar contraseña"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                            secureTextEntry={true}
                        />
                    </View>

                    {/*boton registrarse */}
                    <TouchableOpacity
                        style={[styles.boton,{backgroundColor:'#FEB529'}]}
                        onPress={registrar}
                    >
                        <Text style={[styles.textBoton, {color:'white'}]}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default Logup;