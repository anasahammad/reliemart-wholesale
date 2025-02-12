import React, { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

const AdminMessages = () => {
  const [messages, setMessages] = useState([
    // Example messages data
    {
      id: 1,
      sender: "User123",
      content: "Hi, I’d like to know if the Honda Civic is available for this weekend.",
      timestamp: "2024-12-05 10:30 AM",
      status: "unread",
    },
    {
      id: 2,
      sender: "User456",
      content: "I have rented the Yamaha YZF-R1. Could you confirm the pickup time?",
      timestamp: "2024-12-06 2:15 PM",
      status: "read",
    },
    {
      id: 3,
      sender: "User789",
      content: "Is the Suzuki Swift available for rent next month?",
      timestamp: "2024-12-07 9:00 AM",
      status: "unread",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [activeMessage, setActiveMessage] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toLocaleString(),
          status: "sent",
        },
      ]);
      setNewMessage("");
    }
  };

  const handleSelectMessage = (messageId) => {
    setActiveMessage(messageId);
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: "read" } : msg
      )
    );
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-[#EC4899] mb-6">Messages</h2>

      {/* Messages List */}
      <div className="max-h-[400px] overflow-y-auto mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 mb-4 border-b cursor-pointer ${
              message.status === "unread"
                ? "bg-gray-100 font-semibold"
                : "bg-white"
            }`}
            onClick={() => handleSelectMessage(message.id)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{message.sender}</span>
              <span className="text-xs text-gray-500">{message.timestamp}</span>
            </div>
            <p className="text-sm mt-1">{message.content}</p>
          </div>
        ))}
      </div>

      {/* Active Message (Chat Window) */}
      {activeMessage && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-[#EC4899] mb-4">Chat</div>
          <div className="h-[200px] overflow-y-auto border-b mb-4">
            {messages
              .filter((msg) => msg.id === activeMessage || msg.sender === "You")
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 mb-2 ${
                    msg.sender === "You" ? "bg-[#EC4899] text-white ml-auto" : "bg-gray-200"
                  } rounded-lg max-w-[80%]`}
                >
                  <div className="text-xs">{msg.sender}</div>
                  <div className="text-sm">{msg.content}</div>
                  <div className="text-xs text-gray-500">{msg.timestamp}</div>
                </div>
              ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t pt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC4899]"
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 p-2 bg-[#EC4899] text-white rounded-md hover:bg-[#D1348B]"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;