// funciones de recordatorios para bdd
import APISERVER from './ConfigAPI';

//registrar recordatorio nuevo
export const registrarRecordatorio = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/recordatorios/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de registro de recordatorios' + error.message);
        });
    return await respuesta.json();
}

//funion de actualizar recordatorio
export const actualizarRecordatorio = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/recordatorios/actualizar`,
        {
            method:"PUT",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa actualizar recordatorios' + error.message);
        });
    return await respuesta.json();
}