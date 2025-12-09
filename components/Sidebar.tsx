import Link from "next/link";
import { FaHome, FaUpload, FaList } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate p-4 border-r border-slate">
      <div className="mb-6">
        <div className="text-white font-bold text-lg">Tools</div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard"><a className="flex items-center gap-3 p-3 rounded hover:bg-midnight/40"><FaHome /> Dashboard</a></Link>
        <Link href="/upload"><a className="flex items-center gap-3 p-3 rounded hover:bg-midnight/40"><FaUpload /> Upload</a></Link>
        <Link href="/jobs"><a className="flex items-center gap-3 p-3 rounded hover:bg-midnight/40"><FaList /> Jobs</a></Link>
        <Link href="/dashboard/tools/annotation/cortex"><a className="flex items-center gap-3 p-3 rounded hover:bg-midnight/40">Cortex</a></Link>
      </nav>

      <div className="mt-6">
        <div className="text-silver text-xs">Serenica • AI Genomics</div>
      </div>
    </aside>
  );
}
