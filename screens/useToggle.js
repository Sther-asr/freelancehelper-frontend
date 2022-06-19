import React,{useState} from "react";
//funcion para ocultar contraseña
export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('ojoTachado');
  
    const handlePasswordVisibility = (valor=false) => {
      if (rightIcon === 'ojoTachado') {
        setRightIcon('ojoNormal');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'ojoNormal') {
        setRightIcon('ojoTachado');
        setPasswordVisibility(!passwordVisibility);
      }

      if(valor === true) {setPasswordVisibility(true)}
    };
  
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
};