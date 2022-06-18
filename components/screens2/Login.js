import React, {useEffect, useState} from "react";
import {View } from 'react-native';
import { ScrollView, Text, TextInput, TouchableOpacity, Image} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from '../styles/Styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

EStyleSheet.build();

const Login = (props) =>{

    const loadHelloWorld = async()=>{
        const res = await fetch('http://192.168.1.103:2000/personas')
        const data = await res.json();
        console.log(data);
    }
    useEffect(() => {
        loadHelloWorld();
    }, [])

    /*Delaracion de estados */
    const [usuario, cargarUsuario] = useState("");
    const [contrasena, cargarContrasena] = useState("");

    const myfuncion = (pantalla)=>{
        //props.navigation.navigate(pantalla);
        console.log(pantalla);
    }

    return (
        <SafeAreaView style={{backgroundColor: '#F56783'}}>
            <ScrollView  contentContainerStyle={styles.container}>
                <StatusBar translucent={true} backgroundColor='#F56783'/>
                {/* Logo */}
                <Image style={styles.logo} source={require('../../assets/icons/Logo-sup.png')}/>
                {/* Contenedor del texto del logo */}
                <View style={styles.containerFrase}>
                    <Text style={styles.textlogo}>registrate </Text>
                    <Image 
                        source={require('../../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={styles.textlogo}> organizate </Text>
                    <Image 
                        source={require('../../assets/icons/Punto.png')}
                        style={styles.puntoPNG}
                    />
                    <Text style={styles.textlogo}> planea</Text>
                </View>
                {/* Contenedor del form */}
                <View style={styles.containerLogin}>
                    <Image style={[styles.lineasup, {marginBottom: 30}]} source={require('../../assets/icons/Linea-sup.png')}/>
                    
                    {/* Saludo */}
                    <Text style={styles.saludo}>¡Hola de nuevo!</Text>
                    
                    {/*Input field User*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../../assets/icons/email.png')}
                            style={[styles.PNGinput,{height:22, marginTop:12}]}
                        />
                        <TextInput
                            onChangeText={cargarUsuario}
                            value={usuario}
                            placeholder="email"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*Input field Password*/}
                    <View style={styles.containerInput}>
                        <Image
                            source={require('../../assets/icons/clave.png')}
                            style={[styles.PNGinput, {height:34, marginTop:8}]}
                        />
                        <TextInput
                            onChangeText={cargarContrasena}
                            value={contrasena}
                            placeholder="password"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*Button */}
                    <TouchableOpacity
                        style={[styles.boton,{backgroundColor:'#00CE97'}]}
                        onPress={myfuncion}
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