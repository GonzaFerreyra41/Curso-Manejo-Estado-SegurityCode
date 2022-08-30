import React from "react";

const SEGURITY_CODE ="paradigma";

function UseReducer({ name }) {
 const [state, dispatch] = React.useReducer(reducer, initialState);

 console.log(state)
   
    React.useEffect(()=>{
        console.log("Empezando el efecto")

       if(!!state.loading){
        setTimeout(()=>{
            console.log("Haciendo la validación")
            if(state.value === SEGURITY_CODE){
                dispatch({type: "CONFIRM"});
            }else {
                dispatch({type: "ERROR"})
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
                dispatch({type:"WRITE", payload: event.target.value})
                // onWrite(event.target.value);
            }}
            />
            <button
            onClick={() => {
             dispatch({ type: "CHECK"}); 
            }}
            >Comprobar</button>
        </div>
        );  
    }else if(!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>Pedimos confirmación. ¿Tas seguro?</p>

                <button
                onClick={()=>{
                    dispatch({ type: "DELETE"}); 
                }}
                > 
                    Sí, eliminar
                </button>
                <button
                onClick={()=>{
                    dispatch({ type: "RESET"}); 
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
                    dispatch({ type: "RESET"}); 
                    // onReset();
                }}
                >
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );  
    } 
}
const initialState = {
    value: "",
    error:false,
    loading:false,
    deleted:false,
    confirmed: false,
}; 

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        error:false,
        loading: false,
        confirmed: true,
    },
    "ERROR": {
        ...state,
        error: true,
        loading: false,
    },
    "CHECK": {
        ...state,
        loading:true,
    },
    "DELETE": {
        ...state,
        deleted:true,
    },
    "RESET":{
        ...state,
        confirmed:false,
        deleted: false,
        value:"",
    },
    "WRITE":{
        ...state,
        value: payload,
    }
});


 // const onWrite = (newValue) => {
    //     setState({
    //         ...state,
    //         value: newValue,
    //     })
    // }


const reducer = (state, action) => {
if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
}else {
    return state;
}
}


export { UseReducer };