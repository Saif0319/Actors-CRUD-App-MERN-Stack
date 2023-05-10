import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Actors from "../components/Actors";
import { ActorsContext } from "../context/ActorsContext";


const Home = () => {

    const [actors, setActors] = useState([]);
    const { dispatch } = useContext(ActorsContext);
    const [sort, setSort] = useState("fName");

    useEffect(() => {
        const fetchActors = () => {
          axios.get(`http://localhost:4000/api/actors/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("user")}`
            }
          })
            .then((res) => {
              const data = res.data;
              setActors(data);
              
              dispatch({
                type: "SET_ACTORS",
                payload: data
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      
        if(localStorage.getItem("user")) {
          fetchActors();
        }

      }, [dispatch]);


  return (
    <div>
        <h1 className="text-5xl font-bold text-center mt-10 mb-20">Actors</h1>
        <label className="mx-4">Sort by</label>
        <select className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2 mx-4 mt-1 mb-10 dark:border-black placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setSort(e.target.value)}>
            <option value={"fNameAsc"}>First Name (default)</option>
            <option value={"fNameDesc"}>First Name (DESC) </option>
            <option value={"lNameAsc"}>Last Name (ASC)</option>
            <option value={"lNameDesc"}>Last Name (DESC)</option>
            <option value={"ageDesc"}>Age (DESC)</option>
            <option value={"ageAsc"}>Age (ASC)</option>
        </select>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-3/4 h-full">

            {
                //Age (Desc)
                sort === "ageDesc" ? actors.sort((actor1, actor2) => (actor1.birthday < actor2.birthday) ? 1 : -1).map(actor => {
                    return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
                })

                // Age (Asc) 
                : sort === "ageAsc" ? actors.sort((actor1, actor2) => (actor1.birthday < actor2.birthday) ? -1 : 1).map(actor => {
                    return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
                })

                // sort by last name Asc
                : sort === "lNameAsc" ? actors.sort((actor1, actor2) => (actor1.lastName < actor2.lastName) ? -1 : 1).map(actor => {
                    return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
                })

                // sort by last name Desc
                : sort === "lNameDesc" ? actors.sort((actor1, actor2) => (actor1.lastName < actor2.lastName) ? 1 : -1).map(actor => {
                    return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
                })

                // sort by first name Desc
                : sort === "fNameDesc" ? actors.sort((actor1, actor2) => (actor1.firstName < actor2.firstName) ? 1 : -1).map(actor => {
                    return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
                })
                

                // sort by first name Asc (default)
                : actors.sort((actor1, actor2) => (actor1.firstName < actor2.firstName) ? -1 : 1).map(actor => {
                    return <Actors fName={actor.firstName} lName={actor.lastName} birthday={actor.birthday} key={actor._id} id={actor._id} />
                })
            }

            
        </div>
    </div>
  )
}

export default Home