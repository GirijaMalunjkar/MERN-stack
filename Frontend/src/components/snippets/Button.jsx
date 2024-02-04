import React from "react";

const Button = ({onClick,variant,children}) => {
    const style = 
        variant === "primary"
        ? {padding:"1rem", color:"lightcolar", background:"lightcyan"}
        : {padding:"1rem", color:"lightcyan", background:"lightcolar"}
  return (
    <>
    <button style={style} onClick={()=>{alert("Clicked");}}>
        {children}
    </button>
    
    </>
  );
}

export default Button;
