//import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Entry, Diagnosis, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import { Box, List, ListItem, Typography, Button } from '@mui/material';

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WorkIcon from '@mui/icons-material/Work';

import EntryForm from "../EntryForm";

import axios from 'axios';



/* interface Props {

}  */

const PatientInfo = () => {

    
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

   
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


    const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  /*  const submitNewEntry =  () => {
    setModalOpen(false);
      console.log("howdy");
    }; */

    const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(values, id);
      patient?.entries.concat(entry);
      setModalOpen(false);

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  
    console.log(patient);

    if (!patient) {
  return <div>Loading...</div>;
}

//helper function to find the corresponding diagnosis
    const findDiagnosis = (code: string) => {
        const diagnosis = diagnoses?.find(diag => diag.code === code);
        return diagnosis?.name;
    };

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


    const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
        switch(entry.type){
            case "Hospital":
                return (<LocalHospitalIcon/>);
            case "HealthCheck":
                return <MonitorHeartIcon/>;
            case "OccupationalHealthcare":
                return (<ListItem>  <WorkIcon/> {entry.employerName} </ListItem>);
            default: 
                assertNever(entry);
        }

    };
//matieralUI is bullshit and i hate it
  return(
    <Box>
        <Typography variant="h3">{patient.name}</Typography>
        <Typography variant= "body1" > ssn: {patient.ssn}</Typography>
        <Typography variant= "body1" > occupation: {patient.occupation}</Typography>
        <Typography variant="h4" > entries </Typography>
        {patient.entries.map((entry: Entry) => (
            <Box key={entry.id} sx={{ marginBottom: 2, padding: 1, border: '1px solid #000000ff', borderRadius: 3 }}>
                <List>
            <ListItem> {entry.date} <EntryDetails entry={entry} /> </ListItem>
            <ListItem>
                {entry.description }
            </ListItem>

            {entry.diagnosisCodes?.map((code: string) => (
                <ListItem key={code}> {code} {findDiagnosis(code)} </ListItem>
            ))}
            
            <ListItem> {entry.type} </ListItem>
            </List>
            </Box>

        ))}

     <EntryForm
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses ?? []}
      />
       <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
       
    </Box>
    );

    
};

export default PatientInfo;
