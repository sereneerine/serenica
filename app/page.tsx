import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-white">Serenica — Genomic Intelligence</h1>
      <p className="mt-4 text-silver max-w-2xl">
        An AI-driven, clinical-grade platform for variant interpretation, multi-omics integration and
        actionable reports. Try the free trial — upload your VCF and see the future of genomics.
      </p>

      <div className="mt-8 space-x-4">
        <Link href="/upload">
          <a className="bg-helix px-6 py-3 rounded-md text-midnight font-semibold">Start Free Trial</a>
        </Link>
        <Link href="/dashboard">
          <a className="text-white px-6 py-3 rounded-md border border-slate">Open Dashboard</a>
        </Link>
      </div>
    </div>
  );
}
