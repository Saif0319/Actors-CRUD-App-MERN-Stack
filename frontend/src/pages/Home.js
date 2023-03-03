import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Actors from "../components/Actors";
import { ActorsContext } from "../context/ActorsContext";


const Home = () => {

    const [actors, setActors] = useState([]);
    const { dispatch } = useContext(ActorsContext);

    useEffect(() => {


        const fetchActors = () => {
            axios.get("http://localhost:4000/api/actors/")
            .then((res) => {
                
                const data = res.data;
                console.log(data);
                setActors(data);

                //distpatch an action to update the state
                dispatch({
                    type: "SET_ACTORS",
                    payload: actors
                })
            })
            .catch(err => {
                console.log(err);
            })
            
        }

        fetchActors();
        
        

    }, [actors, dispatch])


  return (
    <div>
        <h1 className="text-5xl font-bold text-center mt-10 mb-20">Actors</h1>
        <div className="grid grid-cols-3 gap-4 w-3/4 h-full">
            {actors.map(actor => {
                return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
            })}
        </div>
    </div>
  )
}

export default Home