import { useState } from "react";
import {
  Plus,
  Settings,
  GripVertical,
  Edit2,
  ChevronRight,
  LogOut,
  Mail,
} from "lucide-react";
import NavigationBar from "../../components/NavigationBar";

export default function UserProfilePage() {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Just being myself",
      avatar: "placeholder",
      bio: "Regular, casual chatting",
      activeChatCount: 12,
    },
    {
      id: 2,
      name: "Fantasy Scholar",
      avatar: "placeholder",
      bio: "A curious scholar interested in magical theories and ancient lore",
      activeChatCount: 5,
    },
    {
      id: 3,
      name: "Space Captain",
      avatar: "placeholder",
      bio: "Intergalactic explorer seeking new adventures",
      activeChatCount: 3,
    },
  ]);

  const account = {
    name: "Sarah Connor",
    email: "sarah.connor@email.com",
    avatar: "placeholder",
    joinDate: "Member since March 2024",
  };

  const moveProfile = (from, to) => {
    const newProfiles = [...profiles];
    const [movedProfile] = newProfiles.splice(from, 1);
    newProfiles.splice(to, 0, movedProfile);
    setProfiles(newProfiles);
  };

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex === index) return;

    moveProfile(draggedIndex, index);
    setDraggedIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Profile</span>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{account.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Mail size={16} className="text-gray-500" />
                <span className="text-gray-600 text-sm">{account.email}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{account.joinDate}</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Edit Account
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">My Personas</h3>
          <span className="text-sm text-gray-500">
            First on the list is default
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {profiles.map((profile, index) => (
              <div
                key={profile.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={() => setDraggedIndex(null)}
                className={`flex items-center p-4 hover:bg-gray-50 ${
                  draggedIndex === index ? "opacity-50" : ""
                } ${index === 0 ? "bg-gray-50" : ""}`}
              >
                <div className="cursor-move p-2 hover:bg-gray-100 rounded">
                  <GripVertical size={20} className="text-gray-400" />
                </div>

                <div className="flex flex-1 items-center space-x-3 ml-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium truncate">{profile.name}</h3>
                      {index === 0 && (
                        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {profile.bio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-gray-500">
                    {profile.activeChatCount} chats
                  </span>
                  <button className="p-2 hover:bg-gray-200 rounded-full">
                    <Edit2 size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full mt-4 py-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center space-x-2 hover:bg-gray-50">
          <Plus size={20} className="text-gray-600" />
          <span className="font-medium text-gray-600">Create New Persona</span>
        </button>

        <div className="mt-6 space-y-2">
          <button className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50">
            <span className="font-medium text-gray-700">Account Settings</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50">
            <span className="font-medium text-red-600">Sign Out</span>
            <LogOut size={20} className="text-red-600" />
          </button>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
}
