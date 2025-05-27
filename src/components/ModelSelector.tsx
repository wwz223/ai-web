import React from "react";
import { ChevronDown } from "lucide-react";
import { Model } from "./types";

interface ModelSelectorProps {
  models: Model[];
  selectedModel: string;
  showModelSelector: boolean;
  isDark: boolean;
  onToggleSelector: () => void;
  onSelectModel: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  showModelSelector,
  isDark,
  onToggleSelector,
  onSelectModel,
}) => {
  const currentModel = models.find((m) => m.id === selectedModel);
  
  // 按分类分组模型
  const groupedModels = models.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<string, Model[]>);

  return (
    <div className="relative ml-4 model-selector">
      <button
        onClick={onToggleSelector}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
          isDark
            ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300"
            : "border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <span>{currentModel?.icon}</span>
        <span>{currentModel?.name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            showModelSelector ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 模型选择下拉菜单 */}
      {showModelSelector && (
        <div
          className={`absolute top-full left-0 mt-2 w-80 ${
            isDark
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-gray-200"
          } border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto`}
        >
          {Object.entries(groupedModels).map(([category, categoryModels]) => (
            <div key={category} className="p-2">
              <div
                className={`text-xs font-semibold ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } px-2 py-1 mb-1`}
              >
                {category}
              </div>
              {categoryModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => onSelectModel(model.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedModel === model.id
                      ? isDark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDark
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{model.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{model.name}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          model.status === "online"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xs ${
                        selectedModel === model.id
                          ? "text-blue-100"
                          : isDark
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {model.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector; 