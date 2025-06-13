// components/AgentCard.tsx
"use client";

interface Agent {
  name: string;
  message: string;
  color: string;
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {/* Agent Avatar */}
      <div className={`w-16 h-16 rounded-full bg-gray-800 border-2 ${agent.color} flex items-center justify-center shadow-md`}>
        <span className="text-xl font-bold">{agent.name.charAt(0)}</span>
      </div>

      {/* Name */}
      <p className={`text-sm font-medium ${agent.color}`}>{agent.name}</p>
    </div>
  );
}
