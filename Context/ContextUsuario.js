import React,{createContext} from "react";

//contexto/almacen de informacion usuario
const ContextUsuario = createContext({
    "idPersona":null,
    "nombrePersona":null,
    "apellidoPersona":null,
    "fechaNacimiento":null,
    "usuario": null,
    "correo" : null
});

export default ContextUsuario;