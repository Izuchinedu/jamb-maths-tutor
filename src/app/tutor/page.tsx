"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Message = {
  sender: "student" | "tutor";
  text: string;
};

export default function TutorPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "tutor",
      text: "Hello. I am your JAMB Maths Teacher. Ask me any JAMB Mathematics question, and I will explain it step by step.",
    },
  ]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    const studentQuestion: Message = {
      sender: "student",
      text: question,
    };

    const tutorReply: Message = {
      sender: "tutor",
      text:
        "Maths teacher is not connected yet. Soon, I will help you solve JAMB Mathematics questions step by step. For now, your question has been received: " +
        question,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      studentQuestion,
      tutorReply,
    ]);

    setQuestion("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-green-700">Maths Teacher</p>
            <h1 className="mt-2 text-3xl font-bold">Ask your Mathematics teacher</h1>
            <p className="mt-3 text-slate-600">
              This is the first placeholder version. We will connect the real AI
              tutor later.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold hover:bg-slate-100"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-[420px] space-y-4 overflow-y-auto rounded-xl bg-slate-100 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.sender === "student"
                    ? "ml-auto bg-green-700 text-white"
                    : "mr-auto bg-white text-slate-800"
                }`}
              >
                <p className="mb-1 text-xs font-bold uppercase">
                  {message.sender === "student" ? "You" : "Maths Teacher"}
                </p>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Type a JAMB Mathematics question here..."
              className="min-h-12 flex-1 rounded-xl border border-slate-300 px-4 outline-none focus:border-green-700"
            />
            <button
              type="submit"
              className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Ask Teacher
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
