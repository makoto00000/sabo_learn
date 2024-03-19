export const getTimeStringFromSeconds = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(Math.floor(seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const hh = h.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};
