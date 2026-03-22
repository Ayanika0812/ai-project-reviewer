const KEY = "review_history";
const MAX = 5;

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveToHistory({ name, score, mode }) {
  const history = getHistory();
  const entry = { name, score, mode, reviewedAt: Date.now() };

  // Remove duplicate if same repo was reviewed before
  const filtered = history.filter(h => h.name !== name);
  const updated = [entry, ...filtered].slice(0, MAX);

  localStorage.setItem(KEY, JSON.stringify(updated));
}
