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
    );
    return await respuesta.json();
}