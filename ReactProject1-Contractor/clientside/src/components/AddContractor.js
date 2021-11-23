import React, {useState} from "react";

export default function AddContractor(props){

    const[licenceClass, setLicenceClass] = useState([]);
    const[existingLicence, setExistingLicence] =useState("")
    const[day, setDay] = useState("");
    const[month, setMonth] = useState("");
    const[year, setYear] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[dob, setDob] = useState("");
    const[street, setStreet] = useState("");
    const[suburb, setSuburb] = useState("");
    const[state, setAusState] = useState("");
    const[postcode, setPostcode] = useState("");
    const[certificate, setCertificate] = useState("");
    const[experience, setExperience] = useState("");
    const[supervisorName, setSupervisorName] = useState("");
    const[displayExpiryInfo, setDisplayExpiryInfo] = useState(false);
    
    function sendAddContractorRequest(e){
        e.preventDefault()

        let u = {
            licenceClass,
            existingLicence,
            day,
            month,
            year,
            firstName,
            lastName,
            dob,
            street,
            suburb,
            state,
            postcode,
            certificate,
            experience,
            supervisorName
        };

        //posting the data to the server    
        fetch("http://localhost:4000/api/contractors", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(u)
        })
        .then((response)=> response.json())
        .then(json => {
            if(json.status === 200){
            props.addContractor(json.u)
        }
        else{
            alert("There was an error");
            
        }
    })
    }
    let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    let months=["jan", "feb", "mar","apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    let years=["before2015", "2015", "2016", "2017","2018","2019", "2020", "2021", "2022", "2023", "2024", "2025"];
    let states=["nsw", "act", "vic", "sa", "wa", "nt", "qld", "tas"];
    let certificates=["cert1", "cert2", "cert3","cert4","cert5","cert6","cert7","cert8","cert9"];
    let content = (
        <div style={{border:"1px dotted black", padding:"5px", margin:"5px"}}>Please select your current Expiry Date: 
            <select id="expiryDay" name="expiryDay" onChange={(e) => setDay(e.target.value)}>
                <option value="default">Day</option>
                {days.map((d)=><option key={d} value={d} >{d}</option>)}
            </select>
            <select id="expiryMonth" name="expiryMonth" onChange={(e) =>setMonth(e.target.value)}>
                <option value="default">Month</option>
                {months.map((m)=><option key={m} value={m}>{m}</option>)}
            </select>
            <select id="expiryYear" name="expiryYear" onChange={(e) =>setYear(e.target.value)}>
                <option value="default">Year</option>
                {years.map((y)=><option key={y} value={y}>{y}</option>)}
            </select>
        </div>);

    function displayExpiry(event){
        let value = event.target.value;
        let ischecked = event.target.checked;
        console.log(value);
        if(value === "yes" && ischecked){
            setDisplayExpiryInfo(true);
        } else{
            setDisplayExpiryInfo(false);
        }
    }
    
    return(
        <div style={{border:"2px solid red", padding:"5px", margin:"5px"}}>
            <form>
                <h1>Please Complete the following to apply for a NSW Contractor Licence</h1>
                <div>
                    <div>Please select the Licence Type/Types you wish to apply for: </div>
                    <input type="checkbox" id="licence1" name="licence1" value="carpentry" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence1"> Carpenter</label><br></br>

                    <input type="checkbox" id="licence2" name="licence2" value="building" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence2"> Builder </label><br></br>

                    <input type="checkbox" id="licence3" name="licence3" value="electrical" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence3"> Electrician</label><br></br>

                    <input type="checkbox" id="licence4" name="licence4" value="plumbing" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence4"> Plumber</label><br></br>

                    <input type="checkbox" id="licence5" name="licence5" value="painting" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence5"> Painter</label><br></br>

                    <input type="checkbox" id="licence6" name="licence6" value="plastering" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence6"> Plasterer</label><br></br>

                    <input type="checkbox" id="licence7" name="licence7" value="airConditioning" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence7"> Air Condition Installer</label><br></br>

                    <input type="checkbox" id="licence8" name="licence8" value="refrigeration" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence8"> Refrigerator Installer</label><br></br>

                    <input type="checkbox" id="licence9" name="licence9" value="swimmingPool" onChange={(e) => setLicenceClass(e.target.value)} />
                    <label htmlFor="licence9"> Swimming Pool Builder</label><br></br>
                </div>
                <br />
                <div>Do you currently hold or have you ever held a Contractor Licence in NSW before? <br/>
                    <input type="radio"  name="currentLicence" value="yes" onChange={(e) => {setExistingLicence(e.target.value); displayExpiry(e)}} />
                    <label htmlFor="currentLicenceYes">Yes</label>
                    <input type="radio"  name="currentLicence" value="no" onChange={(e) => {setExistingLicence(e.target.value); displayExpiry(e)}} />
                    <label htmlFor="currentLicenceNo">No</label><br/>
                </div>
                <br />
                {/* The expiry date part will only show if the above radio button is a yes */}
                
                <div> {displayExpiryInfo && content} </div>
               
                <br />
                <div>
                    <div>
                        Please Enter Your Name: 
                        <input placeholder="first and middle name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="dob">Please enter your Date of Birth: </label>
                    <input type="date" id="dob" name="dob" onChange={(e) => setDob(e.target.value)} />
                </div>
                <br />
                <div>
                    Please Enter Your Address
                    <input placeholder="Street Number and Name" onChange={(e)=> setStreet(e.target.value)}/>
                    <input placeholder="Suburb" onChange={(e)=> setSuburb(e.target.value)}/>
                    <select id="state" name="state" onChange={(e) =>setAusState(e.target.value)}>
                        <option value="default">State</option>
                        {states.map((s)=><option key={s} value={s}>{s}</option>)}
                    </select>
                    <input placeholder="Postcode" onChange={(e)=> setPostcode(e.target.value)}/>
                </div>
                <br />
                {/* want to ask for qualifications for each checkbox that was ticked */}
                <div>
                    <h3> Please Enter your Qualifications: </h3>
                    Please select what qualification certificate your have obtained: 
                    <select id="certificate" name="certificate" onChange={(e) =>setCertificate(e.target.value)}>
                        <option value="default">Select Certificate</option>
                        {certificates.map((c)=><option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <br />
                <div>
                    Please indicate the length of your practical experience in the industry:  <br/>
                    <input type="radio" id="noExperience" name="experience" value="none" onChange={(e) => setExperience(e.target.value)}/>
                    <label htmlFor="noExperience">No Experience required</label>
                    <input type="radio" id="12months" name="experience" value="12" onChange={(e) => setExperience(e.target.value)}/>
                    <label htmlFor="12months">12 Months</label>
                    <input type="radio" id="24months" name="experience" value="24" onChange={(e) => setExperience(e.target.value)}/>
                    <label htmlFor="24months">24 Months</label><br/>
                </div>
                <br />
                <div>
                    Please enter the full name of the Supervisor able to sign off on your practical experience: 
                    <input placeholder="supervisor name" onChange={(e) => setSupervisorName(e.target.value)}/>
                </div>
                <button onClick={sendAddContractorRequest}>Submit</button>
            </form>
        </div>
    )
    
    }