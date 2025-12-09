"use client";

import Plot from "react-plotly.js";

export default function MultiOmicsPanel({ variant }: { variant: any | null }) {
  const expressionTrace = {
    x: ["Heart", "Liver", "Brain", "Lung", "Kidney"],
    y: [Math.random() * 20, Math.random() * 6, Math.random() * 8, Math.random() * 3, Math.random() * 5],
    type: "bar",
    name: "Expression (TPM)"
  };

  const splicingTrace = {
    x: ["Exon1", "Exon2", "Exon3", "Exon4"],
    y: [0.2 + Math.random() * 0.6, 0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.4, 0.05 + Math.random() * 0.3],
    type: "scatter",
    name: "Splice delta"
  };

  return (
    <div className="space-y-4 text-silver">
      <div>
        <div className="text-white font-semibold mb-2">Tissue Expression</div>
        <Plot data={[expressionTrace]} layout={{ margin: { t: 10, l: 40, r: 10, b: 30 }, height: 160 }} config={{ displayModeBar: false }} />
      </div>

      <div>
        <div className="text-white font-semibold mb-2">Predicted Splicing Impact</div>
        <Plot data={[splicingTrace]} layout={{ margin: { t: 10, l: 40, r: 10, b: 30 }, height: 140 }} config={{ displayModeBar: false }} />
      </div>

      <div>
        <div className="text-white font-semibold mb-2">Epigenetic Signal (Roadmap)</div>
        <div className="bg-midnight/30 p-2 rounded text-xs">Open chromatin peaks shown near exon boundaries (mock data).</div>
      </div>
    </div>
  );
}
