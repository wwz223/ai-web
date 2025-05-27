"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Key,
  Settings,
  Save,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  Trash2,
} from "lucide-react";

interface ApiKeyConfig {
  siliconflow?: string;
  openai?: string;
  deepseek?: string;
}

export default function ProfilePage() {
  const [isDark, setIsDark] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 从localStorage加载配置
  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem("ai-app-api-keys");
      const savedTheme = localStorage.getItem("ai-app-theme");
      
      if (savedKeys) {
        setApiKeys(JSON.parse(savedKeys));
      }
      
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }, []);

  // 保存设置到localStorage
  const saveSettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("ai-app-api-keys", JSON.stringify(apiKeys));
      localStorage.setItem("ai-app-theme", isDark ? "dark" : "light");
      
      setSavedStatus("success");
      setTimeout(() => setSavedStatus(null), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSavedStatus("error");
      setTimeout(() => setSavedStatus(null), 3000);
    }
    setIsLoading(false);
  };

  // 更新API密钥
  const updateApiKey = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  // 切换密钥显示/隐藏
  const toggleKeyVisibility = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  // 删除API密钥
  const deleteApiKey = (provider: string) => {
    setApiKeys(prev => {
      const newKeys = { ...prev };
      delete newKeys[provider as keyof ApiKeyConfig];
      return newKeys;
    });
  };

  // 格式化显示API密钥
  const formatApiKey = (key: string, isVisible: boolean) => {
    if (!key) return "";
    if (isVisible) return key;
    return key.length > 8 ? `${key.slice(0, 4)}${"*".repeat(key.length - 8)}${key.slice(-4)}` : "*".repeat(key.length);
  };

  const apiProviders = [
    {
      id: "siliconflow",
      name: "SiliconFlow",
      description: "国内免费AI模型平台，支持Qwen、DeepSeek等模型",
      icon: "🚀",
      color: "blue",
      required: true,
    },
    {
      id: "openai",
      name: "OpenAI",
      description: "GPT系列模型官方API",
      icon: "🤖",
      color: "green",
      required: false,
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      description: "DeepSeek官方API，高性能编程助手",
      icon: "🧠",
      color: "purple",
      required: false,
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* 顶部导航 */}
      <header className={`sticky top-0 z-50 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b backdrop-blur-xl bg-opacity-95`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDark ? "bg-blue-600" : "bg-blue-500"}`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold">用户中心</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* API密钥设置 */}
        <section className={`rounded-2xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} overflow-hidden`}>
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Key className={isDark ? "text-blue-400" : "text-blue-500"} size={24} />
              <h2 className="text-lg font-semibold">API密钥管理</h2>
            </div>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              配置您的AI服务API密钥，确保应用正常使用各种AI模型
            </p>
          </div>

          <div className="p-6 space-y-6">
            {apiProviders.map((provider) => {
              const currentKey = apiKeys[provider.id as keyof ApiKeyConfig] || "";
              const isVisible = showKeys[provider.id] || false;
              
              return (
                <div key={provider.id} className={`p-4 rounded-xl border ${isDark ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {provider.name}
                          {provider.required && (
                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                              必需
                            </span>
                          )}
                        </h3>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {provider.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type={isVisible ? "text" : "password"}
                          value={currentKey}
                          onChange={(e) => updateApiKey(provider.id, e.target.value)}
                          placeholder={`输入您的 ${provider.name} API Key`}
                          className={`w-full px-4 py-3 rounded-lg border transition-all ${
                            isDark
                              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          } outline-none pr-20`}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                          {currentKey && (
                            <button
                              onClick={() => toggleKeyVisibility(provider.id)}
                              className={`p-1.5 rounded transition-colors ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                            >
                              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          )}
                          {currentKey && (
                            <button
                              onClick={() => deleteApiKey(provider.id)}
                              className={`p-1.5 rounded transition-colors ${isDark ? "hover:bg-gray-600 text-red-400" : "hover:bg-gray-200 text-red-500"}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {currentKey && (
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} font-mono`}>
                        当前密钥: {formatApiKey(currentKey, isVisible)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 其他设置 */}
        <section className={`rounded-2xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} overflow-hidden`}>
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Settings className={isDark ? "text-blue-400" : "text-blue-500"} size={24} />
              <h2 className="text-lg font-semibold">应用设置</h2>
            </div>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              个性化您的应用体验
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">深色模式</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  切换应用的外观主题
                </p>
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                    isDark ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* 保存按钮 */}
        <div className="flex justify-center">
          <button
            onClick={saveSettings}
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isLoading
                ? isDark
                  ? "bg-gray-700 text-gray-400"
                  : "bg-gray-200 text-gray-400"
                : isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } shadow-lg hover:shadow-xl`}
          >
            <Save size={20} />
            {isLoading ? "保存中..." : "保存设置"}
          </button>
        </div>

        {/* 保存状态提示 */}
        {savedStatus && (
          <div className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            savedStatus === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}>
            {savedStatus === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {savedStatus === "success" ? "设置已保存" : "保存失败"}
          </div>
        )}
      </main>
    </div>
  );
} 