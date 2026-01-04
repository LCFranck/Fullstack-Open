import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

import { randomUUID } from "crypto";

const patients: Patient[] = patientData;

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
    entries: [] //change this later!! (maybe)
  };

  patients.push(newPatient);
  return newPatient;
};
  
export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  findById
};