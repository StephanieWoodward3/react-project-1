import React from "react";
import UpdateContractor from "./UpdateContractor";
import DeleteContractor from "./DeleteContractor";

export default function IndivdualContractor(props){

    return(
        <div style={{border:"2px solid purple", padding:"2px", margin:"2px"}}>
            <label>Customer Details</label>
            <ul> 
                <li>Licence Number : {props.c.licenceNumber}</li>
                <li>Licence Class : {props.c.licenceClass}</li>
                <li>First Name : {props.c.firstName}</li>
                <li>Last Name : {props.c.lastName}</li>
                <li>Date of Birth : {props.c.dob}</li>
            </ul>
            <label>Existing Licence Details</label>
            <ul> 
                <li>Existing NSW Contractor Licence Held : {props.c.existingLicence}</li>
                <li>Existing Licence Expiry Date : {props.c.day} {props.c.month} {props.c.year}</li>
            </ul>
            <label>Customer Address</label>
            <ul>
                <li>Street: {props.c.street}</li>
                <li>Suburb : {props.c.suburb}</li>
                <li>State : {props.c.state}</li>
                <li>Postcode : {props.c.postCode}</li>
            </ul>
            <label>Qualification Details</label>
            <ul>
                <li>Certificate : {props.c.certificate}</li>
                <li>Practical Experience : {props.c.experience}</li>
                <li>Supervisor for Practical Experience : {props.c.supervisorName}</li>
            </ul>
            <div>
                <button onClick={()=> <UpdateContractor />}>Update Contractor</button>
                <button onClick={()=> <DeleteContractor />}>Delete Contractor</button>
            </div>

        </div>
    )
}
