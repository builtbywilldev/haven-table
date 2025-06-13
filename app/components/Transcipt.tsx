interface TranscriptProps {
  messages?: { speaker: string; content: string }[];
}

export default function Transcript({ messages = [] }: TranscriptProps) {
  return (
    <div className="bg-[#111] border border-gray-700 rounded-md p-4 overflow-y-auto h-full space-y-3 text-sm text-gray-200 shadow-inner">
      {messages.length === 0 ? (
        <p className="italic text-gray-500">No transcript available yet.</p>
      ) : (
        messages.map((msg, i) => (
          <div key={i}>
            <span className="font-bold text-purple-400">{msg.speaker}:</span>{" "}
            <span className="whitespace-pre-line">{msg.content}</span>
          </div>
        ))
      )}
    </div>
  );
}
