import useSWR from "swr";
import JobCard from "../../components/JobCard";
import { fetcher } from "../../lib/api";

export default function JobsPage() {
  const { data, error } = useSWR("/jobs", fetcher, { refreshInterval: 5000 });

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      <div className="space-y-4">
        {data.jobs.map((j: any) => <JobCard key={j.id} job={j} />)}
      </div>
    </div>
  );
}
