import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="bg-panel p-4 rounded flex justify-between items-center">
      <div>
        <div className="text-white font-semibold">Job {job.id}</div>
        <div className="text-silver text-sm">{job.status} • {job.createdAt}</div>
      </div>
      <div>
        <Link href={`/analysis?id=${job.id}`}><a className="bg-helix px-3 py-2 rounded text-midnight">Open</a></Link>
      </div>
    </div>
  );
}
