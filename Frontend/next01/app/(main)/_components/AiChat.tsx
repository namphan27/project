"use client";

import { useEffect, useRef, useState } from "react";
import { X, Minus, Send, Sparkles } from "lucide-react";
import axiosInstance from "../services/axios";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    {
      role: "ai" | "user";
      text: string;
    }[]
  >([
    {
      role: "ai",
      text: "Xin chào! Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/ai/chat", {
        message: userMessage,
      });

      const data = res.data;


      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.data,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: error instanceof Error ? error.message : "Có lỗi xảy ra với AI",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 flex items-center gap-3 rounded-full bg-[#18191a] px-5 py-3 text-white shadow-xl cursor-pointer hover:bg-[#303030] transition"
        >
          <div className=" flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-blue-500">
            <Sparkles size={18} />
          </div>

          <span className="font-semibold">Meta AI</span>

          <span className="text-blue-500">✓</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 flex h-150 w-90 flex-col overflow-hidden rounded-xl bg-[#242526] shadow-2xl">
          <div className="flex h-14 items-center justify-between border-b border-gray-700 px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white">
                <Sparkles size={18} />
              </div>

              <div>
                <div className="font-semibold text-white">Meta AI ✓</div>

                <div className="text-xs text-gray-400">AI Assistant</div>
              </div>
            </div>

            <div className="flex gap-3 text-blue-500">
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer hover:text-blue-400"
              >
                <Minus size={20} />
              </button>

              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer hover:text-blue-400"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={`message ${
                    item.role === "user"
                      ? "max-w-[75%] rounded-2xl bg-[#5865f2] px-4 py-2 text-white"
                      : "max-w-[75%] rounded-2xl bg-[#3a3b3c] px-4 py-2 text-white"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-[#3a3b3c] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />

                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="border-t border-gray-700 p-3">
            <div className="flex items-center rounded-full bg-[#3a3b3c] px-4">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Aa"
                className="flex-1 bg-transparent py-2 text-white outline-none"
              />

              <button
                onClick={sendMessage}
                className="cursor-pointer text-blue-500 transition hover:text-blue-400"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
