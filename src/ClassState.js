import React from "react";
import { Loading } from "./loading";

const SEGURITY_CODE ="paradigma";

class ClassState extends React.Component {
    constructor(props){
        super(props);
//estados compuestos
        this.state = {
            value: "",
            error:false,
            loading:false,

        }
    }
    componentDidUpdate () {
        console.log("actualizador");

        if(!!this.state.loading){
            setTimeout(()=>{
            console.log("Haciendo la validación")
                
            if(SEGURITY_CODE === this.state.value){
                this.setState({ error: false, loading: false});
            }else{
            this.setState({ error : true, loading: false});
            }

            console.log("Terminando la validación")
    
                }, 3000);
    
        }
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escriba el codigo de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                 {this.state.loading && (
                   <Loading />
                )}
                <input
                value={this.state.value} 
                onChange={(event)=>{
                    this.setState({ value: event.target.value });
                }}
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

