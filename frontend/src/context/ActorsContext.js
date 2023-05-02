import { createContext, useReducer } from 'react';


//create the context
export const ActorsContext = createContext();


//reducer function
export const actorsReducer = (state, action) => {
    switch(action.type) {
        case "SET_ACTORS":
            return {
                actors: action.payload
            }
        
        case "CREATE_ACTOR":
            return {
                actors: [action.payload, ...state.actors]
            }

        case "DELETE_ACTOR":
            return {
                actors: state.actors.filter((actor) => actor._id !== action.payload._id)
            }

        default:
            return state
    }
}


//Provider
export const ActorsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(actorsReducer, { 
      actors: null
    })
    
    return (
      <ActorsContext.Provider value={{ ...state, dispatch }}>
        { children }
      </ActorsContext.Provider>
    )
  }



