import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pongg');
});

/* app.get('/api/patients', (_req, res) => {
  console.log('someone pinged here');
  res.send('pongg');
}); */

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});