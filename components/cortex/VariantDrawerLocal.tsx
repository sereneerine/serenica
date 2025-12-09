export default function VariantDrawerLocal({ variant, onClose }: { variant: any | null; onClose?: () => void }) {
  if (!variant) return null;
  return (
    <div className="fixed right-6 top-20 w-[420px] h-[70vh] bg-panel rounded shadow-lg z-50 overflow-auto p-4 border border-midnight">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-white font-bold">{variant.id} • {variant.gene}</div>
          <div className="text-silver text-xs">{variant.chrom}:{variant.pos} {variant.ref}&gt;{variant.alt}</div>
        </div>
        <button onClick={onClose} className="text-silver">Close</button>
      </div>

      <div className="mt-4 text-silver space-y-3 text-sm">
        <div><span className="text-white font-medium">ACMG:</span> {variant.acmg}</div>
        <div><span className="text-white font-medium">gnomAD AF:</span> {variant.af?.toExponential ? variant.af.toExponential(2) : variant.af}</div>
        <div><span className="text-white font-medium">Predicted impact:</span> {variant.impact?.toFixed ? variant.impact.toFixed(2) : variant.impact}</div>
        <div><span className="text-white font-medium">AI attention:</span> {variant.aiWeight?.toFixed ? variant.aiWeight.toFixed(2) : variant.aiWeight}</div>
        <div className="mt-2">
          <button className="bg-helix px-3 py-2 rounded text-midnight mr-2">Flag for Review</button>
          <button className="bg-midnight/40 px-3 py-2 rounded text-silver">Add Note</button>
        </div>
      </div>
    </div>
  );
}
