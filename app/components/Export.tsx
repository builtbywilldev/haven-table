type ExportProps = {
  messages: { speaker: string; content: string }[];
};

export default function Export({ messages }: ExportProps) {
  const download = () => {
    const content = messages
      .map((m) => `${m.speaker}: ${m.content}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "debate_transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={download}
      className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
    >
      Export Transcript
    </button>
  );
}
