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
        height:'63%',
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

// Pantalla home organizador y sus elementos
export const StylesHome = EStyleSheet.create({
    container:{
        backgroundColor:'#feb529', 
        height:'100%',
    },
    colorTexto:{
        color: '#B3B3B3'
    },
    containerHeaderInferior:{
        backgroundColor:'white',
        height:140,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius:40,
        marginBottom: '10%',
        overflow:'hidden',
    },
    containerBtnMenu:{
        width:'20%',
        alignItems: 'center',
    },
    botonMenu:{
        width:30,
        height:30,
        marginTop: 10
    },
    iconoMenu:{
        width:'100%',
        height: 4,
        marginTop:5,
        borderRadius:3
    },
    containerInfoHeader:{
        width:'79%',
        alignItems:'flex-end',
        paddingRight:10
    },
    saludo:{
        fontSize: 25,
        color:'black'
    },
    fechaHora:{
        fontSize:16,
    },
    titulo:{
        fontSize:25,
        textAlign:'center',
        marginTop:20,
        marginBottom:20,
        fontWeight:'bold'
    },
    containerBtnNueva:{
        width:'90%', 
        marginLeft:'5%', 
        marginRight:'5%', 
        marginTop: 20,
    },
    botonNueva:{
        width:60,
        height:60,
        overflow:'hidden',
        marginLeft:'77%',
        backgroundColor:'#53C4DE',
        borderRadius: 40
    }
});

// estilo pantalla modal
export const StylesModal = EStyleSheet.create({
    container:{
        with:'100%',
        height:'100%',
        backgroundColor:'#a197ff80',
        alignItems:'center',
        justifyContent:'center'
    },
    containerCuerpo:{
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius:30,
        alignItems:'center'
    },
    botonCerrar: {
        width: '100%', 
        padding: 12, 
        backgroundColor: '#a197ff', 
        alignItems: 'center', 
        borderRadius: 30
    },
    titulo: { 
        fontSize: 30, 
        fontWeight: '900', 
        marginBottom: 20, 
        marginTop: 20, 
        textAlign: 'center' 
    },
    cuerpoInformacion:{
        backgroundColor:'#b3b3b330',
        borderRadius: 20,
        height:'80%',
        width:'90%',
        padding: 10
    },
    subtitulo:{
        fontSize: 18,
        fontWeight:'600',
        color: 'black',
        marginBottom: 5,
        marginTop:8
    },
    textoInfo:{
        fontSize:16,
        fontWeight:'300',
        color: 'black'
    }
});
