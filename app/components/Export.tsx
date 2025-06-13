"use client";

import { SignedIn } from "@clerk/nextjs";
import { mockAgents } from "../constants";

export default function Export() {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(mockAgents, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "debate_log.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SignedIn>
      <button
        onClick={handleExport}
        className="fixed bottom-4 right-4 px-4 py-2 rounded-full bg-[#6C47FF] text-white hover:bg-[#845FFF] transition shadow-lg z-50"
      >
        🧠 Export Debate
      </button>
    </SignedIn>
  );
}
