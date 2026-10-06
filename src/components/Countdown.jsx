import { useState, useEffect } from 'react';
import { formatTime } from '../utils';

// cuenta regresiva: el usuario elige h/m/s y baja hasta 0
function Countdown() {
  // lo que el usuario escribe en los inputs (como texto)
  const [input, setInput] = useState({ h: '0', m: '1', s: '0' });
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // "activo" = el usuario lo inició Y todavía queda tiempo
  // al llegar a 0 se vuelve false solo, y el efecto limpia el intervalo
  const active = isRunning && remaining > 0;

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  const inputSeconds =
    Number(input.h) * 3600 + Number(input.m) * 60 + Number(input.s);

  const handleChange = (field) => (e) => {
    setInput({ ...input, [field]: e.target.value });
  };

  const handleStart = () => {
    if (active) {
      setIsRunning(false); // pausar
      return;
    }
    // si no hay tiempo restante, arrancamos desde lo que puso el usuario
    if (remaining === 0) setRemaining(inputSeconds);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemaining(0);
  };

  const finished = isRunning && remaining === 0;
  const started = remaining > 0;

  return (
    <div className="panel">
      {started || finished ? (
        <p className={`display ${finished ? 'finished' : ''}`}>
          {finished ? '¡Tiempo!' : formatTime(remaining)}
        </p>
      ) : (
        <div className="inputs">
          {[
            ['h', 'horas'],
            ['m', 'min'],
            ['s', 'seg'],
          ].map(([field, label]) => (
            <label key={field}>
              <input
                type="number"
                min="0"
                max={field === 'h' ? 99 : 59}
                value={input[field]}
                onChange={handleChange(field)}
              />
              {label}
            </label>
          ))}
        </div>
      )}

      <div className="buttons">
        <button
          onClick={handleStart}
          disabled={!started && !finished && inputSeconds === 0}
        >
          {active ? 'Pausar' : started ? 'Continuar' : 'Iniciar'}
        </button>
        <button onClick={handleReset} disabled={!started && !finished}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Countdown;
