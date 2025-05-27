"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import {
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
} from "lucide-react";

// 导入组件
import Sidebar from "../../components/Sidebar";
import ModelSelector from "../../components/ModelSelector";
import MessageArea from "../../components/MessageArea";
import InputArea from "../../components/InputArea";
import { Model, Conversation } from "../../components/types";

const models: Model[] = [
  // 国内免费选项（推荐）
  {
    id: "siliconflow-qwen",
    name: "Qwen2.5-7B",
    description: "阿里通义千问，免费使用",
    category: "国内免费",
    icon: "🚀",
    status: "online",
  },
  {
    id: "siliconflow-llama",
    name: "Llama-3.1-8B",
    description: "Meta开源模型，免费使用",
    category: "国内免费",
    icon: "⚡",
    status: "online",
  },
  {
    id: "siliconflow-deepseek",
    name: "DeepSeek-V2.5",
    description: "深度求索模型，免费使用",
    category: "国内免费",
    icon: "🧠",
    status: "online",
  },
  {
    id: "zhipu-glm4",
    name: "GLM-4-Flash",
    description: "智谱AI，有免费额度",
    category: "国内免费",
    icon: "✨",
    status: "online",
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    description: "DeepSeek官方，有免费额度",
    category: "国内免费",
    icon: "🔮",
    status: "online",
  },

  // 国外选项（需要科学上网）
  {
    id: "gemini-flash",
    name: "Gemini Flash",
    description: "需要科学上网，完全免费",
    category: "国外免费",
    icon: "💎",
    status: "offline",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    description: "需要科学上网，完全免费",
    category: "国外免费",
    icon: "🌟",
    status: "offline",
  },
  {
    id: "openrouter-gemini",
    name: "Gemini 2.5 Pro",
    description: "需要科学上网，通过OpenRouter",
    category: "国外免费",
    icon: "🌐",
    status: "offline",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "需要科学上网和付费",
    category: "付费",
    icon: "💰",
    status: "offline",
  },
];

export default function DeepSeekChat() {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("siliconflow-qwen");
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "新的对话",
      messages: [],
      createdAt: new Date(),
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState("1");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    key: selectedModel,
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  // 跟踪当前对话的消息，避免循环依赖
  const currentConversationRef = useRef<string | null>(null);
  
  // 当切换对话时，更新消息
  useEffect(() => {
    if (activeConversationId !== currentConversationRef.current) {
      currentConversationRef.current = activeConversationId;
      setConversations((prev) => {
        const currentConv = prev.find((c) => c.id === activeConversationId);
        if (currentConv) {
          setMessages(currentConv.messages || []);
        }
        return prev; // 不修改状态，只是获取数据
      });
    }
  }, [activeConversationId, setMessages]);

  // 保存消息到当前对话（仅在消息由用户或AI添加时）
  useEffect(() => {
    if (messages.length > 0) {
      // 使用函数式更新，避免依赖conversations状态
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: messages,
                title:
                  conv.title === "新的对话" && messages.length > 0
                    ? messages[0].content.slice(0, 30) + "..."
                    : conv.title,
              }
            : conv
        );
        return updated;
      });
    }
  }, [messages, activeConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 点击外部关闭模型选择器
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showModelSelector) {
        const target = event.target as HTMLElement;
        if (!target.closest(".model-selector")) {
          setShowModelSelector(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModelSelector]);

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "新的对话",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    // 清空消息并重置跟踪
    currentConversationRef.current = newConv.id;
    setMessages([]);
  };

  const updateConversationTitle = (convId: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === convId ? { ...conv, title: newTitle } : conv
      )
    );
  };

  const deleteConversation = (convId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== convId));
    if (activeConversationId === convId && conversations.length > 1) {
      const remaining = conversations.filter((conv) => conv.id !== convId);
      setActiveConversationId(remaining[0].id);
    } else if (conversations.length === 1) {
      createNewConversation();
    }
  };

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelSelector(false);
  };

  return (
    <div
      className={`h-screen flex ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* 侧边栏 */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        isSidebarOpen={isSidebarOpen}
        isDark={isDark}
        onCreateNewConversation={createNewConversation}
        onSelectConversation={setActiveConversationId}
        onUpdateConversationTitle={updateConversationTitle}
        onDeleteConversation={deleteConversation}
      />

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <div
          className={`h-16 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border-b flex items-center justify-between px-6`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {isSidebarOpen ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <h1 className="text-xl font-semibold">DeepSeek Chat</h1>

              {/* 模型选择器 */}
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                showModelSelector={showModelSelector}
                isDark={isDark}
                onToggleSelector={() => setShowModelSelector(!showModelSelector)}
                onSelectModel={handleSelectModel}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className={`p-2 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <User size={20} />
            </Link>
            <Link
              href="/"
              className={`p-2 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Home size={20} />
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* 消息显示区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          <MessageArea
            messages={messages}
            isLoading={isLoading}
            isDark={isDark}
            copiedMessageId={copiedMessageId}
            messagesEndRef={messagesEndRef}
            onCopyMessage={copyMessage}
          />
        </div>

        {/* 输入区域 */}
        <InputArea
          input={input}
          isLoading={isLoading}
          isDark={isDark}
          selectedModel={selectedModel}
          models={models}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
