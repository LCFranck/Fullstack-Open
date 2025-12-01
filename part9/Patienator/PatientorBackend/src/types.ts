/* export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

 */

export type Gender = 'male' | 'female' | 'other' ;


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;

  
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

 /*    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop"
    }, */