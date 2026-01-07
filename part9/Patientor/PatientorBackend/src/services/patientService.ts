import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient , EntryWithoutId, Entry} from '../types';

import { randomUUID } from "crypto";

const patients: Patient[] = patientData;

//const entries: Entry[] = patientData;


const getPatients = (): Patient[] => {  return patients;};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({  
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries  }));
  };



const findById = (id: string): Patient | undefined  => {
    const patient = patients.find(d => d.id === id);  
    return patient;
  };


const addPatient = ( patient: NewPatient ): Patient => {
  const newId = randomUUID();

  const newPatient = {
    id: newId,
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};


const addEntry = ( entry: EntryWithoutId, patientID: string ): Entry => {

   const patient = patients.find(p => p.id === patientID);
   
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newId = randomUUID();
  const newEntry = {
    id: newId,
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};
  
  
export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};