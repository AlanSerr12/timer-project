// convierte un número a texto de 2 dígitos: 5 -> "05"
export const pad = (n) => String(n).padStart(2, '0');

// convierte segundos totales a formato HH:MM:SS
export const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
