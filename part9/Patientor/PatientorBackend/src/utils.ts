import { NewPatient , Gender} from './types';

import { z } from 'zod';

// all commented out code is code used for early parts but later chnaged to not be needed.
/* const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error("Invalid or missing string value");
  }
  return value;
};




const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (visibility: unknown): Gender => {
  if (!isString(visibility) || !isGender(visibility)) {
      throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};




const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
 */



/* 
export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.string().date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.nativeEnum(Gender).parse(object.gender),
      occupation: z.string().parse(object.occupation)
    };

    return newPatient;
  }
  console.log(object);

  throw new Error('Incorrect data: some fields are missing');
};


 */


export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;