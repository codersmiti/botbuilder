import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

// ChatInterface renders the chat display and input area
function ChatInterface({ botConfig, onSendMessage, messages }) {
  const [input, setInput] = useState("");
  const chatRef = useRef(null); // Used to auto-scroll to bottom on new messages

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput(""); // Clear input field
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-white/80 backdrop-blur-md border border-indigo-200 shadow-xl rounded-2xl p-6 transition-transform hover:scale-[1.01]">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        Chat with {botConfig.botName || "your bot"}
      </h2>

      {/* Chat message area with scrolling */}
      <div
        ref={chatRef}
        className="h-72 overflow-y-auto space-y-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-indigo-100 rounded-lg"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Message bubble with animated tail and styling */}
            <div
              className={`relative px-4 py-2 rounded-xl text-sm shadow-md max-w-[75%] whitespace-pre-wrap transition-all duration-300 ease-in-out transform scale-95 ${
                msg.sender === "user"
                  ? "bg-indigo-100 text-gray-800 rounded-br-none"
                  : "bg-indigo-50 text-gray-700 rounded-bl-none"
              }`}
            >
              {msg.text}
              {/* Chat bubble triangle tail */}
              <div
                className={`absolute bottom-0 w-0 h-0 border-t-8 border-transparent ${
                  msg.sender === "user"
                    ? "right-0 border-l-8 border-l-indigo-100"
                    : "left-0 border-r-8 border-r-indigo-50"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Chat input bar */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-full flex items-center gap-1"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;

