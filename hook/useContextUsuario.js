import React,{useContext} from "react";
import ContextUsuario from "../Context/ContextUsuario";

// funcion que permite acceder a los datos almacenados en el context
export default () => useContext(ContextUsuario);