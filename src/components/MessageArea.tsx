import React from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import EmptyState from "./EmptyState";

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

interface MessageAreaProps {
  messages: Message[];
  isLoading: boolean;
  isDark: boolean;
  copiedMessageId: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onCopyMessage: (content: string, messageId: string) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  isLoading,
  isDark,
  copiedMessageId,
  messagesEndRef,
  onCopyMessage,
}) => {
  if (messages.length === 0) {
    return <EmptyState isDark={isDark} />;
  }

  const filteredMessages = messages.filter(message => 
    message.role === "user" || message.role === "assistant"
  );

  return (
    <div className="space-y-6">
      {filteredMessages.map((message) => (
        <div key={message.id} className="group">
          <div
            className={`flex gap-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot size={16} className="text-white" />
              </div>
            )}

            <div
              className={`max-w-3xl ${
                message.role === "user" ? "order-1" : ""
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === "user"
                    ? isDark
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                {message.role === "user" ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <MarkdownRenderer content={message.content} isDark={isDark} />
                )}
              </div>

              <div
                className={`flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  刚刚
                </span>
                {message.role === "assistant" && (
                  <button
                    onClick={() => onCopyMessage(message.content, message.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                  >
                    {copiedMessageId === message.id ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <Copy
                        size={12}
                        className={
                          isDark ? "text-gray-400" : "text-gray-600"
                        }
                      />
                    )}
                  </button>
                )}
              </div>
            </div>

            {message.role === "user" && (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 加载指示器 */}
      {isLoading && (
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Bot size={16} className="text-white" />
          </div>
          <div
            className={`rounded-2xl px-4 py-3 shadow-sm ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDark ? "bg-violet-400" : "bg-violet-400"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDark ? "bg-violet-400" : "bg-violet-400"
                  }`}
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDark ? "bg-violet-400" : "bg-violet-400"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                AI正在思考...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 滚动目标 */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageArea; 