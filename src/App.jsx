import { useState } from 'react';
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import Countdown from './components/Countdown';
import Pomodoro from './components/Pomodoro';
import './App.css';

// lista de pestañas: cada una tiene un id, un nombre y el componente que muestra
const TABS = [
  { id: 'stopwatch', label: 'Cronómetro', Component: Stopwatch },
  { id: 'countdown', label: 'Cuenta regresiva', Component: Countdown },
  { id: 'pomodoro', label: 'Pomodoro', Component: Pomodoro },
];

function App() {
  const [activeTab, setActiveTab] = useState('stopwatch');

  return (
    <div className="app">
      <Clock />

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* renderizamos TODAS las pestañas y ocultamos las inactivas con "hidden"
          así los componentes no se desmontan y conservan su estado (timers corriendo) */}
      {TABS.map(({ id, Component }) => (
        <div key={id} className="tab-content" hidden={id !== activeTab}>
          <Component />
        </div>
      ))}
    </div>
  );
}

export default App;
