interface TranscriptProps {
  messages: { speaker: string; content: string }[];
}

export default function Transcript({ messages }: TranscriptProps) {
  if (!Array.isArray(messages)) return null;

  const getColor = (speaker: string) => {
    switch (speaker) {
      case "Mr. Logic":
        return "text-blue-400";
      case "Cipher":
        return "text-pink-400";
      case "Savvy":
        return "text-purple-400";
      case "Othello":
        return "text-orange-400";
      case "User":
        return "text-white font-semibold";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="space-y-3 text-sm text-gray-200">
      {messages.length === 0 ? (
        <p className="italic text-gray-500">No transcript available yet.</p>
      ) : (
        messages.map((msg, i) => (
          <div key={i}>
            <span className={`font-bold ${getColor(msg.speaker)}`}>
              {msg.speaker}:
            </span>{" "}
            <span className="whitespace-pre-line">{msg.content}</span>
          </div>
        ))
      )}
    </div>
  );
}
