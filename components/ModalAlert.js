import {Text, ScrollView, View, TouchableOpacity, Modal} from "react-native";
import {styles, StylesModal} from './styles/Styles';
import React from 'react'

const ModalAlert = ({ 
    animationType = "slide", 
    transparent=true,
    VisibleModal,
    setVisibleModal,
    textBtnOcultar = "OK",
    textTitleModal = "Titulo",
    textSubtilulo,
    textParrafo,
    alturaCuerpoModal = "60%", 
    alturaScrollModal = "65%",
    backgroundColor = "#A3A3A380",
    backgroundColorButton = "#a197ff",
    navegar,
    textBtnNavegar = "¡VAMOS!"
}) => {
    return (
        <Modal
            animationType={animationType}
            transparent={transparent}
            visible={VisibleModal}
            onRequestClose={() => {
                setVisibleModal();
            }}
        >
            {/**contenedor modal */}
            <View style={[StylesModal.container, {backgroundColor:backgroundColor}]}>
                {/**cuerpo modal */}
                <View style={[StylesModal.containerCuerpo, {height: alturaCuerpoModal}]}>
                    {
                        navegar ===undefined || navegar === null ?
                        (
                                <TouchableOpacity
                                    style={[StylesModal.botonCerrar, { backgroundColor: backgroundColorButton }]}
                                    onPress={() => setVisibleModal()}
                                >
                                    <Text style={[styles.textlogo, { fontWeight: '600', }]}>{textBtnOcultar}</Text>
                                </TouchableOpacity>
                        ):(
                                <TouchableOpacity
                                    style={[StylesModal.botonCerrar, { backgroundColor: backgroundColorButton }]}
                                    onPress={() => {setVisibleModal(); navegar();}}
                                >
                                    <Text style={[styles.textlogo, { fontWeight: '600', }]}>{textBtnNavegar}</Text>
                                </TouchableOpacity>
                        )
                    }
                    <Text style={[StylesModal.titulo]}>{textTitleModal}</Text>
                    <View style={[StylesModal.cuerpoInformacion,{height: alturaScrollModal}]}>
                        <ScrollView>
                            {
                                textSubtilulo !== undefined || textSubtilulo !== null ? (
                                    <Text style={[StylesModal.subtitulo]}>
                                        {textSubtilulo}
                                    </Text>
                                ):(
                                    {}
                                )
                            }
                            {
                                textParrafo !== undefined || textParrafo !== null ? (
                                    <Text style={[StylesModal.textoInfo]}>
                                        {textParrafo}
                                    </Text>
                                ):(
                                    {}
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalAlert;