import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Update = () => {


  const navigate = useNavigate();
  const { state } = useLocation();


  //Formatting the birthday to be compatible with input type date
  const bDay = new Date(state.bDay);
  const month = `${bDay.getMonth() < 10? `0${bDay.getMonth()}`: bDay.getMonth()}`;
  const day = `${bDay.getDate() < 10? `0${bDay.getDate()}`: bDay.getDate()}`;
  const formattedBday = [bDay.getFullYear(), month, day].join("-");


  const [fName, setFname] = useState(state.fName);
  const [lName, setLname] = useState(state.lName);
  const [birthday, setBirthday] = useState(formattedBday);
  const [error, setError] = useState(null);


  const handleBtn = async (e) => {
    e.preventDefault();

    const actor = {
        firstName: fName,
        lastName: lName,
        birthday: birthday
    };


    const response = await fetch("https://mern-actors-app.onrender.com/api/actors/" + state.id, {
        method: 'PATCH',
        body: JSON.stringify(actor),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("user")}`
        }
        
    })

    const json = await response.json();

    if (!response.ok) {
        setError(json.error)
    }

    //Redirect
    if(response.ok) {
        setError(null);
        return navigate("/");
    }
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
                <button type='submit' onClick={handleBtn} className="m-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Update</button>
            </div>

            {error && <div className="text-xl text-red-600">{error}</div>}
        </form>
    </div>
  )
}

export default Update