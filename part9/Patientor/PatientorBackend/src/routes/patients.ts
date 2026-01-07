import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';

import { newPatientSchema } from '../utils';

import { z } from 'zod';

import { NewPatient, EntryWithoutId } from '../types';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});



router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});


/* const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
 */
//Patient parser!
/* const newEntryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}; */

//used for creating new entries
router.post('/:id/entries', (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<EntryWithoutId>) => {
  
  try{
    const patientId = req.params?.id;
    const newEntry = (req.body);

  const addedEntry = patientService.addEntry(newEntry, patientId);
  res.json(addedEntry);
  }


catch(error: unknown){
  console.log("error", error);
  res.sendStatus(404);

}});

//Patient parser!
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});


router.use(errorMiddleware);


export default router;
