import React,{useState, useEffect} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration} from "react-native";
import { styles, StylesHome, StylesCrearRecordatorio, StylesListaMovimientos , StylesConsultaMovimientos, StylesHomeFinanzas } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin } from "../fuciones/validador";
import { registrarRecordatorio } from "../requestBackend/API-Recordatorios";
import { consultaMovimientos } from "../requestBackend/API-Diarias";
import ListaMovientosItems from "../components/ListaMovientosItems";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import ModalAlert from "../components/ModalAlert";


const ConsultaMovimientos = (props) =>{
    // utilizando contexto de usuario
    const infoUsuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 10);
    // control estado actualizar
    const [estadoActualizar, setEstadoActualizar] = useState(false);
    const isFocus = useIsFocused();

    const [fechasMovimientos, cargarfechasMovimientos] = useState({
        "fechaInicio": "",
        "fechaFin": ""
    });
    // estado contenedor del resultado de la busqueda de movimientos
    const [dataMovimientos, setDataMovimientos] = useState([
        {"motivo":"No posee movimientos", 
        "monto":"0,00", 
        "fecha":"0000/00/00 00:00", 
        "proyecto_idProyecto":null, 
        "persona_idPersona":null, 
        "idEgreso":null}
    ]);
    // realizando consulta cada vex que se accede a la pantalla
    useEffect(()=>{
        console.log("Consultando los movimientos del mes");
        restablecerCampos();
        obtenerMovimientos("Mensual");
    },[isFocus]);

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
        cargarfechasMovimientos({
            "fechaInicio": "",
            "fechaFin": ""
        });
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
    const handleCargarEstado = (index,valor) =>{
        cargarfechasMovimientos({...fechasMovimientos, [index]:valor}); 
        //console.log(JSON.stringify(fechasMovimientos));
    }

    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        
        let resultado = validarDatosRegistroPersona(fechasMovimientos)
        if(resultado.result !== true){
            setInfo({"titulo":"Consulta movimientos","subTitulo":"Fecha invalida", "parrafo":resultado.alerta});
            return;
        }

        if(!validarRangoFechaInicioFin(fechasMovimientos)){
            setInfo({"titulo":"Consulta movimiento","subTitulo":"Rango de tiempo invalido", "parrafo":`La fecha incial "${fechasMovimientos.fechaInicio}" no puede ser mayor a la fecha final "${fechasMovimientos.fechaFin}"`});
            return;
        }
        obtenerMovimientos("Rango")
    }

    // funcion para cargar movimiento de mensaje
    const cargarMovimientoDefault = () => {
        setDataMovimientos([
            {"motivo":"No posee movimientos", 
            "monto":"0,00", 
            "fecha":"0000/00/00 00:00", 
            "proyecto_idProyecto":null, 
            "persona_idPersona":null, 
            "idEgreso":null}
        ]);
    }

    // funcion para realizar la consulta
    const obtenerMovimientos = async (periodo) =>{
        if(periodo === "Mensual"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fecha": fechaActual,
                "tipo": "Mensual"
            });
            //console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }else{
                cargarMovimientoDefault();
            }
        }

        if(periodo === "Anual"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fecha": fechaActual,
                "tipo": "Anual"
            });
            //console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }else{
                cargarMovimientoDefault();
            }
        }

        if(periodo === "Rango"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fechaInicio": fechasMovimientos.fechaInicio,
                "fechaFin":fechasMovimientos.fechaFin,
                "tipo": "Rango"
            });
            //console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }else{
                cargarMovimientoDefault();
            }
        }

    }

    return (
        <View style={[StylesConsultaMovimientos.todoAlto, StylesHomeFinanzas.colorFondo]}>
        
            <SafeAreaView>
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo,{marginVertical:'15%'}]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario ]}>

                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 30, width: 35 }]} source={require('../assets/icons/Billetera.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>Consultas</Text>
                    </View>

                    {/**campo rango de fecha*/}
                    <View style={[StylesConsultaMovimientos.containerInputDoble]}>
                        <Text style={[StylesConsultaMovimientos.textInputDoble]}>entre</Text>
                        <TextInput
                            onChangeText={(textoEntrando)=>handleCargarEstado("fechaInicio",textoEntrando)}
                            value={fechasMovimientos.fechaInicio}
                            placeholder={fechaActual}
                            style={[StylesConsultaMovimientos.input]}
                            placeholderTextColor="#B3B3B3"
                        />
                        <Text style={[StylesConsultaMovimientos.textInputDoble]}>a</Text>
                        <TextInput
                            onChangeText={(textoEntrando)=>handleCargarEstado("fechaFin",textoEntrando)}
                            value={fechasMovimientos.fechaFin}
                            placeholder={fechaActual}
                            style={[StylesConsultaMovimientos.input]}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*Button */}
                    <View style={[{flexDirection:'row', alignItems:'flex-start', width:'80%'}]}>
                    <TouchableOpacity
                        style={[StylesListaMovimientos.botonPequeno, { backgroundColor: '#00ce97', marginBottom:5 }]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, { color: 'white' }]}>CONSULTAR</Text>
                    </TouchableOpacity>
                    </View>
                    {/**Lista de movimientos*/}
                    <ListaMovientosItems
                        estadoActualizar={estadoActualizar}
                        setEstadoActualizar={setEstadoActualizar}
                        datas={dataMovimientos}
                        accionarConsulta={obtenerMovimientos}
                    />
                </View>
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
            </SafeAreaView>
        </View>
    );
}

export default ConsultaMovimientos;