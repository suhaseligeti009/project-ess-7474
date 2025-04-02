"use client";
import React from "react";
import BottomNav from "../../components/bottom-nav";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();
  const { data: user } = useUser();
  const conversations = [
    {
      id: 1,
      user: {
        name: "Sarah Wilson",
        avatar: "/images/avatar1.jpg",
        lastActive: "Active now",
      },
      lastMessage: "See you tomorrow!",
      unread: 2,
      messages: [
        { id: 1, text: "Hey, how are you?", sender: "them", time: "10:30 AM" },
        { id: 2, text: "I'm good, thanks!", sender: "me", time: "10:31 AM" },
        { id: 3, text: "See you tomorrow!", sender: "them", time: "10:32 AM" },
      ],
    },
    {
      id: 2,
      user: {
        name: "Mike Johnson",
        avatar: "/images/avatar2.jpg",
        lastActive: "1h ago",
      },
      lastMessage: "Sounds great!",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Want to grab coffee?",
          sender: "them",
          time: "9:30 AM",
        },
        { id: 2, text: "Sure, when?", sender: "me", time: "9:35 AM" },
        { id: 3, text: "Sounds great!", sender: "them", time: "9:36 AM" },
      ],
    },
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file) return;

    let mediaUrl = "";
    if (file) {
      try {
        const { url, error: uploadError } = await upload({ file });
        if (uploadError) throw uploadError;
        mediaUrl = url;
      } catch (err) {
        setError("Failed to upload media");
        return;
      }
    }

    setMessage("");
    setFile(null);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="border-b border-gray-200 bg-white p-2">
        <h2 className="mb-2 text-xs font-medium text-gray-500">Active</h2>
        <div className="flex space-x-3 overflow-x-auto pb-1">
          {conversations.map((contact) => (
            <div key={contact.id} className="flex-shrink-0">
              <div className="relative">
                <img
                  src={contact.user.avatar}
                  alt={contact.user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white ${
                    contact.user.lastActive === "Active now"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-full">
        <div className="w-full border-r border-gray-200 bg-white md:w-[380px]">
          <div className="border-b border-gray-200 p-4">
            <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
          </div>
          <div className="overflow-y-auto">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? "bg-blue-50" : ""
                }`}
              >
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {chat.user.name}
                    </h3>
                    {chat.unread > 0 && (
                      <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-400">
                    {chat.user.lastActive}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-1 flex-col md:flex">
          {selectedChat ? (
            <>
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedChat.user.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedChat.user.lastActive}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {selectedChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.sender === "me"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="mt-1 text-xs opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="border-t border-gray-200 p-4"
              >
                {error && (
                  <div className="mb-2 text-sm text-red-500">{error}</div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      if (e.target.files) setFile(e.target.files[0]);
                    }}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-image text-xl"></i>
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={uploading || (!message.trim() && !file)}
                    className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
                {file && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-500">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </div>

        {!selectedChat && (
          <div className="flex flex-1 items-center justify-center md:hidden">
            <p className="text-gray-500">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
      <BottomNav activeTab="chats" />
    </div>
  );
}

export default MainComponent;