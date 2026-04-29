const MAX_LOGS = 500;
const logs = [];

const normalizeLevel = (level) => {
  if (["info", "warn", "error"].includes(level)) {
    return level;
  }

  return "info";
};

export const log = (level, event, payload = {}) => {
  const safeLevel = normalizeLevel(level);
  const entry = {
    timestamp: new Date().toISOString(),
    level: safeLevel,
    event,
    payload,
  };

  logs.push(entry);

  if (logs.length > MAX_LOGS) {
    logs.splice(0, logs.length - MAX_LOGS);
  }

  console[safeLevel](`[LOG][${entry.timestamp}][${safeLevel}][${event}]`, payload);

  return entry;
};

export const getLogs = () => [...logs];

export const clearLogs = () => {
  logs.length = 0;
};

if (typeof window !== "undefined") {
  window.__appLogs = getLogs;
}
