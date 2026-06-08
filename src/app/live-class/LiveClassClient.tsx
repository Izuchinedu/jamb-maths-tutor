"use client";

import { useRef, useState } from "react";

const topics = [
  "General JAMB Mathematics",
  "Number and Numeration",
  "Algebra",
  "Geometry",
  "Trigonometry",
  "Calculus",
  "Statistics",
  "Probability",
];

type ConnectionStatus = "Not connected" | "Connecting" | "Connected" | "Ended";

type TranscriptLine = {
  id: string;
  speaker: "Student" | "Maths Teacher";
  text: string;
};

type RealtimeEvent = {
  type?: string;
  item_id?: string;
  response_id?: string;
  output_index?: number;
  content_index?: number;
  transcript?: string;
  text?: string;
  delta?: string;
  error?: {
    message?: string;
  };
};

function transcriptKey(event: RealtimeEvent) {
  return [
    event.response_id ?? "response",
    event.item_id ?? "item",
    event.output_index ?? 0,
    event.content_index ?? 0,
  ].join(":");
}

export default function LiveClassClient() {
  const [topic, setTopic] = useState(topics[0]);
  const [status, setStatus] = useState<ConnectionStatus>("Not connected");
  const [errorMessage, setErrorMessage] = useState("");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const teacherDraftsRef = useRef(new Map<string, string>());

  function addTranscriptLine(line: TranscriptLine) {
    setTranscript((current) => [...current, line]);
  }

  function upsertTeacherDraft(id: string, text: string) {
    setTranscript((current) => {
      const existingIndex = current.findIndex((line) => line.id === id);

      if (existingIndex === -1) {
        return [...current, { id, speaker: "Maths Teacher", text }];
      }

      return current.map((line, index) =>
        index === existingIndex ? { ...line, text } : line,
      );
    });
  }

  function handleRealtimeEvent(event: RealtimeEvent) {
    if (event.type === "conversation.item.input_audio_transcription.completed") {
      const text = event.transcript?.trim();

      if (text) {
        addTranscriptLine({
          id: event.item_id ?? `student-${Date.now()}`,
          speaker: "Student",
          text,
        });
      }
    }

    if (event.type === "response.output_audio_transcript.delta") {
      const key = transcriptKey(event);
      const nextText = `${teacherDraftsRef.current.get(key) ?? ""}${event.delta ?? ""}`;
      teacherDraftsRef.current.set(key, nextText);
      upsertTeacherDraft(key, nextText);
    }

    if (event.type === "response.output_audio_transcript.done") {
      const key = transcriptKey(event);
      const text = event.transcript?.trim() || teacherDraftsRef.current.get(key)?.trim();

      if (text) {
        upsertTeacherDraft(key, text);
      }
    }

    if (event.type === "response.output_text.done") {
      const text = event.text?.trim();

      if (text) {
        addTranscriptLine({
          id: transcriptKey(event),
          speaker: "Maths Teacher",
          text,
        });
      }
    }

    if (event.type === "error") {
      setErrorMessage(
        event.error?.message ||
          "The voice session had a problem. Please end the session and try again.",
      );
    }
  }

  function endSession(nextStatus: ConnectionStatus = "Ended") {
    dataChannelRef.current?.close();
    dataChannelRef.current = null;

    peerConnectionRef.current?.getSenders().forEach((sender) => {
      sender.track?.stop();
    });
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;

    if (audioElementRef.current) {
      audioElementRef.current.srcObject = null;
      audioElementRef.current.remove();
      audioElementRef.current = null;
    }

    setStatus(nextStatus);
  }

  async function joinSession() {
    setErrorMessage("");
    setTranscript([]);
    teacherDraftsRef.current.clear();
    setStatus("Connecting");

    try {
      const tokenResponse = await fetch("/api/realtime-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(
          tokenData?.error ||
            "The voice session could not start. Please try again shortly.",
        );
      }

      const clientSecret = tokenData?.client_secret?.value;

      if (!clientSecret) {
        throw new Error(
          "The voice session could not start because the session credential was not returned.",
        );
      }

      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      const audioElement = document.createElement("audio");
      audioElement.autoplay = true;
      audioElementRef.current = audioElement;
      peerConnection.ontrack = (event) => {
        audioElement.srcObject = event.streams[0];
      };

      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        throw new Error(
          "Microphone access is needed for the voice session. Please allow microphone access in your browser and try again.",
        );
      }

      mediaStreamRef.current = mediaStream;
      mediaStream.getAudioTracks().forEach((track) => {
        peerConnection.addTrack(track, mediaStream);
      });

      const dataChannel = peerConnection.createDataChannel("oai-events");
      dataChannelRef.current = dataChannel;
      dataChannel.addEventListener("message", (message) => {
        try {
          handleRealtimeEvent(JSON.parse(message.data));
        } catch {
          // Ignore non-JSON events from the data channel.
        }
      });
      dataChannel.addEventListener("open", () => {
        dataChannel.send(
          JSON.stringify({
            type: "response.create",
            response: {
              instructions: `Welcome the student to JAMB Maths Teacher. Mention that this live teaching session is ready for ${topic}. Ask the student to say the JAMB Mathematics question they want help with.`,
            },
          }),
        );
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${clientSecret}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(
          "The voice session could not connect. Please check your connection and try again.",
        );
      }

      await peerConnection.setRemoteDescription({
        type: "answer",
        sdp: await sdpResponse.text(),
      });

      setStatus("Connected");
    } catch (error) {
      endSession("Ended");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The voice session could not start. Please try again.",
      );
    }
  }

  const isConnecting = status === "Connecting";
  const isConnected = status === "Connected";

  return (
    <section className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <label htmlFor="topic" className="text-sm font-bold text-slate-800">
            Choose a topic
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            disabled={isConnecting || isConnected}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-100 disabled:bg-slate-100"
          >
            {topics.map((topicOption) => (
              <option key={topicOption} value={topicOption}>
                {topicOption}
              </option>
            ))}
          </select>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={joinSession}
              disabled={isConnecting || isConnected}
              className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isConnecting ? "Connecting" : "Join Teaching Session"}
            </button>
            <button
              type="button"
              onClick={() => endSession("Ended")}
              disabled={!isConnecting && !isConnected}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              End Session
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">Status</p>
            <p className="mt-1 text-lg font-bold text-green-800">{status}</p>
          </div>

          {errorMessage ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {errorMessage}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-lg font-bold text-slate-900">Session transcript</h2>
          <div className="mt-4 max-h-96 min-h-64 space-y-3 overflow-y-auto rounded-xl bg-white p-4">
            {transcript.length === 0 ? (
              <p className="text-sm leading-6 text-slate-500">
                Transcript text will appear here when it is available during the voice session.
              </p>
            ) : (
              transcript.map((line) => (
                <div key={line.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                    {line.speaker}
                  </p>
                  <p className="mt-1 leading-7 text-slate-800">{line.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
