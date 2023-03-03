import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ActorsContext } from "../context/ActorsContext";

const Create = () => {

    const navigate = useNavigate();

    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState(null);
    const { dispatch } = useContext(ActorsContext);

    const handleBtn = async (e) => {
        e.preventDefault();

        const actor = {
            firstName: fName,
            lastName: lName,
            birthday: birthday
        };

        const response = await fetch("http://localhost:4000/api/actors/", {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            setError(null);
            dispatch({
                type: "CREATE_ACTOR",
                payload: json
            })
            return navigate("/");
        }

            // const actor = await axios.post("http://localhost:4000/api/actors/", {
            //     firstName: fName,
            //     lastName: lName,
            //     birthday: birthday
            // });

            // if(actor.status === 200) {
            //     return navigate("/");
            // }

            // if(actor.status === 400) {
            //     console.log(actor);
            //     return setError(actor.error);
            // }
        

        
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
        </form>
    </div>
  )
}

export default Create