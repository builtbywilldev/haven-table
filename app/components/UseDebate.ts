import { useEffect } from "react";
import { mockAgents, mockStatements } from "./constants";

export function useDebate(
  started: boolean,
  setMessages: React.Dispatch<React.SetStateAction<{ speaker: string; content: string }[]>>,
  setCurrentSpeaker: React.Dispatch<React.SetStateAction<string>>,
  initialPrompt: string
) {
  useEffect(() => {
    if (!started || !initialPrompt) return;

    let index = 0;

    setMessages([{ speaker: "User", content: initialPrompt }]);
    setCurrentSpeaker(`User: ${initialPrompt}`);

    const interval = setInterval(() => {
      const agent = mockAgents[index % mockAgents.length];
      const statement = mockStatements[index % mockStatements.length];

      const message = {
        speaker: agent.name,
        content: statement,
      };

      setMessages((prev) => [...prev, message]);
      setCurrentSpeaker(`${message.speaker}: ${message.content}`);
      index++;
    }, 3000);

    return () => clearInterval(interval);
  }, [started, initialPrompt]);
}
