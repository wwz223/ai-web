interface ApiKeyConfig {
  siliconflow?: string;
  openai?: string;
  deepseek?: string;
}

export const getApiKeys = (): ApiKeyConfig => {
  if (typeof window === "undefined") {
    return {};
  }
  
  try {
    const savedKeys = localStorage.getItem("ai-app-api-keys");
    return savedKeys ? JSON.parse(savedKeys) : {};
  } catch (error) {
    console.error("Failed to load API keys:", error);
    return {};
  }
};

export const getApiKey = (provider: keyof ApiKeyConfig): string | undefined => {
  const keys = getApiKeys();
  return keys[provider];
};

export const getSiliconFlowApiKey = (): string | undefined => {
  return getApiKey('siliconflow');
};

export const saveApiKeys = (keys: ApiKeyConfig): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  
  try {
    localStorage.setItem("ai-app-api-keys", JSON.stringify(keys));
    return true;
  } catch (error) {
    console.error("Failed to save API keys:", error);
    return false;
  }
};

export const hasValidApiKey = (provider: keyof ApiKeyConfig): boolean => {
  const key = getApiKey(provider);
  return !!(key && key.trim().length > 0);
};

export const isApiConfigured = (): boolean => {
  return hasValidApiKey('siliconflow') || 
         hasValidApiKey('openai') || 
         hasValidApiKey('deepseek');
}; 