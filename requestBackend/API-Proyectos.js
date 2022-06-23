// funciones diarias de consulta a la bdd
import APISERVER from './ConfigAPI';

//funion de registro de proyectos
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

//funion de consulta proyectos
export const consultaProyecto = async (infoSolicitud) =>{
    //console.log('Datos' + JSON.stringify(infoSolicitud));
    const respuesta = await fetch(
        `${APISERVER}/proyectos/consulta`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    );
    //console.log('Este es el resultado' +  JSON.stringify(respuesta));
    return await respuesta.json();
}