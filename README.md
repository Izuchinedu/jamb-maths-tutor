# JAMB Maths Teacher

JAMB Maths Teacher is an online Mathematics learning platform for Nigerian students preparing for JAMB. The current MVP gives students a simple place to review important topics, practise sample questions, see step-by-step explanations, and join a live voice teaching session.

## Current MVP features

- Homepage introducing JAMB Maths Teacher and its student support focus.
- Student dashboard with JAMB Mathematics topic cards.
- Ask Teacher page with a placeholder question-and-response experience.
- Live Class page where a student can join a voice session and ask JAMB Mathematics questions.
- Live Board page with a teacher-style panel and step-by-step board writing.
- Practice quiz with five sample Mathematics questions, scoring, and explanations.
- Simple admin page for reviewing starter topics and adding sample questions during a session.

## Planned future features

Future versions may include:

- Student accounts.
- Progress tracking.

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS

## Environment variables

Create a local environment file for development:

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your server key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Do not commit `.env.local`. Keep it only on your computer or deployment environment.

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the live class locally

1. Confirm `.env.local` contains `OPENAI_API_KEY`.
2. Start the app with `npm run dev`.
3. Open [http://localhost:3000/live-class](http://localhost:3000/live-class).
4. Choose a Mathematics topic.
5. Click **Join Teaching Session**.
6. Allow microphone access when your browser asks.
7. Speak a JAMB Mathematics question and listen for the Maths Teacher reply.
8. Click **End Session** when you are done.

If microphone access is blocked, allow it in your browser settings and try again. If the server key is missing, the page will show a friendly setup message.

## Live Board prototype

`/live-board` is the first Live Board Teacher prototype for JAMB Maths Teacher. It shows a teacher-style panel beside a classroom board, then writes a sample solution step by step after a student starts the board lesson.

Future versions will connect the board to the live voice teacher, Nigerian-accent voice, and a more realistic teacher visual.


## Build

Run the production build check:

```bash
npm run build
```
