import React from "react";
import { MessageSquare } from "lucide-react";

interface EmptyStateProps {
  isDark: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDark }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto">
          <MessageSquare
            className={`w-10 h-10 ${
              isDark ? "text-violet-400" : "text-violet-600"
            }`}
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">欢迎使用 DeepSeek Chat</h2>
          <p
            className={`${
              isDark ? "text-gray-400" : "text-gray-500"
            } max-w-md mx-auto`}
          >
            选择一个模型开始对话，支持多种免费AI模型
          </p>
        </div>

        {/* 快捷提示卡片 */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {[
            { icon: "💡", title: "智能对话", desc: "日常问题解答" },
            { icon: "🔧", title: "代码生成", desc: "编程助手功能" },
            { icon: "📝", title: "文本创作", desc: "写作和创意" },
            { icon: "🧠", title: "知识问答", desc: "专业知识解答" },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl transition-all cursor-pointer ${
                isDark
                  ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div
                className={`text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {item.title}
              </div>
              <div
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyState; 