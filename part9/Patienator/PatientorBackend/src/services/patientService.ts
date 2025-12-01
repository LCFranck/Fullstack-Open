import patientData from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {  return patients;};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({  
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation  }));
  };

const addPatient = () => {
  return null;
};

/*    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop"
    }, */

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient
};