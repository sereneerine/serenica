"use client";

import React from "react";

export default function ModeSwitcher({ mode, onChange }: { mode: string; onChange: (m: any) => void }) {
  const modes = [
    { key: "clinical", label: "Clinical" },
    { key: "research", label: "Research" },
    { key: "ai", label: "AI" },
    { key: "structural", label: "Structural" }
  ];
  return (
    <div className="flex items-center gap-2">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`px-3 py-1 rounded text-sm ${mode === m.key ? "bg-helix text-midnight font-semibold" : "text-silver border border-midnight"}`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
