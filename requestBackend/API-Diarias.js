// funciones diarias de consulta a la bdd
import APISERVER from './ConfigAPI';

//funion de registro de personas o usuarios nuevos
export const consultaTareasDiarias = async (idPersona) =>{
    console.log('Datos' + JSON.stringify(idPersona));
    const respuesta = await fetch(
        `${APISERVER}/consultas/tareasDiarias`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(idPersona)
        }
    );
    console.log('Este es el resultado' +  JSON.stringify(respuesta));
    return await respuesta.json();
}