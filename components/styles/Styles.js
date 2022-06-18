import React from "react";
import {Dimensions } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
    
    safearea:{
        padding: 0,
        margin:0
    },
    container: {
        // backgroundColor: '#808080',
        // width: Dimensions.get('window').height,
        height: '100%',
        //  flex: 1,
    },
    logo:{
        marginVertical: 20,
        marginTop: 0,
        width: '100%',
        height: 35,
        resizeMode: "contain"
    },
    TituloPNG: {
        marginTop: 20,
        marginBottom:20,
        width: (Dimensions.get('window').width - 100),
        height: 35
    },
    containerFrase: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        color: 'white',
        justifyContent: 'center',
        AlignItems: 'center',
        textAlign: 'center',
        width: Dimensions.get('window').width,
        marginBottom: 40
    },
    textlogo:{
        color: 'white',
        fontSize: 16,
        // fontWeight: '400' Normal
    },
    puntoPNG: {
        width: 5,
        height: 5,
        marginTop: 10
    },
    texto: {
        fontSize: 18
    },
    containerLogin: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        // width: Dimensions.get('window').width,
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
    },
    containerLogup: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
    },
    lineasup:{
        width: 40,
        height: 20,
        marginTop: 20,
        marginBottom: 50,
        resizeMode: "contain"
    },
    saludo:{
        color: '#666666',
        fontSize: 22,
        alignSelf: 'flex-start',
        marginBottom: 50,
        marginLeft: 45,
    },
    containerInput: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: ((Dimensions.get('window').width) - 80),
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        borderColor: '#B3B3B3',
        borderWidth: 1.5
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        fontSize: 16,
        color: '#808080'
    },
    PNGinput: {
        width: 30,
        height: 29,
        marginLeft: 10,
        marginRight: 7,
        marginTop: 10
    },
    boton: {
        width: ((Dimensions.get('window').width) - 80),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 4,
        marginBottom: 50,
        height: 50,
    },
    textBoton: {
        fontSize: 18,
        fontWeight: '600'
    },
    registro:{
        alignItems:'center',
        justifyContent: 'flex-end'
    }
});

// LIENZO DE TAREA

export const StylesTarea = EStyleSheet.create({
    container:{
        width: '100%',
        paddingHorizontal:15,
        paddingVertical:16,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopWidth:1.5,
        borderTopColor: '#B3B3B3',
    },
    containerInfo:{
        width:'80%',
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',

    },
    hora:{
        marginRight:10
    },
    containerFlex:{
        flexDirection: 'row',
        marginTop:4
    },
    containerCheckBox:{
        width:'20%',  
        justifyContent:'center',  
        paddingLeft:'6%'
    }
});

// LIENZO LISTA TAREA
export const StylesListaTareas = EStyleSheet.create({
    container:{
        backgroundColor:'white',
        borderRadius: 25,
        padding: 15,
        width: '90%',
        height:'80%',
        marginLeft: '5%',
        marginRight:'5%'
    },
    cabeceraLista:{
        height:'15%'
    },
    tituloCabeceraLista:{
        marginTop:5,
        fontSize:25,
        fontWeight:'bold',
        color:'#FEB529'
    }
});