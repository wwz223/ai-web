import React from "react";
import { Send } from "lucide-react";
import { Model } from "./types";

interface InputAreaProps {
  input: string;
  isLoading: boolean;
  isDark: boolean;
  selectedModel: string;
  models: Model[];
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  input,
  isLoading,
  isDark,
  selectedModel,
  models,
  onInputChange,
  onSubmit,
  onKeyPress,
}) => {
  const currentModel = models.find((m) => m.id === selectedModel);

  return (
    <div
      className={`border-t ${
        isDark
          ? "border-gray-700 bg-gray-800/50"
          : "border-gray-200 bg-gray-50/50"
      } p-6`}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
              placeholder="输入你的问题... (支持 Shift+Enter 换行)"
              className={`w-full px-6 py-4 rounded-2xl resize-none outline-none max-h-32 shadow-sm border transition-all ${
                isDark
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              }`}
              rows={1}
              style={{ minHeight: "56px" }}
              disabled={isLoading}
            />
            <div
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {input.length}/2000
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-6 py-4 rounded-2xl font-medium transition-all flex items-center gap-2 shadow-sm ${
              input.trim() && !isLoading
                ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                : isDark
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={18} />
            发送
          </button>
        </form>

        <div
          className={`text-xs ${
            isDark ? "text-gray-500" : "text-gray-400"
          } mt-4 text-center flex items-center justify-center gap-2`}
        >
          <span>当前模型: {currentModel?.name}</span>
          <span>•</span>
          <span>🇨🇳 支持国内免费大模型</span>
          <span>•</span>
          <span>智能对话体验</span>
        </div>
      </div>
    </div>
  );
};

export default InputArea; 