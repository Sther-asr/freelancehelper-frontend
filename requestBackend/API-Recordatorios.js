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
    );
    return await respuesta.json();
}