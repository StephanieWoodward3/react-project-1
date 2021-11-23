const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const storage = require("node-persist");

async function initStorage(){
    const storageOptions ={
        dir:"./data",
        stringify:JSON.stringify,
        parse:JSON.parse,
        encoding:"utf8",
        logging:false,
        ttl:false,
        expiredInterval: 2*60*1000,
        forgiveParseErrors:false,
    };

    //if the file doesnt exist, it will create it with the above options
    await storage.init(storageOptions);

    //save data to the file
    //await storage.setItem(key, value [options])
    //await storage.setItems(contractorLicApp.licenceNumber, u);


    //get 1 data from file
    //let value = await storage.getItem("licenceNumber"); // id is the "key" and must be a string

    //get all data from file
    //console.log(await storage.values())

    //delete data from file
    //await storage.removeItem("licenceNumber")

    //update data in file
    //await storage.setItem(key, value, [options])

    
}

async function initServer(){

    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());
    const PORT = process.env.PORT || 4000;

    //home page
    server.get("/", (request, response)=>{
        response.send(`this is the home page`)
    });

    //getting all the data from all the files - finished
    server.get("/api/contractors", async(request, response)=>{
        let data = await storage.values(); 
        response.json(data); 
    });

    //get a single file from the data matching LicNumber
    server.get("/api/contractors", async(request, response) =>{
        let licNum = request.params.licenceNumber;
        let person = await storage.getItem(licNum)
        response.json(order)
    })

    //saving the data to a new storage file - finished
    server.post("/api/contractors", async(request, response)=>{
        try{
            let licenceClass = request.body.licenceClass.trim();
            let existingLicence = request.body.existingLicence.trim();
            let day = request.body.day.trim();
            let month = request.body.month.trim();
            let year = request.body.year.trim();
            let firstName = request.body.firstName.trim();
            let lastName = request.body.lastName.trim();
            let dob = request.body.dob.trim();
            let street = request.body.street.trim();
            let suburb = request.body.suburb.trim();
            let state = request.body.state.trim();
            let postcode = request.body.postcode.trim();
            let certificate = request.body.certificate.trim();
            let experience = request.body.experience.trim();
            let supervisorName = request.body.supervisorName.trim();

            
            let highest = 0;
            let existingRecords = await storage.values(); 
            for(let er of existingRecords){
                if(er.licenceNumber > highest){
                    highest = er.licenceNumber;
                }
            }
            //save data to storage(a new file)
            let newId=++highest
            let u = {licenceNumber:newId,licenceClass,existingLicence,day,month, year, firstName, lastName, dob, street, suburb, state, postcode, certificate, experience, supervisorName}; 
            await storage.setItem(u.licenceNumber.toString(), u)
            response.json({u, status:200});
        }
        catch(error){
            response.json({status:500})

        }
    });

    //update contractor by licenceNumer
    server.put("/api/contractors", async(request, response) =>{
        let result = await storage.updateItem(key, request.body);
        response.json(result.content.value)
    })


    server.listen(PORT, ()=>{
        console.log("the server is up and running and listening on port: " + PORT)
    })

}

initStorage().then(()=>initServer())


































