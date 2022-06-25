// funciones diarias de consulta a la bdd
import APISERVER from './ConfigAPI';

//funion de registro de personas o usuarios nuevos
export const consultaTareasDiarias = async (idPersona) =>{
    //console.log('Datos' + JSON.stringify(idPersona));
    const respuesta = await fetch(
        `${APISERVER}/consultas/tareasDiarias`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(idPersona)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de consultas diarias' + error.message);
        });
    //console.log('Este es el resultado' +  JSON.stringify(respuesta));
    return await respuesta.json();
}

//actualizar estado de recordatorio/actividad
export const actualizarEstado = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/consultas/actualizarEstado`,
        {
            method:"PUT",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de registro de recordatorios' + error.message);
        });
    return await respuesta.json();
}