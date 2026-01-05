//import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Entry, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";


/* interface Props {

}  */

const PatientInfo = () => {
   
    const  id  = String(useParams().id);

    const [patient, setPatient] = useState<Patient | null>(null);

    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);


 useEffect(() => {
    if (!id) {
        console.log("ojdå");
    }

    const fetchData = async () => {
      const patientData = await patientService.getPatient(id);
      setPatient(patientData);

      const diagData = await diagnosisService.getAll();
      setDiagnoses(diagData);
    };
    
    void fetchData();
  }, [id]);
  
    console.log(patient);

    if (!patient) {
  return <div>Loading...</div>;
}

//helper function to find the corresponding diagnosis
    const findDiagnosis = (code: string) => {
        const diagnosis = diagnoses?.find(diag => diag.code === code);
        return diagnosis?.name;
    };

// i have a spelling error where i call ssh ssn, dont know where this started might fix it might not
  return(
    <div>
        <h1>{patient.name}</h1>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h2> entries </h2>
        {patient.entries.map((entry: Entry) => (
            <div key={entry.id}>
            <p> {entry.date} {entry.description }</p>
        
            {entry.diagnosisCodes?.map((code: string) => (
                <li key={code}> {code} {findDiagnosis(code)} </li>
            ))}
            
            <li> {entry.type} </li>
            </div>

        ))}

     
    </div>
    );

    
};

export default PatientInfo;
