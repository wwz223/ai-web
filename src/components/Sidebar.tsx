import React from "react";
import { Plus, MessageSquare, Edit3, Trash2 } from "lucide-react";
import { Conversation } from "./types";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  isSidebarOpen: boolean;
  isDark: boolean;
  onCreateNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onUpdateConversationTitle: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  isSidebarOpen,
  isDark,
  onCreateNewConversation,
  onSelectConversation,
  onUpdateConversationTitle,
  onDeleteConversation,
}) => {
  const handleEditTitle = (conv: Conversation) => {
    const newTitle = prompt("重命名对话", conv.title);
    if (newTitle) {
      onUpdateConversationTitle(conv.id, newTitle);
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-80" : "w-0"
      } transition-all duration-300 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      } border-r flex flex-col overflow-hidden`}
    >
      {/* 侧边栏头部 */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onCreateNewConversation}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <Plus size={20} />
          <span className="font-medium">新建对话</span>
        </button>
      </div>

      {/* 对话列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              activeConversationId === conv.id
                ? isDark
                  ? "bg-gray-700"
                  : "bg-gray-200"
                : isDark
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <MessageSquare size={16} className="flex-shrink-0" />
            <span className="flex-1 truncate text-sm">{conv.title}</span>
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTitle(conv);
                }}
                className="p-1 rounded hover:bg-gray-600"
              >
                <Edit3 size={12} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
                className="p-1 rounded hover:bg-gray-600 text-red-400"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 