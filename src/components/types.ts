export interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  status: "online" | "offline";
}

export interface Conversation {
  id: string;
  title: string;
  messages: any[];
  createdAt: Date;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
} 