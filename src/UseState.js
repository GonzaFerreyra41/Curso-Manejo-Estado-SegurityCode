import React from "react";

const SEGURITY_CODE ="paradigma";

function UseState({ name }) {
 const [state, setState] = React.useState({
    value: "",
    error:false,
    loading:false,
    deleted:false,
    confirmed: false,
 }); 

    console.log(state)

    React.useEffect(()=>{
        console.log("Empezando el efecto")

       if(!!state.loading){
        setTimeout(()=>{
            console.log("Haciendo la validación")
            if(state.value === SEGURITY_CODE){
                setState({
                    ...state,
                    error:false,
                    loading: false,
                    confirmed: true,
                });
            }else {
                setState({
                    ...state,
                    error:true,
                    loading:false
                })
            }

            console.log("Terminando la validación")

        }, 3000);
       } 

        console.log("Terminando el efecto")

    }, [state.loading]);

    if(!state.deleted && !state.confirmed){ 
        return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escriba el codigo de seguridad</p>

            {(state.error && !state.loading) && (
                <p>Error: el código es incorrecto</p>
            )}
            {state.loading && (
                <p>Cargando...</p>
            )}
            <input 
            placeholder="código de seguridad"
            value={state.value}
            onChange={(event)=>{
                setState({
                    ...state,
                    value: event.target.value,
                })
            }}
            />
            <button
            onClick={() => {
                setState({
                    ...state,
                    loading:true
                })
            }
            }
            >Comprobar</button>
        </div>
        );  
    }else if(!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>Pedimos confirmación. ¿Tas seguro?</p>

                <button
                onClick={()=>{
                    setState({
                        ...state,
                        deleted:true,
                    });
                }}
                >
                    Sí, eliminar
                </button>
                <button
                onClick={()=>{
                    setState({
                        ...state,
                        confirmed:false,
                        value:"",
                    });
                }}
                >
                    No, me arrepentí
                </button>
            </React.Fragment>
        );
    }else {
        return(
            <React.Fragment>
                <p>Elminado con exito</p>
                <button
                onClick={()=>{
                    setState({
                        ...state,
                        confirmed:false,
                        deleted:false,
                        value:"",
                    });
                }}
                >
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );
    }     
}
// Nota:  "&&" es un condicional que se traduce como un entonces
export { UseState };

