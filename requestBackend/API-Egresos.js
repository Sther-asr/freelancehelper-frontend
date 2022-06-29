// funciones de egresos a la bdd
import APISERVER from './ConfigAPI';

//funion de registro de egresos
export const registrarEgreso= async (infoSolicitud) =>{
    //console.log('Datos' + JSON.stringify(infoSolicitud));
    const respuesta = await fetch(
        `${APISERVER}/egresos/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de registro de egreso ' + error.message);
        });
    //console.log('Este es el resultado' +  JSON.stringify(respuesta));
    return await respuesta.json();
}