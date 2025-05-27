"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Bot,
  User,
  Sparkles,
  ChevronDown,
  Check,
  Zap,
  MessageCircle,
} from "lucide-react";

const models = [
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

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState("siliconflow-qwen");
  const [showModelSelector, setShowModelSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: {
        model: selectedModel,
      },
    });

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const currentModel = models.find((m) => m.id === selectedModel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 左侧Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI智能助手
                </h1>
                <p className="text-sm text-gray-500">新一代对话体验</p>
              </div>
            </div>

            {/* 右侧操作区 */}
            <div className="flex items-center gap-3">
              {/* 模型选择器 */}
              <div className="relative">
                <button
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-lg">{currentModel?.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {currentModel?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentModel?.status === "online"
                        ? "🟢 在线"
                        : "🔴 离线"}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      showModelSelector ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 模型下拉菜单 */}
                {showModelSelector && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        选择AI模型
                      </h3>
                      <p className="text-xs text-gray-500">
                        选择最适合你需求的AI模型
                      </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {["国内免费", "国外免费", "付费"].map((category) => {
                        const categoryModels = models.filter(
                          (m) => m.category === category
                        );
                        if (categoryModels.length === 0) return null;

                        return (
                          <div key={category} className="p-3">
                            <div className="flex items-center gap-2 mb-3">
                              {category === "国内免费" && (
                                <span className="text-green-600">🇨🇳</span>
                              )}
                              {category === "国外免费" && (
                                <span className="text-blue-600">🌍</span>
                              )}
                              {category === "付费" && (
                                <span className="text-orange-600">💰</span>
                              )}
                              <span className="text-xs font-medium text-gray-700">
                                {category}
                              </span>
                              {category === "国内免费" && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  推荐
                                </span>
                              )}
                            </div>

                            <div className="space-y-1">
                              {categoryModels.map((model) => (
                                <button
                                  key={model.id}
                                  onClick={() => {
                                    setSelectedModel(model.id);
                                    setShowModelSelector(false);
                                  }}
                                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                                    selectedModel === model.id
                                      ? "bg-violet-50 border-2 border-violet-200"
                                      : "hover:bg-gray-50 border-2 border-transparent"
                                  }`}
                                >
                                  <span className="text-lg">{model.icon}</span>
                                  <div className="flex-1 text-left">
                                    <div className="font-medium text-gray-900 text-sm">
                                      {model.name}
                                    </div>
                                    <div className="text-xs text-gray-500 line-clamp-1">
                                      {model.description}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        model.status === "online"
                                          ? "bg-green-500"
                                          : "bg-gray-300"
                                      }`}
                                    ></div>
                                    {selectedModel === model.id && (
                                      <Check className="w-4 h-4 text-violet-600" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* DeepSeek页面链接 */}
              <Link
                href="/deepseek"
                className="p-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Bot className="w-5 h-5" />
              </Link>

              {/* 设计页面链接 */}
              <Link
                href="/design"
                className="p-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-4xl mx-auto p-4">
        {/* 聊天容器 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          {/* 聊天头部 */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">AI助手</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>使用 {currentModel?.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {messages.length} 条对话
                </span>
              </div>
            </div>
          </div>

          {/* 消息区域 */}
          <div className="h-[520px] overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-violet-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    开始你的AI对话
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    向我提问任何问题，我会尽力为你提供准确、有用的回答
                  </p>
                </div>

                {/* 快捷提示 */}
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  {[
                    { icon: "💡", title: "创意写作", desc: "帮你写故事、文案" },
                    { icon: "🔍", title: "知识问答", desc: "回答各种问题" },
                    { icon: "💻", title: "编程助手", desc: "代码解释和调试" },
                    { icon: "🌐", title: "语言翻译", desc: "多语言互译" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const prompts = [
                          "请帮我写一个创意故事",
                          "请解释一下人工智能的工作原理",
                          "请帮我优化这段代码",
                          "请将这段文字翻译成英文",
                        ];
                        handleInputChange({
                          target: { value: prompts[index] },
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                      className="p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* 头像 */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-violet-600 to-purple-600"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* 消息内容 */}
                  <div
                    className={`flex-1 max-w-[85%] ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-2xl shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          : "bg-white border border-gray-100"
                      }`}
                    >
                      <div
                        className={`text-sm leading-relaxed ${
                          message.role === "user"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>

                    {/* 时间戳 */}
                    <div
                      className={`text-xs text-gray-400 mt-2 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {index === messages.length - 1 ? "刚刚" : "几分钟前"}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* 加载指示器 */}
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">AI正在思考...</span>
                  </div>
                </div>
              </div>
            )}

            {/* 滚动目标 */}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="输入你的问题... (支持 Shift+Enter 换行)"
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm text-gray-900 placeholder-gray-500"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {input.length}/2000
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`px-6 py-4 rounded-2xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                  input.trim() && !isLoading
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
                发送
              </button>
            </form>

            {/* 底部提示 */}
            <div className="flex items-center justify-center mt-4 text-xs text-gray-400">
              <span>🇨🇳 支持国内免费大模型 • 无需科学上网 • 智能对话</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
