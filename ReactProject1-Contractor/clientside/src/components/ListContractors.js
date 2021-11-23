import React, {useState} from "react";
import IndividualContractors from "./IndividualContractor";

export default function ListContractors(props){

    const[displayAllContractors, setDisplayAllContractors] = useState(true);
    const[searchTerm, setSearchTerm] = useState(undefined);
    const[content, setContent] = useState((<div>{props.allContractors.map((c) => <IndividualContractors key={c.licenceNumber} c={c} />)}</div>));
    
    //which group of contractors will be displayed
    //if the search term is empty then value will be true and the && statment will work
    function displayAllOrSearched(){ 
      debugger;  
      //if there is no search term then display all of the contractors     
        if(searchTerm === undefined){
            return (<div>
                {props.allContractors.map((c) => <IndividualContractors key={c.licenceNumber} c={c} />)}
                </div>);
            //if a search term is specified then filter by the search term
        } if(searchTerm !== undefined){
            return(<div>
                {props.allContractors.filter(c => c.licenceNumber == searchTerm).map((c) => <IndividualContractors key={c.licenceNumber} c={c} />)}
                </div>);
        }else {
            setDisplayAllContractors(false);
        }
    }

    return(
        <div>
            <h1>List of Existing Contractors</h1>
            <div>
                <input type="text" className="input" placeholder="Search for Contractor" value={searchTerm || ""} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div>
                {/* display all of the contractors unless a search term is specified, then show all */}
                {displayAllOrSearched()}    
            </div>
        </div>
    )
}