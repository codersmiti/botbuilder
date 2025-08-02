import { Sparkles, Bot, User } from "lucide-react"; 

// BotConfigForm is a controlled component for collecting chatbot configuration details
function BotConfigForm({
  botName,
  setBotName,
  persona,
  setPersona,
  model,
  setModel,
  onSave,
}) {
  // Handles form submission by calling the parent-provided onSave function
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/80 border border-indigo-200 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto animate-fade-in"
    >
      {/* Header with icon and title */}
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6 flex items-center justify-center gap-2">
        <Bot className="w-6 h-6 text-indigo-600" />
        Configure Your Bot
      </h2>

      {/* Input: Bot Name */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bot Name
        </label>
        <input
          type="text"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="e.g. InterviewAceBot"
          required
        />
      </div>

      {/* Input: Persona */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Persona
        </label>
        <input
          type="text"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="e.g. A helpful technical interview coach"
          required
        />
      </div>

      {/* Radio-style button group for model selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model Selection
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-full border transition ${
              model === "gpt-3.5"
                ? "bg-indigo-600 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setModel("gpt-3.5")}
          >
            GPT-3.5
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-full border transition ${
              model === "gpt-4o"
                ? "bg-indigo-600 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setModel("gpt-4o")}
          >
            GPT-4o
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition"
      >
        Save 
      </button>
    </form>
  );
}

export default BotConfigForm;
