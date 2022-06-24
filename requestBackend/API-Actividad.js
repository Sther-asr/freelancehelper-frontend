// funciones de actividad bdd
import APISERVER from './ConfigAPI';

//funion de actualizar actividad
export const actualizarActividad = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/actividades/actualizar`,
        {
            method:"PUT",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de actualizar actividades' + error.message);
        });
    return await respuesta.json();
}

//funion de registrar actividad
export const registrarActividad = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/actividades/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de registro actividades' + error.message);
        });
    return await respuesta.json();
}