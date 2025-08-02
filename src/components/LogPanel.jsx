import { Clock, Terminal } from "lucide-react";

// LogPanel displays the last 5 chat interactions with timestamp, model used, prompt, and response
function LogPanel({ logs }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white/80 backdrop-blur-lg border border-indigo-200 shadow-xl rounded-2xl p-6 transition-transform hover:scale-[1.01]">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4 flex items-center justify-center gap-2">
        Chat Log
      </h2>

      <div className="text-sm max-h-64 overflow-y-auto space-y-4 font-mono px-1">
        {/* Show fallback if no logs yet */}
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center italic">No logs yet</p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50/40 rounded-lg shadow-sm"
            >
              {/* Timestamp and model pill */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.timestamp}
                </span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {log.model}
                </span>
              </div>

              {/* Truncated prompt and response */}
              <p className="text-gray-800">
                <span className="text-indigo-600 font-semibold">Prompt:</span>{" "}
                {log.prompt}
              </p>
              <p className="text-gray-800">
                <span className="text-indigo-600 font-semibold">Response:</span>{" "}
                {log.response}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LogPanel;
