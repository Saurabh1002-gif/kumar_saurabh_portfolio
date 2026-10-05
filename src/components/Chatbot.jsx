import { useEffect, useRef, useState } from "react";
import { Chat, Close, Send } from "./Icons.jsx";
import { localAnswer } from "../lib/localAnswer.js";
import { profile } from "../data/profile.js";

const SUGGESTIONS = [
  "What has Saurabh built?",
  "How does he debug problems?",
  "Is he available to join?",
  "How can I contact him?",
];

const GREETING = {
  role: "assistant",
  content: `Hi, I am Saurabh's AI assistant. I can answer questions about his projects, skills and availability on his behalf. What would you like to know?`,
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("open-chat", openIt);
    return () => window.removeEventListener("open-chat", openIt);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy, open]);

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);

    let reply;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      reply = data.reply;
    } catch (e) {
      reply = localAnswer(question);
    }
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setBusy(false);
  }

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Chat with Saurabh's AI assistant">
          <Chat /> <span>Ask my AI</span>
        </button>
      )}

      {open && (
        <section className="chat" role="dialog" aria-label="Chat with Saurabh's AI assistant">
          <header className="chat__head">
            <div>
              <p className="chat__title">Saurabh's AI assistant</p>
              <p className="chat__sub">Answers on his behalf</p>
            </div>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close chat"><Close /></button>
          </header>

          <div className="chat__list" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={"bubble bubble--" + m.role}>{m.content}</div>
            ))}
            {busy && <div className="bubble bubble--assistant bubble--typing" aria-label="Typing"><i /><i /><i /></div>}
            {messages.length === 1 && (
              <div className="chat__suggest">
                {SUGGESTIONS.map((s) => (<button key={s} onClick={() => send(s)}>{s}</button>))}
              </div>
            )}
          </div>

          <div className="chat__foot">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="chat__form">
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about projects, skills, availability" aria-label="Your message" maxLength={300} />
              <button className="btn btn--primary chat__send" type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Send width={18} height={18} /></button>
            </form>
            <p className="chat__note">AI can make mistakes. Confirm details at <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          </div>
        </section>
      )}
    </>
  );
}
