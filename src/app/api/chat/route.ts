import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'siliconflow-qwen', apiKeys } = await req.json();

    console.log('Chat API - Received model:', model);
    console.log('Chat API - Messages count:', messages?.length);

    let selectedModel;
    
    // 获取API密钥，优先使用客户端传递的密钥，然后是环境变量
    const getSiliconFlowKey = () => apiKeys?.siliconflow || process.env.SILICONFLOW_API_KEY;
    const getOpenAIKey = () => apiKeys?.openai || process.env.OPENAI_API_KEY;
    const getDeepSeekKey = () => apiKeys?.deepseek || process.env.DEEPSEEK_API_KEY;
    
    // 根据选择的模型配置不同的AI提供商
    switch (model) {
      // 国内免费选项 - 硅基流动
      case 'siliconflow-qwen':
        const siliconflowKey = getSiliconFlowKey();
        if (!siliconflowKey) {
          throw new Error('SiliconFlow API密钥未配置，请在用户中心设置');
        }
        const siliconflowQwen = createOpenAI({
          apiKey: siliconflowKey,
          baseURL: 'https://api.siliconflow.cn/v1',
        });
        selectedModel = siliconflowQwen('Qwen/Qwen2.5-7B-Instruct');
        break;
      case 'siliconflow-llama':
        const siliconflowLlamaKey = getSiliconFlowKey();
        if (!siliconflowLlamaKey) {
          throw new Error('SiliconFlow API密钥未配置，请在用户中心设置');
        }
        const siliconflowLlama = createOpenAI({
          apiKey: siliconflowLlamaKey,
          baseURL: 'https://api.siliconflow.cn/v1',
        });
        selectedModel = siliconflowLlama('meta-llama/Meta-Llama-3.1-8B-Instruct');
        break;
      case 'siliconflow-deepseek':
        const siliconflowDeepseekKey = getSiliconFlowKey();
        if (!siliconflowDeepseekKey) {
          throw new Error('SiliconFlow API密钥未配置，请在用户中心设置');
        }
        const siliconflowDeepseek = createOpenAI({
          apiKey: siliconflowDeepseekKey,
          baseURL: 'https://api.siliconflow.cn/v1',
        });
        selectedModel = siliconflowDeepseek('deepseek-ai/DeepSeek-V2.5');
        break;
      
      // 智谱AI
      case 'zhipu-glm4':
        const zhipuAI = createOpenAI({
          apiKey: process.env.ZHIPU_API_KEY,
          baseURL: 'https://open.bigmodel.cn/api/paas/v4',
        });
        selectedModel = zhipuAI('glm-4-flash');
        break;
      
      // DeepSeek 官方
      case 'deepseek-chat':
        const deepseekKey = getDeepSeekKey();
        if (!deepseekKey) {
          throw new Error('DeepSeek API密钥未配置，请在用户中心设置');
        }
        const deepseek = createOpenAI({
          apiKey: deepseekKey,
          baseURL: 'https://api.deepseek.com/v1',
        });
        selectedModel = deepseek('deepseek-chat');
        break;
      
      // 国外选项（需要科学上网）
      case 'gemini-pro':
        const googlePro = createGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });
        selectedModel = googlePro('gemini-1.5-pro-latest');
        break;
      case 'gemini-flash':
        const googleFlash = createGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });
        selectedModel = googleFlash('gemini-1.5-flash-latest');
        break;
      case 'gpt-3.5-turbo':
        const openaiKey = getOpenAIKey();
        if (!openaiKey) {
          throw new Error('OpenAI API密钥未配置，请在用户中心设置');
        }
        const openaiProvider = createOpenAI({
          apiKey: openaiKey,
        });
        selectedModel = openaiProvider('gpt-3.5-turbo');
        break;
      case 'openrouter-gemini':
        const openrouter = createOpenAI({
          apiKey: process.env.OPENROUTER_API_KEY,
          baseURL: 'https://openrouter.ai/api/v1',
        });
        selectedModel = openrouter('google/gemini-2.5-pro-exp-03-25:free');
        break;
      
      default:
        // 默认使用硅基流动的Qwen模型
        const defaultSiliconflowKey = getSiliconFlowKey();
        if (!defaultSiliconflowKey) {
          throw new Error('SiliconFlow API密钥未配置，请在用户中心设置');
        }
        const defaultSiliconflow = createOpenAI({
          apiKey: defaultSiliconflowKey,
          baseURL: 'https://api.siliconflow.cn/v1',
        });
        selectedModel = defaultSiliconflow('Qwen/Qwen2.5-7B-Instruct');
    }

    const result = await streamText({
      model: selectedModel,
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : '服务器内部错误' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}