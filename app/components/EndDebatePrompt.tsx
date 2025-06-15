type EndDebatePromptProps = {
  onExport: () => void;
  onStartOver: () => void;
};

export default function EndDebatePrompt({ onExport, onStartOver }: EndDebatePromptProps) {
  return (
    <div className="bg-[#111] text-white p-4 rounded-md shadow-md border border-gray-700 w-[320px] space-y-3">
      <div className="text-sm font-semibold">Debate ended.</div>
      <div className="text-xs text-gray-400">Would you like to export or start over?</div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onStartOver}
          className="px-3 py-1 rounded-md bg-blue-600 text-sm hover:bg-blue-500"
        >
          Start Over
        </button>
        <button
          onClick={onExport}
          className="px-3 py-1 rounded-md bg-gray-700 text-sm hover:bg-gray-600"
        >
          Export
        </button>
      </div>
    </div>
  );
}
