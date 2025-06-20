"use client";

type Props = {
  interjection: string;
  setInterjection: (value: string) => void;
  onStartDebate: () => void;
  disabled: boolean;
  started: boolean;
  liveInterjection: string;
  setLiveInterjection: (value: string) => void;
  onSubmitLiveInterjection: () => void;
};

export default function InterjectionInput({
  interjection,
  setInterjection,
  onStartDebate,
  disabled,
  started,
  liveInterjection,
  setLiveInterjection,
  onSubmitLiveInterjection,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!started && !disabled) {
        onStartDebate();
      } else {
        onSubmitLiveInterjection();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {!started && (
        <input
          type="text"
          value={interjection}
          onChange={(e) => setInterjection(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What are we debating today?"
          className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm text-white text-center w-full"
        />
      )}

      {started && (
        <input
          type="text"
          value={liveInterjection}
          onChange={(e) => setLiveInterjection(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Optional interjection..."
          className="px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm text-white text-center w-full"
        />
      )}

      {!started && (
        <button
          onClick={onStartDebate}
          disabled={disabled}
          className={`w-full mt-2 px-6 py-3 rounded-md transition ${
            !disabled
              ? "bg-[#6C47FF] text-white hover:bg-[#845FFF]"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Start Debate
        </button>
      )}
    </div>
  );
}
