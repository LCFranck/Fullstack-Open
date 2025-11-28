



export const calculateBmi  = (mass: number, height: number) => {
    const BMI =  mass/(height*height)
     if (isNaN(Number(height)) ||isNaN(Number(mass) )) {
      return("Faulty input, please only numbers!")
    }
    if (BMI<=18.5){
        return("Underweight ")
    }
    else if (BMI<=25){
       return("Normal range " )
    }
    else{
        return("Overweight")
    }
}

if (require.main === module){
    try {
    const mass: number = Number(process.argv[3])
    const height: number = Number(process.argv[2])
    console.log(calculateBmi(mass, height));
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
}






