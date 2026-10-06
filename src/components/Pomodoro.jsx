import { useReducer, useEffect } from 'react';
import { formatTime } from '../utils';

// técnica Pomodoro: 25 min de trabajo, 5 min de descanso, y se repite
const DURATIONS = { work: 25 * 60, break: 5 * 60 };
const LABELS = { work: 'Trabajo', break: 'Descanso' };

const initialState = {
  mode: 'work',
  remaining: DURATIONS.work,
  isRunning: false,
  completed: 0, // pomodoros de trabajo terminados
};

// el reducer recibe el estado y una acción, y devuelve el nuevo estado
// útil cuando varios valores cambian juntos (aquí: al llegar a 0 cambia modo y tiempo a la vez)
function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { ...state, isRunning: !state.isRunning };
    case 'reset':
      return initialState;
    case 'tick': {
      if (state.remaining > 1) {
        return { ...state, remaining: state.remaining - 1 };
      }
      // llegó a 0: cambiamos de modo
      const nextMode = state.mode === 'work' ? 'break' : 'work';
      return {
        ...state,
        mode: nextMode,
        remaining: DURATIONS[nextMode],
        completed: state.mode === 'work' ? state.completed + 1 : state.completed,
      };
    }
    default:
      return state;
  }
}

function Pomodoro() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mode, remaining, isRunning, completed } = state;

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const isPristine =
    !isRunning && mode === 'work' && remaining === DURATIONS.work && completed === 0;

  return (
    <div className="panel">
      <p className={`mode mode-${mode}`}>{LABELS[mode]}</p>
      <p className="display">{formatTime(remaining).slice(3)}</p>
      <p className="completed">Pomodoros completados: {completed}</p>
      <div className="buttons">
        <button onClick={() => dispatch({ type: 'toggle' })}>
          {isRunning ? 'Pausar' : isPristine ? 'Iniciar' : 'Continuar'}
        </button>
        <button onClick={() => dispatch({ type: 'reset' })} disabled={isPristine}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
