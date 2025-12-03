"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.newPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
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
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.enum(types_1.Gender),
    occupation: zod_1.z.string()
});
const toNewPatient = (object) => {
    return exports.newPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
exports.default = exports.toNewPatient;
