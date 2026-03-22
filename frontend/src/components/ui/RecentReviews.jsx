import { getHistory } from "../../utils/history";
import { getScoreMeta } from "../../utils/score";

export default function RecentReviews({ onSelect }) {
  const history = getHistory();
  if (history.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Recently Reviewed</p>
      <ul className="space-y-1">
        {history.map((item, i) => {
          const meta = getScoreMeta(item.score);
          return (
            <li key={i}>
              <button
                onClick={() => onSelect(item.name)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-600 transition text-left"
              >
                <span className="text-sm text-gray-300 truncate">{item.name}</span>
                <span className={`text-sm font-semibold ml-3 flex-shrink-0 ${meta.color}`}>
                  {item.score}/100
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
