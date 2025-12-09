"use client";
import { useState } from "react";
import axios from "axios";

export default function AiCopilot({ jobId, onAction }: { jobId?: string | null; onAction?: (a: any) => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Serenica Copilot ready. Try: 'Which variants most likely disease-causing?'"]);

  const ask = async () => {
    if (!input.trim()) return;
    setHistory(h => [...h, `You: ${input}`]);
    // mock response
    let reply = "I recommend prioritizing rare (AF<1e-4) missense variants in constrained genes.";
    if (/cardio/i.test(input)) {
      reply = "Filtering for cardiomyopathy genes (MYH7, MYBPC3).";
      onAction && onAction({ type: "filter", genes: ["MYH7", "MYBPC3"] });
    }
    setTimeout(() => setHistory(h => [...h, `Serenica: ${reply}`]), 300);
    setInput("");
  };

  return (
    <div className="bg-midnight p-3 rounded shadow">
      <div className="text-white font-semibold mb-2">AI Co-Pilot</div>
      <div className="h-36 overflow-auto p-2 bg-[#071729] rounded text-xs text-silver mb-2">
        {history.map((h, i) => <div key={i} className="mb-2">{h}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-2 rounded bg-slate text-white text-sm" placeholder="Ask a question or run a filter..." />
        <button onClick={ask} className="bg-helix px-3 py-2 rounded text-midnight">Ask</button>
      </div>
    </div>
  );
}
