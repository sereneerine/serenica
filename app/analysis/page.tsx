"use client";
import { useSearchParams } from "next/navigation";
import VariantTable from "../../components/VariantTable";
import VariantDrawer from "../../components/VariantDrawer";
import AiChat from "../../components/AiChat";

export default function AnalysisPage() {
  const params = useSearchParams();
  const jobId = params?.get("id");
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="bg-panel p-4 rounded mb-4">
          <h3 className="text-lg font-semibold">Variant Results (Job {jobId})</h3>
        </div>
        <div className="bg-panel p-4 rounded">
          <VariantTable jobId={jobId} />
        </div>
      </div>
      <div className="col-span-4 space-y-4">
        <div className="bg-panel p-4 rounded">
          <AiChat jobId={jobId} />
        </div>
        <div className="bg-panel p-4 rounded">
          <VariantDrawer />
        </div>
      </div>
    </div>
  );
}
