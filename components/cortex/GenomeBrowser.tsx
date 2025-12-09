"use client";
import React, { useEffect, useRef } from "react";

export default function GenomeBrowser({ selectedVariant }: { selectedVariant: any | null }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const mod = await import("igv");
      const igv = mod.default || mod;
      if (!ref.current) return;
      try {
        const browser = await igv.createBrowser(ref.current, {
          genome: "hg38",
          locus: selectedVariant ? `${selectedVariant.chrom}:${Math.max(1, selectedVariant.pos - 50)}-${selectedVariant.pos + 50}` : "chr1:100000-100200",
          tracks: [
            { name: "Genes", type: "annotation", format: "bed", url: "/report-templates/mock_genes.bed" }
          ],
          showNavigation: true,
          showRuler: true
        });
        // cleanup on unmount
        return () => {
          try { browser?.destroy(); } catch (_) {}
        };
      } catch (e) {
        console.error("IGV init failed", e);
      }
    })();
  }, [selectedVariant]);

  return <div ref={ref} style={{ height: 160, borderRadius: 6 }} />;
}
