import { useState, useEffect } from 'react';
import { formatTime } from '../utils';

// cronómetro: cuenta hacia arriba desde 0
function Stopwatch() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return; // en pausa: no hay intervalo

    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
  };

  return (
    <div className="panel">
      <p className="display">{formatTime(totalSeconds)}</p>
      <div className="buttons">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pausar' : totalSeconds > 0 ? 'Continuar' : 'Iniciar'}
        </button>
        <button onClick={handleReset} disabled={totalSeconds === 0}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
