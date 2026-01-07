import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { EntryFormValues, EntryType, Diagnosis } from "../../types";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, {Dayjs} from 'dayjs';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}



const AddPatientForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
    //base entry variables
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [date, setDate] = useState('');

    //hospital specifics and type
    const [type, setType] = useState<EntryType>("Hospital");
    const [criteria, setCriteria] =  useState('');
    const [dischargeDate, setDischargeDate] =  useState('');

  //works specific
    const [employerName, setEmployerName] =  useState('');
    const [sickLeaveStart, setSickLeaveStart] =  useState('');
    const [sickLeaveEnd, setSickLeaveEnd] =  useState('');

  //health checkup specific
  const [healthCheckRating, setHealthCheckRating] = useState(1);
  const ratingOptions: number[] = [0,1,2,3];


    const types: EntryType[] = ["Hospital", "HealthCheck", "OccupationalHealthcare"];

const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
  const value = event.target.value;

  setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  console.log(diagnosisCodes);
};


const onTypeChange = (event: SelectChangeEvent<EntryType>) => {
  setType(event.target.value as EntryType);
  console.log(type);
};



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
            }
  }
};
const onRatingChange = (event: SelectChangeEvent<number>) =>{
  setHealthCheckRating(event.target.value as number);
  console.log(type);
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
                 
                        <InputLabel style={{ marginTop: 20 }}>Health rating</InputLabel>
                    <Select
                    label="Health Rating"
                    fullWidth
                    value={healthCheckRating}
                    onChange={onRatingChange}
                    >
                    {ratingOptions.map(option =>
                    <MenuItem
                        key={option}
                        value={option}
                    >
                        {option
                    }</MenuItem>
                    )}
                    </Select>
                    
             
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
                         value={sickLeaveStart ? dayjs(sickLeaveStart) : null} 
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setSickLeaveStart(newValue.format('YYYY-MM-DD'));
                        else setSickLeaveStart('');
                        }}   
                        />
                        </LocalizationProvider>
                
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Sickleave end date"
                        defaultValue={dayjs('2026-01-01')}
                        value={sickLeaveEnd ? dayjs(sickLeaveEnd) : null} 
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setSickLeaveEnd(newValue.format('YYYY-MM-DD')); 
                        else setSickLeaveEnd('');
                        }}   
                        />
                        </LocalizationProvider>
               
                    </div>
                );
            default: 
                return (null);
        }

  };


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
                         value={date ? dayjs(date) : null} 
                        onChange={(newValue: Dayjs | null) => {
                        if (newValue) setDate(newValue.format('YYYY-MM-DD')); 
                        else setDate('');
                        }}   
                        />
                        </LocalizationProvider>
        
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
            )}
            </Select>
        {specificEntries()/* checks what type of entry is made and shows relevant input */}



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