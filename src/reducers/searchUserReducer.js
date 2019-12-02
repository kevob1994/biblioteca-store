import {SEARCH_USER_LOAN} from './../actions/types';

const initalState = {}

export default function(state ={},action){
    // console.log("REDUCER")
    switch (action.type) {
        case SEARCH_USER_LOAN:
             console.log("action")
            console.log(action)
            return {
                ...state,
                nombre: action.user.nombre,
                apellido: action.user.apellido,
                carrera: action.user.carrera,
                codigo: action.user.codigo
            }
    
        default:
            return state
    }
}

