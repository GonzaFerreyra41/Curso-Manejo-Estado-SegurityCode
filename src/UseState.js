import React from "react";

const SEGURITY_CODE ="paradigma";

function UseState({ name }) {
 //Estados independientes y dinamicos, depende de lo que escriban los usuarios. 
     const [value, setValue] = React.useState("");
 //Estados independientes. 
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
   
    console.log(value)

    React.useEffect(()=>{
        console.log("Empezando el efecto")
//Validación para que no se renderice constantemente, sino cuando se haga "el llamado a la backend". Simulado por un setTiemout.

       if(!!loading){
        setTimeout(()=>{
            console.log("Haciendo la validación")
            if(value !== SEGURITY_CODE){
                setError(true);
            }else {
                setError(false);
            }

            setLoading(false);

            console.log("Terminando la validación")

        }, 3000);
       } 

        console.log("Terminando el efecto")

    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escriba el codigo de seguridad</p>

            {error && (
                <p>Error: el código es incorrecto</p>
            )}
             {loading && (
                <p>Cargando...</p>
            )}
            <input 
            placeholder="código de seguridad"
            value={value}
            onChange={(event)=>{
                setValue(event.target.value);
            }}
            />
            <button
            onClick={() => setLoading(true)}
            >Comprobar</button>
        </div>
    );  
}
// Nota:  "&&" es un condicional que se traduce como un entonces
export { UseState };

