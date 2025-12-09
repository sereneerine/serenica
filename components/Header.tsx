import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-transparent border-b border-slate">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded flex items-center justify-center bg-helix text-midnight font-bold">S</div>
        <div className="text-white font-semibold">Serenica</div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/"><a className="text-silver">Home</a></Link>
        <Link href="/docs"><a className="text-silver">Docs</a></Link>
        <Link href="/pricing"><a className="text-silver">Pricing</a></Link>
        <Link href="/dashboard"><a className="text-silver">Dashboard</a></Link>
      </div>
    </header>
  );
}
