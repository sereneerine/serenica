import JobCard from "../../components/JobCard";

export default function JobsPage() {
  // Mock jobs
  const jobs = [
    { id: "job-001", status: "completed", createdAt: "2025-12-01" },
    { id: "job-002", status: "running", createdAt: "2025-12-03" }
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      <div className="space-y-4">
        {jobs.map((j) => <JobCard key={j.id} job={j} />)}
      </div>
    </div>
  );
}
