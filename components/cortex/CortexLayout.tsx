"use client";

import React, { useMemo, useState } from "react";
import ModeSwitcher from "./ModeSwitcher";
import VariantGalaxy from "./VariantGalaxy";
import ACMGGraph from "./ACMGGraph";
import MultiOmicsPanel from "./MultiOmicsPanel";
import AiCopilot from "./AiCopilotLocal";
import VariantDrawerLocal from "./VariantDrawerLocal";
import GenomeBrowser from "./GenomeBrowser";

type Props = {
  vcfSizeMb: number;
  genomeBuild: string;
};

export default function CortexLayout({ vcfSizeMb, genomeBuild }: Props) {
  const [mode, setMode] = useState<"clinical" | "research" | "ai" | "structural">(
    vcfSizeMb < 5 ? "research" : "clinical"
  );

  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  const variants = useMemo(
    () =>
      Array.from({ length: 300 }).map((_, i) => {
        const af = Math.pow(10, -6 + Math.random() * 2);
        const impact = Math.random();
        const geneIndex = Math.floor(Math.random() * 80);
        return {
          id: `v${i}`,
          chrom: `${1 + (i % 22)}`,
          pos: Math.floor(Math.random() * 1e6),
          ref: "A",
          alt: "T",
          af,
          impact,
          gene: `GENE${geneIndex}`,
          acmg: impact > 0.8 ? "Pathogenic" : impact > 0.6 ? "Likely" : "VUS",
          aiWeight: Math.random()
        };
      }),
    []
  );

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-4">
        <div className="bg-panel rounded p-4">
          <div className="flex items-center justify-between">
            <div>
              <ModeSwitcher mode={mode} onChange={m => setMode(m)} />
              <div className="text-silver text-sm mt-2">Mode: {mode} • Build: {genomeBuild} • VCF: {vcfSizeMb} MB</div>
            </div>
            <div className="text-right text-silver text-sm">Selected: {selectedVariant?.id ?? "—"}</div>
          </div>
          <div className="mt-4 h-[520px] rounded border border-midnight overflow-hidden">
            <VariantGalaxy variants={variants} onSelect={setSelectedVariant} mode={mode} />
          </div>
        </div>

        <div className="bg-panel rounded p-4">
          <h3 className="text-white font-semibold mb-2">Genome Browser</h3>
          <GenomeBrowser selectedVariant={selectedVariant} />
        </div>
      </div>

      <div className="col-span-4 space-y-4">
        <div className="bg-panel rounded p-4 h-[360px] overflow-auto">
          <h3 className="text-white font-semibold mb-3">Clinical Evidence Chain</h3>
          <ACMGGraph variant={selectedVariant} mode={mode} onNodeToggle={(n) => console.log("ACMG node toggled", n)} />
        </div>

        <div className="bg-panel rounded p-4 h-[360px] overflow-auto">
          <h3 className="text-white font-semibold mb-3">Multi-Omics</h3>
          <MultiOmicsPanel variant={selectedVariant} />
        </div>
      </div>

      <VariantDrawerLocal variant={selectedVariant} onClose={() => setSelectedVariant(null)} />
      <div className="fixed bottom-6 right-6 w-[360px] z-50">
        <AiCopilot onAction={(action) => {
          if (action.type === "filter") {
            console.log("AI requested filter:", action);
          }
        }} />
      </div>
    </div>
  );
}
