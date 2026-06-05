"use client";

import { FormEvent, useState } from "react";

type Message = {
  sender: "student" | "teacher";
  text: string;
};

export default function TutorPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "teacher",
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

    const teacherReply: Message = {
      sender: "teacher",
      text: "The online teacher is not connected yet. Soon, this platform will help you solve JAMB Mathematics questions step by step.",
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      studentQuestion,
      teacherReply,
    ]);

    setQuestion("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-semibold text-green-700">Maths Teacher</p>
          <h1 className="mt-2 text-3xl font-bold">Ask the Maths Teacher</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Type a JAMB Mathematics question and the online teacher area will
            show the student question and a placeholder reply.
          </p>
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
