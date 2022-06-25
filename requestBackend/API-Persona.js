// funciones para tabla persona
import APISERVER from './ConfigAPI';

//funion dconsulta datos persona
export const consultaDatosPersona = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/personas/consulta-datos`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de consulta datos de persona' + error.message);
    });
    return await respuesta.json();
}