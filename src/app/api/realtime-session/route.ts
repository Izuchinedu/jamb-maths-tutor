const allowedTopics = new Set([
  "General JAMB Mathematics",
  "Number and Numeration",
  "Algebra",
  "Geometry",
  "Trigonometry",
  "Calculus",
  "Statistics",
  "Probability",
]);

const baseInstructions =
  "You are JAMB Maths Teacher, a patient online Mathematics teacher for Nigerian students preparing for JAMB. Explain step by step, use simple language, focus on JAMB/UTME Mathematics, avoid unnecessary university-level mathematics, and ask short follow-up questions when helpful.";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "The voice session is not configured yet because OPENAI_API_KEY is missing. Please ask the site owner to add it and restart the app.",
      },
      { status: 500 },
    );
  }

  let topic = "General JAMB Mathematics";

  try {
    const body = await request.json();

    if (typeof body?.topic === "string" && allowedTopics.has(body.topic)) {
      topic = body.topic;
    }
  } catch {
    // Keep the default topic when the request body is empty or invalid.
  }

  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expires_after: {
        anchor: "created_at",
        seconds: 60,
      },
      session: {
        type: "realtime",
        model: "gpt-realtime",
        output_modalities: ["audio"],
        instructions: `${baseInstructions} The selected lesson topic is ${topic}.`,
        audio: {
          input: {
            transcription: {
              model: "gpt-4o-mini-transcribe",
              language: "en",
            },
            turn_detection: {
              type: "server_vad",
              create_response: true,
              interrupt_response: true,
            },
          },
          output: {
            voice: "marin",
          },
        },
      },
    }),
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    return Response.json(
      {
        error:
          responseBody?.error?.message ||
          "The voice session could not be prepared. Please try again shortly.",
      },
      { status: response.status },
    );
  }

  const clientSecret =
    responseBody?.client_secret ??
    responseBody?.session?.client_secret ??
    (responseBody?.value
      ? { value: responseBody.value, expires_at: responseBody.expires_at }
      : null);

  return Response.json(
    {
      client_secret: clientSecret,
      session: responseBody?.session,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
