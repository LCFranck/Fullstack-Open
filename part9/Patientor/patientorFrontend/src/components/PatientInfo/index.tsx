//import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";

/* interface Props {

}  */

const PatientInfo = () => {
   
    const  id  = String(useParams().id);

  const [patient, setPatient] = useState<Patient | null>(null);



 useEffect(() => {
    if (!id) {
        console.log("ojdå");
    }

    const fetchPatient = async () => {
      const data = await patientService.getPatient(id);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);
  
    console.log(patient);

    if (!patient) {
  return <div>Loading...</div>;
}
// i have a spelling error where i call ssh ssn, dont know where this started might fix it might not

  return(
    <div>
        <h1>{patient.name}</h1>
        <h3>ssh: {patient.ssn}</h3>
        <h3>occupation: {patient.occupation}</h3>
    </div>
    );

    
};

export default PatientInfo;
