// funciones diarias de consulta a la bdd
import APISERVER from './ConfigAPI';

//funion de registro de personas o usuarios nuevos
export const consultaTareasDiarias = async (idPersona) =>{
    const respuesta = await fetch(
        `${APISERVER}/consultas/tareasDiarias`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(idPersona)
        }
    );
    return await respuesta.json();
}