import { Search, Settings } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import AddCustomCharacterButton from "@/components/AddCustomCharacterButton";

export default function MyChatPage() {
  const chats = [
    {
      id: 1,
      character: {
        name: "Luna",
        image: "placeholder",
        creator: "AI Labs",
      },
      lastMessage: {
        text: "I'd love to help you write that poem. What theme did you have in mind?",
        timestamp: "2:34 PM",
        unread: true,
      },
    },
    {
      id: 2,
      character: {
        name: "Professor Max",
        image: "placeholder",
        creator: "EduTech Inc",
      },
      lastMessage: {
        text: "The solution to this differential equation involves...",
        timestamp: "11:20 AM",
        unread: false,
      },
    },
    {
      id: 3,
      character: {
        name: "Chef Maria",
        image: "placeholder",
        creator: "FoodAI Co",
      },
      lastMessage: {
        text: "Here's a great recipe for homemade pasta! First, you'll need...",
        timestamp: "Yesterday",
        unread: false,
      },
    },
    {
      id: 4,
      character: {
        name: "Tech Guru",
        image: "placeholder",
        creator: "DevAI Solutions",
        online: false,
      },
      lastMessage: {
        text: "Let me explain how async/await works in JavaScript...",
        timestamp: "Yesterday",
        unread: false,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">My Chats</span>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-2xl mx-auto">
        <div className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start space-x-4 p-4 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {/* Character Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
              </div>

              {/* Chat Preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-semibold text-gray-900">
                      {chat.character.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      by {chat.character.creator}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {chat.lastMessage.timestamp}
                  </span>
                </div>

                <p
                  className={`mt-1 text-sm ${
                    chat.lastMessage.unread
                      ? "text-gray-900 font-medium"
                      : "text-gray-600"
                  } truncate`}
                >
                  {chat.lastMessage.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-32 left-0 right-0 z-10">
          <div className="max-w-2xl mx-auto relative">
            <AddCustomCharacterButton />
          </div>
        </div>

        <NavigationBar />
      </div>
    </div>
  );
}
