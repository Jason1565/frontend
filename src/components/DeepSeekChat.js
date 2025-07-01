import React, { useState } from 'react';
import '../compoentsCss/DeepSeekChat.css';

const DeepSeekChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "我是DeepSeek AI助手，请问有什么可以帮您？", sender: 'ai' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 添加用户消息
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentStreamingMessage(''); // 重置当前流式消息

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_DEEPSEEK_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { 
              role: 'system', 
              content: '你是一个乐于助人的AI助手，回答要简洁专业，使用中文回复。请以纯文本格式返回内容，不要使用markdown格式，只用句号逗号和分段，给我纯文本。' 
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: input }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          stream: true // 启用流式传输
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data:') && !line.includes('[DONE]')) {
            try {
              const data = JSON.parse(line.substring(5));
              const content = data.choices[0]?.delta?.content || '';
              fullResponse += content;
              setCurrentStreamingMessage(fullResponse);
            } catch (e) {
              console.error('解析JSON失败:', e);
            }
          }
        }
      }

      // 流结束后，将完整消息添加到消息列表
      setMessages(prev => [...prev, { text: fullResponse, sender: 'ai' }]);
      setCurrentStreamingMessage('');
    } catch (error) {
      console.error('API调用失败:', error);
      setMessages(prev => [...prev, { 
        text: '网络异常，请稍后再试', 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="deepseek-chat">
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <h3>DeepSeek AI 助手</h3>
            <button onClick={() => setIsOpen(false)} aria-label="关闭">×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && currentStreamingMessage && (
              <div className="message ai">
                {currentStreamingMessage}
                <span className="typing-cursor">|</span>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入问题..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              aria-label="输入消息"
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading}
              aria-label="发送消息"
            >
              {isLoading ? '发送中...' : '发送'}
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="打开AI助手"
        >
          <img 
            src="https://deepseek.com/favicon.ico" 
            alt="DeepSeek Logo" 
            width="50" 
            height="50"
          />
        </button>
      )}
    </div>
  );
};

export default DeepSeekChat;