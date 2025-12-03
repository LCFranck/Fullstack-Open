import { NewPatient , Gender} from './types';


const isString = (text: unknown): text is string => {
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

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)

    };

    return newPatient;
  }
  console.log(object);

  throw new Error('Incorrect data: some fields are missing');
};


export default toNewPatient;