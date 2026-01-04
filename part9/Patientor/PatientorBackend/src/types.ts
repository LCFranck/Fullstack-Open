/* export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

 */

//export type Gender = 'male' | 'female' | 'other' ;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id' | 'entries' >;

/* export type NonSensitivePatient = Omit<Patient, 'ssn'>;
 */export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

 