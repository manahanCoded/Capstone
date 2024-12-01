"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import checkJob  from "@/Configure/checkJob"; // Ensure `checkJob` is the correct import path for the type
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from '@mui/icons-material/Close';
import "quill/dist/quill.snow.css";

export default function CheckJobPage() {
  const params = useParams();
  const router = useRouter()
  const [job, setJob] = useState<checkJob | null>(null); // job is either `checkJob` or `null`

  useEffect(()=>{
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile",{
        method: "GET",
        credentials: "include",
      })
          if (!res.ok) {
        const data = await res.json();
        router.push("/user/login")
      }
    }
    checkUser()
  },[])

  useEffect(() => {
    const fetchJobData = async () => {
      const res = await fetch("http://localhost:5000/api/job/display");
      if (!res.ok) {
        throw new Error("Failed to fetch jobs data");
      }

      const data: checkJob[] = await res.json();

      const jobId = typeof params.jobsID === 'string' ? parseInt(params.jobsID) : null;
      const foundJob = jobId ? data.find((job) => job.id === jobId) : null;

      setJob(foundJob || null); // Ensures it's either checkJob or null
    };

    fetchJobData();
  }, [params.jobsID]);

  const [typeForm, setTypeForm] = useState<string>("details");
  const [openApply, setOpenApply] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    if (job?.id) {
      formData.append('jobId', job.id.toString()); 
    } else {
      setUploadStatus('Job ID is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/job/upload-appointment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred during the upload.');
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  return (
    <div className="mt-14 text-sm">
      <section className={openApply ? "fixed h-screen inset-0 z-10 backdrop-blur-sm bg-black bg-opacity-50" : "hidden"}>
        <div className="h-full flex justify-center items-center file-uploader">
          <div className="h-fit flex flex-col gap-4 p-6 rounded-lg bg-white">
            <div className="flex justify-end">
              <button className="hover:bg-red-400" onClick={() => setOpenApply(false)}>
                <CloseIcon />
              </button>
            </div>
            <h2 className="text-red-900 md:text-3xl text-2xl font-bold py-6">Upload Application Letter</h2>
            <input type="file" onChange={handleFileChange} />
            <button className="p-2 bg-red-900 text-white" onClick={handleFileUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </div>
      </section>

      <section className="border-b-2 w-full">
        <MaxWidthWrapper className="xl:w-2/4 md:w-3/4 h-16 flex justify-between items-center">
          <div className="h-16 flex flex-row">
            <div
              className={typeForm === "details" ? "px-4 flex items-center cursor-pointer text-white bg-red-900" : "px-4 flex items-center cursor-pointer"}
              onClick={() => setTypeForm("details")}
            >
              <p>Details</p>
            </div>
            <div
              className={typeForm === "questions" ? "px-4 flex items-center cursor-pointer text-white bg-red-900" : "px-4 flex items-center cursor-pointer"}
              onClick={() => setTypeForm("questions")}
            >
              <p>Questions</p>
            </div>
          </div>
          <Link
            href="/forum"
            className="flex gap-1 items-center p-2 rounded-lg border-2 border-red-900 text-red-900 hover:bg-red-900 hover:border-red-900 hover:text-white"
          >
            <ExitToAppIcon />
            Back
          </Link>
        </MaxWidthWrapper>
      </section>

      <section className={typeForm === "details" ? "block py-14" : "hidden"}>
        <MaxWidthWrapper>
          <section className="flex flex-col gap-4 xl:w-2/4 md:w-3/4 p-4 md:px-8 m-auto rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="md:text-5xl text-4xl font-semibold">{job?.title ?? "Job Title Not Available"}</h1>
              <button className="rounded-sm p-4 text-xs font-bold bg-red-900 text-white" onClick={() => setOpenApply(true)}>
                Apply Now
              </button>
            </div>
            <div className="flex flex-row gap-3">
              <p className="border-[1px] rounded-xl p-1">{job?.state ?? "State Not Available"}</p>
              <p className="border-[1px] rounded-xl p-1">{job?.city ?? "City Not Available"}</p>
              <p className="border-[1px] rounded-xl p-1">{job?.date ? new Date(job.date).toLocaleDateString() : "Date Not Available"}</p>
            </div>
            <div>
              <p className="ql-editor" dangerouslySetInnerHTML={{ __html: job?.description ?? "No description available" }}></p>
            </div>
          </section>
        </MaxWidthWrapper>
      </section>

      <section className={typeForm === "questions" ? "block py-14" : "hidden"}>
        <MaxWidthWrapper>
          <section className="flex flex-col gap-4 md:w-2/4 p-4 md:px-8 m-auto rounded-lg bg-gray-100">
            <h1>{job?.title ?? "Job Title Not Available"}</h1>
          </section>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
