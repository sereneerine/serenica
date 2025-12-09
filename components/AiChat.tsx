"use client";
import { useState } from "react";
import axios from "axios";

export default function AiChat({ jobId }: { jobId?: string | null }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  async function ask() {
    if (!input) return;
    setHistory(h => [...h, `You: ${input}`]);
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai/query`, {
        jobId, prompt: input
      });
      setHistory(h => [...h, `Serenica: ${resp.data.text}`]);
      setInput("");
    } catch (e) {
      setHistory(h => [...h, "Serenica: Error — please try again."]);
    }
  }

  return (
    <div>
      <div className="h-56 overflow-auto bg-midnight p-3 rounded mb-2">
        {history.map((h, i) => <div key={i} className="text-sm text-silver">{h}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 rounded bg-slate text-white" />
        <button onClick={ask} className="bg-helix px-3 rounded text-midnight">Ask</button>
      </div>
    </div>
  );
}
