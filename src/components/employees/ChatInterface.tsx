'use client';

import { useState, useRef, useEffect } from 'react';
import type { Employee, ChatMessage } from '@/types';

const colorMap: Record<string, { bg: string; bubble: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', bubble: 'bg-blue-600', icon: 'bg-blue-100' },
  green: { bg: 'bg-green-50', bubble: 'bg-green-600', icon: 'bg-green-100' },
  purple: { bg: 'bg-purple-50', bubble: 'bg-purple-600', icon: 'bg-purple-100' },
  orange: { bg: 'bg-orange-50', bubble: 'bg-orange-600', icon: 'bg-orange-100' },
};

const QUICK_PROMPTS: Record<string, string[]> = {
  'customer-support': ['기증 절차를 알려주세요', '어떤 품목을 기증할 수 있나요?', '영수증은 언제 받나요?'],
  'donation-manager': ['현재 대기 중인 기증 신청 현황을 알려주세요', '픽업 일정을 잡고 싶어요', '기증 영수증 내용을 작성해주세요'],
  'data-analyst': ['이번 달 기증 현황을 분석해주세요', '주요 기증 기업을 요약해주세요', '월별 트렌드 리포트를 작성해주세요'],
  'marketing': ['기업 기증 유치 이메일을 작성해주세요', '인스타그램 홍보 문안을 만들어주세요', '기업 제안서 초안을 작성해주세요'],
};

export default function ChatInterface({ employee }: { employee: Employee }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const c = colorMap[employee.color];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: employee.id, messages: [...messages, userMsg] }),
      });

      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: assistantText };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '죄송합니다, 일시적인 오류가 발생했습니다. 다시 시도해주세요.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = QUICK_PROMPTS[employee.id] ?? [];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className={`${c.bg} border border-gray-200 rounded-2xl p-4 mb-4 flex items-center gap-3`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${c.icon}`}>
          {employee.emoji}
        </div>
        <div>
          <div className="font-bold text-gray-900 text-lg">{employee.name}</div>
          <div className="text-sm text-gray-500">{employee.title} · 온라인</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">{employee.emoji}</div>
            <div className="text-gray-600 font-medium mb-1">안녕하세요! 저는 {employee.name}입니다.</div>
            <div className="text-sm text-gray-400 mb-6">{employee.description}</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-sm bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base mr-2 flex-shrink-0 mt-0.5 ${c.icon}`}>
                {employee.emoji}
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gray-900 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
              }`}
            >
              {msg.content}
              {msg.role === 'assistant' && msg.content === '' && (
                <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse rounded" />
              )}
            </div>
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base mr-2 flex-shrink-0 ${c.icon}`}>
              {employee.emoji}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder={`${employee.name}에게 메시지 보내기...`}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className={`${c.bubble} text-white px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-40 hover:opacity-90 transition-opacity`}
        >
          전송
        </button>
      </div>
    </div>
  );
}
