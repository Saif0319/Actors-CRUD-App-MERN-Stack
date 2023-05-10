import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ActorsContext } from "../context/ActorsContext";

export const useLogout = () => {

    const { dispatch } = useContext(AuthContext);
    const { dispatch: actorsDispatch } = useContext(ActorsContext);

    const logout = () => {

        //remove token from local storage
        localStorage.removeItem("user");

        dispatch({
            type: "LOGOUT"
        });
        
        actorsDispatch({
            type: "SET_ACTORS",
            payload: null
        });
    }

  return  {logout}
}