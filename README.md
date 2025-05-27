# AI 对话工具

一个支持多种免费大模型的现代化AI对话应用，基于Next.js构建。

## 🇨🇳 中国用户快速开始

**无需科学上网，直接可用！**

1. **推荐使用硅基流动**：访问 https://siliconflow.cn/ 注册获取免费API Key
2. **配置环境变量**：创建 `.env.local` 文件，添加 `SILICONFLOW_API_KEY=你的key`
3. **启动应用**：`pnpm install && pnpm dev`

👉 **详细指南**: [中国用户专用设置指南](./SETUP_CHINA.md)

---

## ✨ 特性

- 🇨🇳 **国内友好**: 支持硅基流动、智谱AI、DeepSeek等国内平台
- 🤖 **多模型支持**: 一键切换不同AI模型
- 💬 **实时流式对话**: 流畅的对话体验
- 🎨 **现代化UI**: 干净整洁的界面设计
- 📱 **响应式布局**: 支持手机和桌面端
- ⚡ **快速响应**: 优化的性能表现

## 🚀 支持的模型

### 🇨🇳 国内免费（推荐）
- **Qwen2.5-7B** - 阿里通义千问，完全免费
- **Llama-3.1-8B** - Meta开源模型，完全免费  
- **DeepSeek-V2.5** - 深度求索模型，完全免费
- **GLM-4-Flash** - 智谱AI，有免费额度
- **DeepSeek Chat** - DeepSeek官方，有免费额度

### 🌍 国外免费（需科学上网）
- **Google Gemini Flash/Pro** - 完全免费
- **Gemini 2.5 Pro** - 通过OpenRouter免费使用

### 💰 付费选项
- **GPT-3.5 Turbo** - 需要OpenAI API Key

## 📦 快速安装

```bash
# 克隆项目
git clone <your-repo-url>
cd my-ai-app

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🔧 配置指南

### 🇨🇳 中国用户（推荐）

创建 `.env.local` 文件：

```bash
# 硅基流动（推荐，完全免费）
SILICONFLOW_API_KEY=你的硅基流动API_Key

# 智谱AI（可选，有免费额度）
ZHIPU_API_KEY=你的智谱AI_Key

# DeepSeek（可选，有免费额度）
DEEPSEEK_API_KEY=你的DeepSeek_Key
```

**获取API Key**:
- **硅基流动**: https://siliconflow.cn/ （推荐）
- **智谱AI**: https://open.bigmodel.cn/
- **DeepSeek**: https://platform.deepseek.com/

### 🌍 国外用户

```bash
# Google Gemini（需科学上网）
GOOGLE_GENERATIVE_AI_API_KEY=你的Google_API_Key

# OpenRouter（可选）
OPENROUTER_API_KEY=你的OpenRouter_Key

# OpenAI（付费）
OPENAI_API_KEY=你的OpenAI_Key
```

## 🎯 使用方法

1. 启动应用后访问 http://localhost:3000
2. 点击右上角设置按钮选择AI模型
3. 输入问题开始对话
4. 支持实时流式响应

## 🛠️ 技术栈

- **框架**: Next.js 15
- **UI**: Tailwind CSS
- **AI SDK**: Vercel AI SDK
- **图标**: Lucide React
- **语言**: TypeScript

## 📝 API 路由

应用支持以下模型切换：

**国内模型**:
- `siliconflow-qwen` - Qwen2.5-7B (推荐)
- `siliconflow-llama` - Llama-3.1-8B
- `siliconflow-deepseek` - DeepSeek-V2.5
- `zhipu-glm4` - GLM-4-Flash
- `deepseek-chat` - DeepSeek Chat

**国外模型**:
- `gemini-flash` - Google Gemini 1.5 Flash
- `gemini-pro` - Google Gemini 1.5 Pro  
- `openrouter-gemini` - Gemini 2.5 Pro
- `gpt-3.5-turbo` - OpenAI GPT-3.5

## 🔒 隐私说明

- 所有对话数据仅在本地处理
- 不会存储用户对话内容
- API Key仅用于调用相应的AI服务

## 📚 详细文档

- [中国用户设置指南](./SETUP_CHINA.md) - 国内免费大模型配置
- [通用设置指南](./SETUP.md) - 包含国外平台配置

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

## 🎉 立即开始

### 中国用户
1. 访问 [硅基流动](https://siliconflow.cn/) 获取免费API Key
2. 配置环境变量
3. 启动应用，开始对话！

### 国外用户  
1. 访问 [Google AI Studio](https://ai.google.dev/) 获取Gemini API Key
2. 配置环境变量
3. 启动应用，开始对话！

**🚀 完全免费，立即体验AI对话的魅力！**
