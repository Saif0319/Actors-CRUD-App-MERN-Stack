import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ActorsContext } from "../context/ActorsContext";
import axios from "axios";

const Create = () => {

    const navigate = useNavigate();

    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useContext(ActorsContext);

    const handleBtn = async (e) => {
        e.preventDefault();

        const actor = {
            firstName: fName,
            lastName: lName,
            birthday: birthday
        };

            await axios.post("http://localhost:4000/api/actors/", actor, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`
                }
            })
            
            .then((res) => {
                setError(null);
                dispatch({
                    type: "CREATE_ACTOR",
                    payload: res.data
                })
                setEmptyFields([]);
                return navigate("/");
            })
            .catch(err => {
                console.log(err);
                setEmptyFields(err.response.data.emptyFields);
                console.log(emptyFields);
                return setError(actor.error);
            })


                
        

        
    }

  return (
    <div>
        <form className="border-2 flex flex-col w-1/3 m-4 p-4">
            <div className="w-3/4">
                <label htmlFor='fName' className="mx-4">First Name:</label>
                <input type={"text"} name="fName" value={fName} onChange={(e) => setFname(e.target.value)} className="border-2 border-blue-200 transition-all outline-none m-4 focus:border-blue-500 p-1 w-full" placeholder="First Name" />
            </div>
            
            <div className="w-3/4">
                <label htmlFor='lName' className="mx-4">Last Name</label>
                <input type={"text"} name="lName" value={lName} onChange={(e) => setLname(e.target.value)} className="border-2 border-blue-200 transition-all outline-none m-4 focus:border-blue-500 p-1 w-full" placeholder="Last Name" />
            </div>

            <div className="w-3/4">
                <label htmlFor='bday' className="mx-4">Birthday</label>
                <input type={"date"} name="bday" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="border-2 border-blue-200 transition-all outline-none m-4 p-1 focus:border-blue-500 px-1 w-full" />
            </div>

            <div>
                <button type='submit' onClick={handleBtn} className="m-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Create</button>
            </div>

            {error && <div className="text-xl text-red-600">{error}</div>}

            {emptyFields.length > 0 ? 
                emptyFields.map(error => {
                    return <p className="text-xl text-red-600">{error} is required</p>
                })    
        : ""}
        </form>
    </div>
  )
}

export default Create