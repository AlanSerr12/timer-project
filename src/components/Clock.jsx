import { useState, useEffect } from 'react';

// reloj global: siempre muestra la hora y la fecha actual
function Clock() {
  // useState con función: se calcula una sola vez al montar el componente
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="clock">
      <p className="clock-time">
        {now.toLocaleTimeString('es', { hour12: false })}
      </p>
      <p className="clock-date">
        {now.toLocaleDateString('es', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </header>
  );
}

export default Clock;
