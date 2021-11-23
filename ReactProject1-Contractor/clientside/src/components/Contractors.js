import React, {useState, useEffect} from 'react';
import AddContractor from "./AddContractor";
import DeleteContractor from "./DeleteContractor";
import ListContractors from "./ListContractors";
import UpdateContractor from "./UpdateContractor";

export default function Contractors(){

    const[screen, setScreen] = useState(0);
    const[contractors, setContractors] = useState([]);

    let screens=[
        <div></div>,
        <AddContractor addContractor={addContractor} />,
        <ListContractors allContractors={contractors}/>,
        <UpdateContractor />,
        <DeleteContractor  />  
    ];
    

    //getting the contractors data from the server
    //saves it in the contractors array with the setContractors function
    useEffect(() => {
        fetch("http://localhost:4000/api/contractors")
        .then(response => response.json())
        .then(data => setContractors(data))
    }, []);

    //creates a new data file will all the info from the contractors array
    function addContractor(u){
        setContractors([...contractors, u])
    }



    return (

        <div>
            <h1>Home Page</h1>
            <h3>What would you like to do: </h3>
            <button onClick={()=>setScreen(1)}>Add Contractor</button>
            <button onClick={()=>setScreen(2)}>List Existing Contractors</button>
            <button onClick={()=>setScreen(3)}>Update Contractor</button>
            <button onClick={()=>setScreen(4)}>Delete Contractor</button>
            
            There are {contractors.length} Contractors in the file
            {screens[screen]}
        </div>

    )



}