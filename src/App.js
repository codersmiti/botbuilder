import { useState } from "react";
import BotConfigForm from "./components/BotConfigForm";
import ChatInterface from "./components/ChatInterface";
import LogPanel from "./components/LogPanel";

function App() {
  // Local state for storing bot configuration, chat messages, and log history
  const [botConfig, setBotConfig] = useState(null);
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);

  // Controlled inputs for BotConfigForm (lifted state)
  const [botName, setBotName] = useState("");
  const [persona, setPersona] = useState("");
  const [model, setModel] = useState("gpt-3.5");

  // Save config and reset chat on submission
  const handleSaveConfig = () => {
    setBotConfig({ botName, persona, model });
    setMessages([]); // Clear previous chat
  };

  // Handle user message and append mocked bot reply
  const handleSendMessage = (userInput) => {
    const systemPrompt = `You are a chatbot named ${botConfig.botName}, acting as ${botConfig.persona}.`;

    const userMessage = { sender: "user", text: userInput };
    const botReplyText = `Mocked response from ${botConfig.model.toUpperCase()}`;
    const botMessage = { sender: "bot", text: botReplyText };

    // Update chat messages
    const updatedMessages = [...messages, userMessage, botMessage];
    setMessages(updatedMessages);

    // Add new entry to log (limit to 5)
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newLog = {
      timestamp,
      model: botConfig.model.toUpperCase(),
      prompt: userInput.slice(0, 40) + (userInput.length > 40 ? "..." : ""),
      response: botReplyText.slice(0, 40) + (botReplyText.length > 40 ? "..." : ""),
    };

    setLogs((prevLogs) => [...prevLogs, newLog].slice(-5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        BotBuilder
      </h1>

      {/* Show bot config and chat side-by-side once config is saved */}
      {botConfig && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-8">
          <BotConfigForm
            botName={botName}
            setBotName={setBotName}
            persona={persona}
            setPersona={setPersona}
            model={model}
            setModel={setModel}
            onSave={handleSaveConfig}
          />
          <ChatInterface
            botConfig={botConfig}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      )}

      {/* Show only config form initially */}
      {!botConfig && (
        <div className="max-w-2xl mx-auto">
          <BotConfigForm
            botName={botName}
            setBotName={setBotName}
            persona={persona}
            setPersona={setPersona}
            model={model}
            setModel={setModel}
            onSave={handleSaveConfig}
          />
        </div>
      )}

      {/* Show chat log only after config is saved */}
      {botConfig && (
        <div className="max-w-4xl mx-auto">
          <LogPanel logs={logs} />
        </div>
      )}
    </div>
  );
}

export default App;
