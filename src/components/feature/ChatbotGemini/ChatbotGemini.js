import React, { useState } from "react";
import "./ChatbotGemini.css";

const ChatbotGemini = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "Bạn là trợ lý ảo thân thiện, trả lời ngắn gọn, dễ hiểu." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL || "gemini-2.5-flash";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const body = {
        contents: [
          {
            parts: [
              { text: newMessages.map(m => `${m.role}: ${m.content}`).join("\n") }
            ],
          },
        ],
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi";

      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Lỗi API: " + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <h2>💬 Chatbot AI</h2>
      <div className="chatbox">
        {messages
          .filter(m => m.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.role === "user" ? "user" : "assistant"}`}
            >
              <span>{msg.content}</span>
            </div>
          ))}
        {loading && <div className="message assistant">Đang phản hồi...</div>}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={loading}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatbotGemini;
