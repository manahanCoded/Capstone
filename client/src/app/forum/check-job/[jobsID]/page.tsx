import checkJob from "@/Configure/checkJob";
import CheckJobPage from "./CheckJobPage";

// Explicitly define the type for PageProps
type PageProps = {
  params: { jobsID: string };  // Ensure jobsID is passed as a string
};

export default async function CheckJob({ params }: PageProps) {
  const { jobsID } = params;  // No need to await params, it's not a Promise
  const res = await fetch("http://localhost:5000/api/job/display");
  
  if (!res.ok) {
    throw new Error("Failed to fetch jobs data");
  }

  const data: checkJob[] = await res.json();

  // Parse the jobsID as an integer since it's likely to be used as an ID
  const job = data.find((job) => job.id === parseInt(jobsID));

  if (!job) {
    return (
      <div>
        <h1>Job not found</h1>
      </div>
    );
  }

  return (
    <>
      <CheckJobPage information={job} />
    </>
  );
}
