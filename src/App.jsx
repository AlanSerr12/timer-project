import { useState, useEffect } from 'react';

function App() {
          
    // forma correcta de declarar variables de estado, para que se actualicen cada vez que se renderice el componente
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0); 

    // hook para actualizar el estado cada segundo
    useEffect(() => {
      const secondInterval = setInterval(() => {
        setSeconds((prev) => prev + 1); // actualizamos el estado de seconds, sumando 1 cada segundo
      }, 1000); // cada segundo se ejecuta la función que actualiza el estado

      return () => clearInterval(secondInterval); // limpiamos el intervalo
    }, []);
    
  return (
    <div>
      <h1> Timer </h1>
      <p> {hours} : {minutes} : {seconds} </p>  
    </div>
  );
}

export default App;