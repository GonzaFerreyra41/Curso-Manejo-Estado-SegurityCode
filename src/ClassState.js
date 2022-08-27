import React from "react";
import { Loading } from "./loading";

class ClassState extends React.Component {
    constructor(props){
        super(props);
//estados compuestos
        this.state = {
            error:false,
            loading:false,

        }
    }
    componentDidUpdate () {
        console.log("actualizador");

        if(!!this.state.loading){
            setTimeout(()=>{
            console.log("Haciendo la validación")
                
            this.setState({ loading: false});
    
            console.log("Terminando la validación")
    
                }, 3000);
    
        }
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escriba el codigo de seguridad</p>
                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}
                 {this.state.loading && (
                   <Loading />
                )}
                <input 
                placeholder="código de seguridad"
                />
                <button
                onClick={() => this.setState({ loading: true}) 
                }   
                >Comprobar</button>
            </div>
        );
     }
}


export { ClassState };

