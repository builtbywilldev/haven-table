"use client";

import { useRef, useEffect, useState } from "react";
import { mockAgents } from "../constants";
import { AgentCard } from "./AgentCard";
import Transcript from "./Transcipt";
import Export from "./Export";

export function Stage() {
  const [started, setStarted] = useState(false);
  const [tableSize, setTableSize] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        setTableSize(Math.min(rect.width, rect.height) * 0.8);
      }
      setIsMobile(window.innerWidth < 900);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = tableSize / 2 - 40;

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black text-white overflow-hidden">
      {started ? (
        <>
          {/* Left Side: Interjection + Table or Agent List */}
          <div className="w-full md:w-1/2 flex flex-col p-4 md:p-16 items-center gap-4">
            <input
              type="text"
              placeholder="Your interjection..."
              className="w-full max-w-sm px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm text-white"
            />
            <div ref={tableRef} className="flex justify-center items-center flex-grow w-full">
              {isMobile ? (
                <div className="flex flex-col gap-4">
                  {mockAgents.map(agent => (
                    <AgentCard key={agent.name} agent={agent} />
                  ))}
                </div>
              ) : (
                <div
                  className="relative bg-[#111] border border-gray-700 shadow-inner"
                  style={{ width: `${tableSize}px`, height: `${tableSize}px` }}
                >
                  {mockAgents.map((agent, index) => {
                    const angle = (index / mockAgents.length) * 2 * Math.PI - Math.PI / 2;
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
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Prompt + Transcript + Export */}
          <div className="w-full md:w-1/2 flex flex-col px-4 py-6 space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-md border border-gray-700 shadow-md">
              <p className="text-sm text-gray-400 mb-1">Now Speaking:</p>
              <p className="text-lg font-mono">{mockAgents[0].message}</p>
            </div>
            <div className="flex-grow overflow-auto">
              <Transcript />
            </div>
            <div className="flex justify-center pt-2">
              <Export />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-xl md:text-2xl text-blue-300 font-semibold">The Haven Table is open.</h1>
          <p className="text-gray-400 mt-2 max-w-sm">
            This is a zero-storage, in-browser simulation chamber. Agents will speak in sequence.
          </p>
          <p className="text-xs italic text-gray-500 mt-1">No data is saved. Nothing leaves the circle.</p>
          <button
            onClick={() => setStarted(true)}
            className="mt-6 px-6 py-3 bg-[#6C47FF] text-white rounded-md hover:bg-[#845FFF] transition"
          >
            Start Debate
          </button>
        </div>
      )}
    </div>
  );
}
