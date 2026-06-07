import type { Metadata } from "next";
import LiveClassClient from "./LiveClassClient";

export const metadata: Metadata = {
  title: "Live Teaching Session | JAMB Maths Teacher",
  description: "Join a voice session and ask JAMB Mathematics questions.",
};

export default function LiveClassPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="mb-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
          JAMB Maths Teacher
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Live Teaching Session
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Join a voice session and ask JAMB Mathematics questions.
        </p>

        <div className="mt-8">
          <LiveClassClient />
        </div>
      </section>
    </main>
  );
}
