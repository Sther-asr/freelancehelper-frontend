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
    );
    return await respuesta.json();
}