import React, { useState, useRef, useEffect } from 'react';
import { askShoppingAssistant } from '../../services/ai';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! Ask me for products, recommendations, or review summaries.', isBot: true, recommendations: [] }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef(null);

  // Auto-scrolls to the newest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt || sending) return;

    // Add user message
    const userMessage = { id: Date.now(), text: prompt, isBot: false, recommendations: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const result = await askShoppingAssistant(prompt);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: result?.assistantMessage || 'I can help you find products by budget, category, and features.',
          isBot: true,
          recommendations: result?.recommendations || [],
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'I could not process that request right now. Please try again.',
          isBot: true,
          recommendations: [],
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[450px] w-auto flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 transition-all duration-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div>
              <h3 className="font-semibold text-sm">Customer Support</h3>
              <p className="text-xs text-blue-100">We typically reply in minutes</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-blue-700 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.isBot
                      ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {msg.text}
                  {msg.isBot && msg.recommendations && msg.recommendations.length > 0 && (
                    <div className='mt-3 space-y-2'>
                      {msg.recommendations.slice(0, 3).map((item) => (
                        <a
                          key={item.id}
                          href={`/product/${item.slug}`}
                          className='block rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700 no-underline hover:bg-slate-100'
                        >
                          <div className='font-semibold'>{item.title}</div>
                          <div className='text-slate-500'>${item.price} • {item.brand || 'Brand'}</div>
                          <div className='mt-1 text-[11px] text-slate-500'>{item.aiGeneratedDescription}</div>
                          <div className='mt-1 text-[11px] text-slate-500'>{item.reviewSummary}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex border-t border-gray-100 p-3 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-50 px-4 py-2 text-sm rounded-lg border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={sending}
              className="ml-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              {sending ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full mx-10 my-5 bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-200" 
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
          </svg>
        )}
      </button>
    </div>
  );
}