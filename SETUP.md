# 🚀 快速设置指南

## 第一步：获取免费API Key

### 🌟 Google Gemini (推荐，完全免费)

1. **访问**: https://ai.google.dev/
2. **科学上网**: 需要将IP切换到美国等支持地区
3. **登录**: 使用Google账号登录
4. **获取API Key**: 点击 "Get API key" → "Create API key in new project"
5. **复制**: 复制生成的API Key

### 🔄 OpenRouter (免费额度)

1. **访问**: https://openrouter.ai/
2. **注册**: 创建账号
3. **获取Key**: 在Dashboard中获取API Key
4. **免费额度**: 可以使用Gemini 2.5 Pro等模型

## 第二步：配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# 复制下面的内容到 .env.local 文件

# Google Gemini API Key (推荐，完全免费)
GOOGLE_GENERATIVE_AI_API_KEY=你的_google_api_key

# OpenRouter API Key (可选，有免费额度)
OPENROUTER_API_KEY=你的_openrouter_api_key

# OpenAI API Key (可选，需要付费)
OPENAI_API_KEY=你的_openai_api_key
```

## 第三步：启动应用

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 开始使用！

## 🎯 使用技巧

1. **模型选择**: 点击右上角设置按钮选择不同的AI模型
2. **免费使用**: 配置Google Gemini API Key即可完全免费使用
3. **流式响应**: 支持实时流式对话，体验更流畅

## 🔧 故障排除

### API Key无效
- 检查API Key是否正确复制
- 确认环境变量文件名为 `.env.local`
- 重启开发服务器

### 网络问题
- Google Gemini需要科学上网
- 确保网络连接稳定

### 405错误
- 确认API路由文件存在：`src/app/api/chat/route.ts`
- 检查是否正确导出POST函数

## 📚 更多免费选项

- **硅基流动**: https://siliconflow.cn/
- **智谱AI**: https://open.bigmodel.cn/
- **讯飞星火**: https://xinghuo.xfyun.cn/
- **百度文心**: https://cloud.baidu.com/
- **腾讯混元**: https://cloud.tencent.com/

---

**🎉 现在你可以免费使用AI对话工具了！** 