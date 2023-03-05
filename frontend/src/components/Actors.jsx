import axios from "axios";
import { ActorsContext } from "../context/ActorsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const Actors = ({fName, lName, birthday, id}) => {

  const { dispatch } = useContext(ActorsContext);
  const navigate = useNavigate();


  //Handle delete
    const deleteHandler = async () => {
        const actor = await axios.delete("http://localhost:4000/api/actors/" + id);

        //Dispatching an action to update the state after deleting the actor
        dispatch({
          type: "DELETE_ACTOR",
          payload: actor
        })
    }


    //Handle UPDATE
    const editHandler = (id, fName, lName, bDay) => {

      return navigate("/update", {
        state: { id, fName, lName, bDay } 
      })
    }




    const bDay = new Date(birthday);
    const today = new Date(Date.now());
    const age = today.getFullYear() - bDay.getFullYear();

  return (
    <div className="border rounded-lg border-blue-500 p-5 mx-4 relative">
        <h3>Full Name: {fName + " " + lName}</h3>
        <p>Age: {age}</p>
        <span onClick={deleteHandler} className="border border-red-600 p-1 absolute top-0 right-0 m-2 cursor-pointer hover:bg-red-500 hover:text-white transition-colors rounded-md">Delete</span>

        <span onClick={() => editHandler(id, fName, lName, bDay)} className="border border-blue-600 p-1 absolute top-7 right-2 my-5 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors rounded-md px-3">Edit</span>

    </div>
  )
}

export default Actors