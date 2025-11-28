import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello world!');
});

app.post('/exercises', (req, res) => {
    if (req.body.length < 3) {
        return res.json ({error: "malformatted parameters"})

    }

    const { daily_exercises, target } = req.body;
    

    for (const x of daily_exercises) {
        if (isNaN(Number(x))) {
        return res.json ({error: "malformatted parameters"})
        } 
    }
    if (isNaN(Number(target))) {
        return res.json ({error: "malformatted parameters"})
    } 


    //  const days = daily_exercises.map(Number);
    const daysNum = daily_exercises.map(Number);
    const targetNum = Number (target);

    

    const result = calculateExercises(daysNum, targetNum);


    return res.json({result})
});

/* 
  const days: number[] = [];
  let target: number;

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
     throw new Error('One of the arguments was not a number!');
  }


  for (const x of args.slice(3)) {
    if (!isNaN(Number(x))) {
      days.push(Number(x));
    } else {
     throw new Error('One of the arguments was not a number!');
    }
  }

  return { days, target };
}; */

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