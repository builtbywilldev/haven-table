"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { mockAgents } from "./constants";
import { AgentCard } from "./AgentCard";
import Transcript from "./Transcipt";
import Export from "./Export";
import { useDebate } from "./UseDebate";
import EndDebatePrompt from "./EndDebatePrompt";
import InterjectionInput from "./InterjectionInput";

export function Stage() {
  const [started, setStarted] = useState(false);
  const [tableSize, setTableSize] = useState(400);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<{ speaker: string; content: string }[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState("");
  const [interjection, setInterjection] = useState("");
  const [liveInterjection, setLiveInterjection] = useState("");
  const [initialPrompt, setInitialPrompt] = useState("");
  const [debateEnded, setDebateEnded] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const isSignedIn = true;

  useDebate(
    started && !debateEnded,
    setMessages,
    setCurrentSpeaker,
    initialPrompt
  );

  useEffect(() => {
    const updateSize = () => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        const calculatedSize = Math.min(rect.width, rect.height) * 0.8;
        setTableSize(Math.max(400, calculatedSize));
      }
      setIsMobile(window.innerWidth < 900);
    };

    const timer = setTimeout(updateSize, 100);
    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const radius = tableSize / 2 - 40;

  const handleExport = useCallback(() => {
    if (!isSignedIn) {
      toast.error("You must be signed in to export the transcript.");
      return;
    }
    const blob = new Blob(
      [messages.map((m) => `${m.speaker}: ${m.content}`).join("\n")],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "debate_transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [isSignedIn, messages]);

  const handleEndDebate = useCallback(() => {
    setDebateEnded(true);
    toast.custom((t) => (
      <EndDebatePrompt
        onExport={() => {
          handleExport();
          toast.dismiss(t);
        }}
        onStartOver={() => {
          setStarted(false);
          setMessages([]);
          setCurrentSpeaker("");
          setInterjection("");
          setInitialPrompt("");
          setDebateEnded(false);
          setLiveInterjection("");
          toast.dismiss(t);
        }}
      />
    ));
  }, [handleExport]);

  const handleStartDebate = () => {
    if (interjection.trim() && !started && !debateEnded) {
      setInitialPrompt(interjection);
      setDebateEnded(false);
      setStarted(true);
    }
  };

  const handleLiveInterjectionSubmit = () => {
    if (!liveInterjection.trim()) return;
    setMessages((prev) => [
      ...prev,
      { speaker: "User", content: liveInterjection.trim() },
    ]);
    setLiveInterjection("");
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black text-white overflow-hidden">
      {started ? (
        <>
          <div className="w-full md:w-1/2 flex flex-col p-4 md:p-16 items-center gap-4">
            <input
              type="text"
              value={interjection}
              readOnly
              className="w-full max-w-sm px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm text-white"
            />
            <InterjectionInput
              interjection={interjection}
              setInterjection={setInterjection}
              started={started}
              disabled={false}
              liveInterjection={liveInterjection}
              setLiveInterjection={setLiveInterjection}
              onStartDebate={handleStartDebate}
              onSubmitLiveInterjection={handleLiveInterjectionSubmit}
            />
            <div
              ref={tableRef}
              className="flex justify-center items-center flex-grow w-full"
            >
              {isMobile ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {mockAgents.map((agent) => (
                    <AgentCard
                      key={agent.name}
                      agent={{ ...agent, message: "" }}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="relative bg-[#111] border border-gray-700 shadow-inner"
                  style={{ width: `${tableSize}px`, height: `${tableSize}px` }}
                >
                  {mockAgents.map((agent, index) => {
                    const angle =
                      (index / mockAgents.length) * 2 * Math.PI - Math.PI / 2;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    return (
                      <div
                        key={agent.name}
                        className="absolute z-10"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                      >
                        <AgentCard agent={{ ...agent, message: "" }} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col px-4 py-6 space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-md border border-gray-700 shadow-md">
              <p className="text-sm text-gray-400 mb-1">Now Speaking:</p>
              <p className="text-lg font-mono">
                {currentSpeaker || "Waiting..."}
              </p>
            </div>
            <div className="max-h-[400px] overflow-y-auto rounded-md border border-gray-700 bg-[#111] p-4 shadow-inner">
              <Transcript messages={messages} />
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <button
                onClick={handleExport}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Export Transcript
              </button>
              <button
                onClick={handleEndDebate}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                End Debate
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-xl md:text-2xl text-blue-300 font-semibold">
            The Haven Table is open.
          </h1>
          <p className="text-gray-400 mt-2 max-w-sm">
            This is a zero-storage, in-browser simulation chamber. Agents will
            speak in sequence.
          </p>
          <p className="text-xs italic text-gray-500 mt-1">
            No data is saved. Nothing leaves the circle.
          </p>
          <InterjectionInput
            interjection={interjection}
            setInterjection={setInterjection}
            onStartDebate={handleStartDebate}
            disabled={!interjection.trim()}
            started={started}
            liveInterjection={liveInterjection}
            setLiveInterjection={setLiveInterjection}
            onSubmitLiveInterjection={handleLiveInterjectionSubmit}
          />
        </div>
      )}
    </div>
  );
}
