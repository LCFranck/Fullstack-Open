import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello world!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;


    const heightNum = Number(height)/100;
    const weightNum = Number(weight);

    if (isNaN(Number(height)) || isNaN(Number(weight) )) {
            return res.send("Error: please only enter numbers ")
         }



    const bmi = calculateBmi(weightNum, heightNum)

 return res.json({
    Weight: weightNum,
    Height: heightNum,
    BMI: bmi,
  });
});

//http://localhost:3003/bmi?height=180&weight=72.

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});