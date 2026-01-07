import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { EntryFormValues, EntryType, HealthCheckRating, Diagnosis } from "../../types";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, {Dayjs} from 'dayjs';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

/* interface GenderOption{
  value: Gender;
  label: string;
} */

/* interface HealthCheckRating {
    value: HealthCheckRating;
    label: number; 
} */
/* 
const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
})); */



const AddPatientForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
    //base entry variables
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
   // const [diagnosisString, setDiagnosisString] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [date, setDate] = useState('');
   // const [gender, setGender] = useState(Gender.Other);

    //hospital specifics and type
    const [type, setType] = useState<EntryType>("Hospital");
    const [criteria, setCriteria] =  useState('');
    const [dischargeDate, setDischargeDate] =  useState('');

  //works specific
    const [employerName, setEmployerName] =  useState('');
    const [sickLeaveStart, setSickLeaveStart] =  useState('');
    const [sickLeaveEnd, setSickLeaveEnd] =  useState('');

  //health checkup specific
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
   // healthCheckRating: number; //this could be the enum aswell? unsure if its needed to validate but on server and client


    const types: EntryType[] = ["Hospital", "HealthCheck", "OccupationalHealthcare"];

 /*  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g === value);
      if (gender) {
        setGender(gender);
      }
    }
  };
 */
const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
  const value = event.target.value;

  setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  console.log(diagnosisCodes);
};


const onTypeChange = (event: SelectChangeEvent<EntryType>) => {
  setType(event.target.value as EntryType);
  console.log(type);
};


/*  
 const [employerName, setEmployerName] =  useState('');
    const [sickLeaveStart, setSickLeaveStart] =  useState('');
    const [sickLeaveEnd, setSickLeaveEnd] =  useState('');
   */
 const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const codesToSubmit =  diagnosisCodes.length > 0 ? diagnosisCodes : undefined;
   
    switch(type){
            case "Hospital":{
                onSubmit({
                    description,
                    date,
                    specialist,
                    diagnosisCodes: codesToSubmit,
                    discharge: {
                        date: dischargeDate,
                        criteria,
                    },
                    type,
                    
                });
                break;
              //  return (<div> hello </div>);
            }
            case "HealthCheck": {
                  onSubmit({
                    description,
                    date,
                    specialist,
                    diagnosisCodes: codesToSubmit,
                    healthCheckRating,
                    type
                });
            }
            break;
             //   return (<div></div>)
            case "OccupationalHealthcare":{
                 const sickLeave = sickLeaveStart && sickLeaveEnd? {
                        startDate: sickLeaveStart,
                        endDate: sickLeaveEnd,
                        }
          : undefined;
                  onSubmit({
                    description,
                    date,
                    specialist,
                    diagnosisCodes: codesToSubmit,
                    employerName,
                    sickLeave,
                    type
                });
                break;
             //return (<div></div>);
            }
  }
};


  const specificEntries = () => {
    switch(type){
            case "Hospital":
                return (<div>
                    <TextField
                        label="Criteria"
                        fullWidth
                        value={criteria}
                        onChange={({ target }) => setCriteria(target.value)}
                    />
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Discharge date"
                        defaultValue={dayjs('2026-01-01')}
                        value={dischargeDate ? dayjs(dischargeDate) : null}//chnage sickleavestart to dayjs (might not be otimal solution to chnage back and forth)
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setDischargeDate(newValue.format('YYYY-MM-DD')); // dayjs format returns a string!
                        else setDischargeDate('');
                        }}   
                        />
                        </LocalizationProvider>
                    </div>
                );
            case "HealthCheck":
                return (<div>
                    <TextField
                        label="healthCheckRating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                    /> 
                  
                    
                    </div>
                );
            case "OccupationalHealthcare":
                return (<div>
                    <TextField
                        label="employer"
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Sickleave start date"
                        defaultValue={dayjs('2026-01-01')}
                         value={sickLeaveStart ? dayjs(sickLeaveStart) : null} //chnage sickleavestart to dayjs (might not be otimal solution to chnage back and forth)
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setSickLeaveStart(newValue.format('YYYY-MM-DD')); // dayjs format returns a string!
                        else setSickLeaveStart('');
                        }}   
                        />
                        </LocalizationProvider>
                  {/*   <TextField
                        label="Sickleave start date"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={sickLeaveStart}
                        onChange={({ target }) => setSickLeaveStart(target.value)}
                    /> */}
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Sickleave end date"
                        defaultValue={dayjs('2026-01-01')}
                        value={sickLeaveEnd ? dayjs(sickLeaveEnd) : null} //chnage sickleavestart to dayjs (might not be otimal solution to chnage back and forth)
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setSickLeaveEnd(newValue.format('YYYY-MM-DD')); // dayjs format returns a string!
                        else setSickLeaveEnd('');
                        }}   
                        />
                        </LocalizationProvider>
                 {/*    <TextField
                        label="Sickleave end date"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={sickLeaveEnd}
                        onChange={({ target }) => setSickLeaveEnd(target.value)}
                    /> */}
                    </div>
                );
            default: 
                return (null);
        }

  };
 /* const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);;
    const [date, setDate] = useState(''); */

  return (
    <div>
      <form onSubmit={addEntry}>
         <InputLabel style={{ marginTop: 20 }}>Type of entry</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {types.map(option =>
          <MenuItem
            key={option}
            value={option}
          >
            {option
          }</MenuItem>
        )}
        </Select>
        <TextField
          label="description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Date"
                        defaultValue={dayjs('2026-01-01')}
                         value={date ? dayjs(date) : null} //chnage sickleavestart to dayjs (might not be otimal solution to chnage back and forth)
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setDate(newValue.format('YYYY-MM-DD')); // dayjs format returns a string!
                        else setDate('');
                        }}   
                        />
                        </LocalizationProvider>
        
        {specificEntries()/* checks what type of entry is made and shows relevant input */}
        <Select
            multiple
            label="Diagnosis"
            fullWidth //for better UI
            value={diagnosisCodes}
            onChange = {onDiagnosisChange}
            >
            {diagnoses.map(diagnosis =>
            <MenuItem
                key={diagnosis.code}
                value={diagnosis.code}
            >
                {diagnosis.code
            }</MenuItem>
            )
            
            }
            
            </Select>


        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;