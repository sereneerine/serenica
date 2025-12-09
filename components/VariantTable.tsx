import { useEffect, useState } from "react";
import axios from "axios";

export default function VariantTable({ jobId }: { jobId?: string | null }) {
  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {
    if (!jobId) {
      // mock
      setVariants([]);
      return;
    }
    // fetch variants from API in production; here we mock
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}/variants`).then((res) => {
      setVariants(res.data || []);
    }).catch(() => {
      // fallback mock
      setVariants([]);
    });
  }, [jobId]);

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Gene</th>
            <th className="text-left p-2">Variant</th>
            <th className="text-left p-2">Consequence</th>
            <th className="text-left p-2">gnomAD AF</th>
            <th className="text-left p-2">ACMG</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v, i) => (
            <tr key={i} className="border-t border-midnight/40">
              <td className="p-2">{v.gene}</td>
              <td className="p-2">{v.hgvs}</td>
              <td className="p-2">{v.consequence}</td>
              <td className="p-2">{v.gnomad_af ?? "NA"}</td>
              <td className="p-2">{v.acmg_class ?? "VUS"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
