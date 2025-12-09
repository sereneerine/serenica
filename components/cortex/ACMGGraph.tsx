"use client";

import React, { useMemo, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from "react-flow-renderer";

type Props = {
  variant: any | null;
  mode: string;
  onNodeToggle?: (nodeId: string) => void;
};

export default function ACMGGraph({ variant, mode, onNodeToggle }: Props) {
  const baseNodes: Node[] = useMemo(
    () => [
      { id: "PS1", type: "default", data: { label: "PS1 (Same AA change as known pathogenic)" }, position: { x: 0, y: 0 } },
      { id: "PM2", type: "default", data: { label: "PM2 (Absent from population dbs)" }, position: { x: 200, y: -40 } },
      { id: "PP3", type: "default", data: { label: "PP3 (Computational evidence)" }, position: { x: 200, y: 60 } },
      { id: "BS1", type: "default", data: { label: "BS1 (Allele frequency too high)" }, position: { x: -200, y: 0 } }
    ],
    []
  );

  const edges: Edge[] = useMemo(
    () => [
      { id: "e1-2", source: "PS1", target: "PM2", animated: false },
      { id: "e1-3", source: "PS1", target: "PP3", animated: false },
      { id: "e4-1", source: "BS1", target: "PS1" }
    ],
    []
  );

  const [activated, setActivated] = useState<Record<string, boolean>>({ PS1: false, PM2: false, PP3: false, BS1: false });

  React.useEffect(() => {
    if (!variant) {
      setActivated({ PS1: false, PM2: false, PP3: false, BS1: false });
      return;
    }
    setActivated({
      PS1: variant.impact > 0.85,
      PM2: variant.af < 1e-4,
      PP3: variant.impact > 0.6,
      BS1: variant.af > 0.01
    });
  }, [variant]);

  const nodesWithStyle = baseNodes.map((n) => {
    const act = activated[n.id as keyof typeof activated] ?? false;
    return {
      ...n,
      data: {
        ...n.data,
        label: (
          <div>
            <div className="font-semibold">{n.data.label}</div>
            <div className="text-xs text-silver">{act ? "Evidence found" : "No evidence"}</div>
            <button
              className="mt-2 px-2 py-1 text-xs rounded bg-midnight/40"
              onClick={(e) => {
                e.stopPropagation();
                setActivated((s) => ({ ...s, [n.id]: !act }));
                onNodeToggle && onNodeToggle(n.id);
              }}
            >
              {act ? "Disable" : "Enable"}
            </button>
          </div>
        )
      },
      style: {
        width: 240,
        padding: 8,
        border: act ? "2px solid #02E9FF" : "1px dashed #3b4755",
        background: act ? "#07142A" : "#0E1828"
      }
    } as Node;
  });

  return (
    <div style={{ height: 280 }}>
      <ReactFlow nodes={nodesWithStyle} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
