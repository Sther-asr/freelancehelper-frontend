import APISERVER from "./ConfigAPI";
//funion de consulta usuarios nuevos
export const inicioSesion = async (infoSesion) =>{

    const respuesta = await fetch(
        `${APISERVER}/usuarios/consulta-inicio-sesion`,
        {
            method:"post",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSesion)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa ' + error.message);
        });
    return await respuesta.json();
}
//funion de actualizacion contraseña usuario 
export const cambioContrasena = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/usuarios/actualizar-contrasena`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    );
    return await respuesta.json();
}