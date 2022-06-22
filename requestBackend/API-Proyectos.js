// funciones diarias de consulta a la bdd
import APISERVER from './ConfigAPI';

//funion de registro de personas o usuarios nuevos
export const registrarProyecto = async (infoSolicitud) =>{
    //console.log('Datos' + JSON.stringify(infoSolicitud));
    const respuesta = await fetch(
        `${APISERVER}/proyectos/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    );
    //console.log('Este es el resultado' +  JSON.stringify(respuesta));
    return await respuesta.json();
}