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
        console.log('Error durante la promesa consuta datos de inicio de sesion' + error.message);
        });
    return await respuesta.json();
}