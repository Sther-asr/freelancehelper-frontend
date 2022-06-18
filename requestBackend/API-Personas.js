/**
 * Funciones encargadas de realizar las solicitudes al servidor
*/
import APISERVER from "./ConfigAPI";


//funion de registro de personas o usuarios nuevos
export const registrarPersona = async (infoPersona) =>{
    const respuesta = await fetch(
        `${APISERVER}/personas/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoPersona)
        }
    );
    return await respuesta.json();
}
