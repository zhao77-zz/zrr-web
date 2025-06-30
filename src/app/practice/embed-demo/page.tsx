"use client";
import React, { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

interface KnowledgeBase {
  kbId: string;
  kbName: string;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  kbId: string;
  createdAt: number;
  updatedAt: number;
}

export default function ChatDemo() {
  const [kbList, setKbList] = useState<KnowledgeBase[]>([]);
  const [selectedKbId, setSelectedKbId] = useState<string>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 生成对话标题
  const generateChatTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(msg => msg.role === "user");
    if (firstUserMessage) {
      return firstUserMessage.content.slice(0, 20) + (firstUserMessage.content.length > 20 ? "..." : "");
    }
    return "新对话";
  };

  // 保存对话历史到localStorage
  const saveChatHistory = (chatId: string, messages: Message[], kbId: string) => {
    const histories = JSON.parse(localStorage.getItem('qanything_chat_histories') || '[]') as ChatHistory[];
    const existingIndex = histories.findIndex(h => h.id === chatId);
    
    const chatData: ChatHistory = {
      id: chatId,
      title: generateChatTitle(messages),
      messages: messages,
      kbId: kbId,
      createdAt: existingIndex === -1 ? Date.now() : histories[existingIndex].createdAt,
      updatedAt: Date.now()
    };

    if (existingIndex === -1) {
      histories.unshift(chatData);
    } else {
      histories[existingIndex] = chatData;
    }

    // 只保留最近50条对话历史
    const trimmedHistories = histories.slice(0, 50);
    localStorage.setItem('qanything_chat_histories', JSON.stringify(trimmedHistories));
    setChatHistories(trimmedHistories);
  };

  // 加载对话历史
  const loadChatHistories = () => {
    const histories = JSON.parse(localStorage.getItem('qanything_chat_histories') || '[]') as ChatHistory[];
    setChatHistories(histories);
  };

  // 新建对话
  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCurrentChatId(newChatId);
    setMessages([]);
    setError("");
  };

  // 加载指定对话
  const loadChat = (chatId: string) => {
    const chat = chatHistories.find(h => h.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setSelectedKbId(chat.kbId);
      setError("");
    }
  };

  // 删除对话
  const deleteChat = (chatId: string) => {
    const updatedHistories = chatHistories.filter(h => h.id !== chatId);
    localStorage.setItem('qanything_chat_histories', JSON.stringify(updatedHistories));
    setChatHistories(updatedHistories);
    
    if (currentChatId === chatId) {
      createNewChat();
    }
  };

  // 获取知识库列表
  useEffect(() => {
    async function fetchKnowledgeBases() {
      try {
        const res = await fetch('/api/youdao-kb-list');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || '获取知识库失败');
        }
        const data = await res.json();
        setKbList(data);
        // 自动选择第一个知识库
        if (data.length > 0) {
          setSelectedKbId(data[0].kbId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取知识库失败');
      }
    }
    fetchKnowledgeBases();
    loadChatHistories();
    createNewChat();
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 保存当前对话到历史记录
  useEffect(() => {
    if (currentChatId && messages.length > 0 && selectedKbId) {
      saveChatHistory(currentChatId, messages, selectedKbId);
    }
  }, [messages, currentChatId, selectedKbId]);

  // 发送消息
  async function handleSend() {
    if (!input.trim() || !selectedKbId || loading) return;
    
    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setError("");
    
    // 添加用户消息
    const newUserMessage: Message = { 
      role: "user", 
      content: userMessage, 
      timestamp: Date.now() 
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    try {
      const res = await fetch('/api/youdao-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage,
          kbIds: [selectedKbId],
          history: messages.slice(-10).reduce((acc, msg, i, arr) => {
            if (msg.role === "user") {
              const nextMsg = arr[i + 1];
              if (nextMsg && nextMsg.role === "assistant" && nextMsg.content.trim()) {
                acc.push({
                  question: msg.content.trim(),
                  response: nextMsg.content.trim()
                });
              }
            }
            return acc;
          }, [] as { question: string; response: string }[]),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '对话失败');
      }

      // 处理流式响应
      const reader = res.body?.getReader();
      if (!reader) throw new Error('无法读取响应');

      let assistantContent = "";
      const decoder = new TextDecoder();
      
      // 添加空的助手消息
      const newAssistantMessage: Message = { 
        role: "assistant", 
        content: "", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, newAssistantMessage]);

      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // 处理 Server-Sent Events 格式
        const lines = buffer.split('\n');
        buffer = lines.pop() || ""; // 保留最后一行（可能不完整）
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonStr = line.substring(5).trim(); // 移除 "data:" 前缀
              if (jsonStr) {
                const data = JSON.parse(jsonStr);
                if (data.result && data.result.response) {
                  assistantContent += data.result.response;
                  
                  // 更新助手消息内容
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.length - 1;
                    if (newMessages[lastIndex]?.role === "assistant") {
                      newMessages[lastIndex] = { 
                        role: "assistant", 
                        content: assistantContent,
                        timestamp: Date.now()
                      };
                    }
                    return newMessages;
                  });
                }
              }
            } catch {
              // 忽略解析错误，继续处理下一行
              console.warn('解析 SSE 数据失败:', line);
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '对话失败');
      // 移除可能添加的空助手消息
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.content === "") {
          newMessages.pop();
        }
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex">
      {/* 左侧边栏 */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-purple-200 shadow-lg flex flex-col">
        {/* 头部 */}
        <div className="p-6 border-b border-purple-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            知识库对话
          </h1>
          <p className="text-purple-600/70 text-sm mt-1">基于有道 QAnything 的智能问答</p>
        </div>

        {/* 新建对话按钮 */}
        <div className="p-4 border-b border-purple-100">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新建对话
          </button>
        </div>

        {/* 对话历史 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-purple-700">对话历史</h3>
              <span className="text-xs text-purple-500">{chatHistories.length}/50</span>
            </div>
            
            {chatHistories.length === 0 ? (
              <div className="text-center py-8 text-purple-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">暂无对话历史</p>
              </div>
            ) : (
              <div className="space-y-2">
                {chatHistories.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                      currentChatId === chat.id
                        ? 'bg-purple-100 border border-purple-200'
                        : 'hover:bg-purple-50 border border-transparent'
                    }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-purple-800 truncate">
                          {chat.title}
                        </h4>
                        <p className="text-xs text-purple-500 mt-1">
                          {new Date(chat.updatedAt).toLocaleDateString()} • {chat.messages.length}条消息
                        </p>
                        <p className="text-xs text-purple-400 mt-1">
                          {kbList.find(kb => kb.kbId === chat.kbId)?.kbName || '未知知识库'}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-purple-400 hover:text-red-500 transition-all"
                        title="删除对话"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 知识库选择 */}
        <div className="p-4 border-t border-purple-100">
          <label className="block text-sm font-medium text-purple-700 mb-3">
            选择知识库
          </label>
          <select
            value={selectedKbId}
            onChange={(e) => setSelectedKbId(e.target.value)}
            className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
            disabled={loading}
          >
            {kbList.length === 0 ? (
              <option value="">加载中...</option>
            ) : (
              kbList.map(kb => (
                <option key={kb.kbId} value={kb.kbId}>
                  {kb.kbName}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 错误提示 */}
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-purple-700 mb-2">开始对话</h2>
              <p className="text-purple-600/70 max-w-md">
                {selectedKbId ? "请输入问题，我会基于知识库为您提供准确的答案" : "请先选择一个知识库"}
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[70%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* 头像 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-purple-500 to-purple-700' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      {message.role === 'user' ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    
                    {/* 消息内容 */}
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                        : 'bg-white border border-purple-100 text-gray-800 shadow-sm'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      {message.timestamp && (
                        <div className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-purple-100' : 'text-gray-400'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[70%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-white border border-purple-100 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-purple-600 text-sm">正在思考...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="border-t border-purple-200 bg-white/80 backdrop-blur-sm p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={selectedKbId ? "输入你的问题... (Shift+Enter 换行)" : "请先选择知识库"}
                    className="w-full px-4 py-3 pr-12 bg-white border border-purple-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-purple-400 text-gray-800"
                    disabled={!selectedKbId || loading}
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-purple-400">
                    {input.length}/1000
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || !selectedKbId || loading}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}