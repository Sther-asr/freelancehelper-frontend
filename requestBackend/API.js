/**
 * Funciones encargadas de realizar las solicitudes al servidor
 */
// constante que contienne la direccion del servidor
const APISERVER = 'http://192.168.1.104:2000';

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
//funion de registro de personas o usuarios nuevos
export const inicioSesion = async (infoSesion) =>{
    console.log('solicitandooooooo');
    const respuesta = await fetch(
        `${APISERVER}/usuarios/consulta-inicio-sesion`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSesion)
        }
    );
    console.log(respuesta);
    return await respuesta.json();
}