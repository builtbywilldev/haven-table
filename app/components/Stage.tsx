"use client";
import { useRef, useEffect, useState } from "react";
import { mockAgents } from "../constants";
import { AgentCard } from "./AgentCard";

export function Stage() {
  const [started, setStarted] = useState(false);
  const [circleSize, setCircleSize] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (circleRef.current) {
        const rect = circleRef.current.getBoundingClientRect();
        setCircleSize(Math.min(rect.width, rect.height) * 0.8);
      }
      setIsMobile(window.innerWidth < 900);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = circleSize / 2 + 80;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div
        className={`relative w-full h-full ${
          isMobile ? "px-4 pt-8 pb-24" : "max-w-[90vmin] max-h-[90vmin]"
        }`}
        ref={circleRef}
      >
        {/* Desktop Table */}
        {!isMobile && (
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-700 bg-[#111] shadow-inner"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          />
        )}

        {/* Agent Avatars */}
        {started && (
          <>
            {!isMobile ? (
              mockAgents.map((agent, index) => {
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
                    <AgentCard agent={agent} />
                  </div>
                );
              })
            ) : (
              <div className="flex justify-between gap-2 px-2 mb-6">
                {mockAgents.map((agent) => (
                  <AgentCard key={agent.name} agent={agent} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Center Card */}
        <div
          className={`absolute z-20 bg-[#1a1a1a] text-white rounded-lg shadow-lg border border-gray-700 w-full max-w-md ${
            isMobile
              ? "inset-x-0 bottom-6 mx-auto px-4 py-4"
              : "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 text-center"
          }`}
        >
          {!started ? (
            <>
              <p className="mb-2 text-white font-mono tracking-wide">
                ⚔️ The Haven Table is open.
              </p>
              <p className="text-sm text-gray-300">
                This is a zero-storage, in-browser simulation chamber. Agents
                will speak in sequence.
              </p>
              <p className="mt-2 italic text-gray-500 text-xs">
                No data is saved. Nothing leaves the circle.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="mt-4 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors"
              >
                Start Debate
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-1">Now Speaking:</p>
              <p className="text-lg font-mono mb-4">{mockAgents[0].message}</p>
              <input
                type="text"
                placeholder="Your interjection..."
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm text-white"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
