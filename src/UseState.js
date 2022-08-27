import React from "react";

function UseState({ name }) {
    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        console.log("Empezando el efecto")
//Validación para que no se renderice constantemente, sino cuando se haga "el llamado a la backend". Simulado por un setTiemout.

       if(!!loading){
        setTimeout(()=>{
            console.log("Haciendo la validación")
            
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
            />
            <button
            onClick={() => setLoading(true)}
            >Comprobar</button>
        </div>
    );  
}
// Nota:  "&&" es un condicional que se traduce como un entonces
export { UseState };

