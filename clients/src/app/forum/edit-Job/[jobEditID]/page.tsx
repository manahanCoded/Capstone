"use client";

import axios from "axios";
import "react-quill-new/dist/quill.snow.css";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import checkJob from "@/Configure/checkJob";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { CitySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import EditorToolbar, { modules, formats } from "@/components/EditorToolbar";
import checkAdmin from "@/Configure/checkAdmin";


export default function CreateJobPage() {
  const router = useRouter();
  const params = useParams()
  const jobEditID = params.jobEditID;

  const [checkAdmin, setCheckAdmin] = useState<checkAdmin | null>(null);
  const [specificJob, setSpecificJob] = useState<checkJob | null>(null);
  const [information, setInformation] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    jobtype: "",
    remote: "",
    experience: "",
    salary: "",
    state: "",
    city: "",
    street: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });


  const onDescription = (value: string) => {
    setInformation({
      ...information,
      description: value,
    });
  };

  const [isClient, setIsClient] = useState(false);
  const [stateid, setStateid] = useState<number>(0);
  // Check user access and role
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        router.push("/user/login");
        return;
      }
      const data = await res.json();
      setCheckAdmin(data);

      if (data.role === "client") {
        alert("Unauthorized access!");
        router.push("/modules");
      }
    }
    checkUser();
  }, []);


  useEffect(() => {
    if (specificJob) {

      setIsClient(true);
      setInformation({
        name: specificJob.name || "",
        phone: specificJob.phone ? specificJob.phone.toString() : "",
        email: specificJob.email || "",
        title: specificJob.title || "",
        jobtype: specificJob.jobtype || "",
        remote: specificJob.remote || "",
        experience: specificJob.experience || "",
        salary: specificJob.salary || "",
        state: specificJob.state || "",
        city: specificJob.city || "",
        street: specificJob.street || "",
        description: specificJob.description || "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [specificJob]);

  // Fetch specific job data
  useEffect(() => {
    if (jobEditID) {
      async function handleSpecificJob() {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/job/specific-job/${jobEditID}`
          );
          setSpecificJob(response.data);
        } catch (error) {
          console.error("Error fetching the specific job:", error);
        }
      }
      handleSpecificJob();
    }
  }, [jobEditID]);

  // Handle form field updates dynamically
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInformation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle form submission for editing job
  async function editJob(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/job/upDatejob/${jobEditID}`,
        information,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        alert("Update Successful")
        router.push("/forum");
      } else {
        alert("Failed to Update job.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error creating job:", err.response.data);
        alert("Error creating job: " + err.response.data.message || "Unknown error");
      } else {
        alert("Error creating job.");
        console.error(err);
      }
    }
  }


  return (
    <div className="mt-14 flex flex-row justify-center text-sm">
      <form onSubmit={editJob} className="w-full flex flex-col border-l-2">
        <section className="">
          <MaxWidthWrapper className="h-16 flex justify-between items-center border-b-2">
            <div className="h-16  flex flex-row">
              <div
                className="px-4 flex items-center cursor-pointer text-white bg-red-900"
              >
                <p>Edit Job</p>
              </div>
            </div>
            <Link
              href="/forum"
              className=" flex gap-1 items-center p-2  rounded-lg border-2 border-red-900 text-red-900 hover:bg-red-900 hover:border-red-900 hover:text-white"
            >
              <ExitToAppIcon />
              Discard
            </Link>
          </MaxWidthWrapper>
        </section>

        <section className="block py-14">
          <MaxWidthWrapper>
            <section className="flex flex-col gap-4 md:w-3/4 p-4 md:px-8  m-auto rounded-lg bg-gray-100 ">
              <section className="flex justify-between md:flex-row flex-col gap-4 mb-2">
                <div className="flex flex-col gap-2">
                  <h6 className="text-base">Contact Person</h6>
                  <div className="flex flex-row items-center gap-2">
                    <PersonIcon className="min-h-32 min-w-32 bg-white" />
                    <section className="w-full flex flex-col gap-2">
                      <div className="pl-2 border-[1px] rounded-md border-slate-300 bg-white">
                        <PersonIcon />
                        <input
                          type="text"
                          required
                          name="name"
                          className="p-2 rounded-md"
                          placeholder="Name"
                          value={information.name}
                          onChange={onInputChange}
                        />
                      </div>

                      <div className="pl-2 border-[1px] rounded-md border-slate-300 bg-white">
                        <LocalPhoneIcon />
                        <input
                          type="text"
                          value={information.phone}
                          onChange={(e) => {
                            setInformation({
                              ...information,
                              phone: e.target.value,
                            });
                          }}
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div className="pl-2 border-[1px] rounded-md border-slate-300 bg-white">
                        <EmailIcon />
                        <input
                          type="email"
                          required
                          className="p-2 rounded-md"
                          placeholder="Email"
                          value={information.email}
                          onChange={(e) => {
                            setInformation({
                              ...information,
                              email: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </section>
                  </div>
                </div>
                <div className="h-14 w-20 flex rounded-sm text-sm items-center justify-center bg-red-900 text-white cursor-pointer ">
                  <p>Delete</p>
                </div>
              </section>

              <section className="flex flex-col gap-2 mb-2">
                <label className="text-xl">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Job Title"
                  value={information.title}
                  className="px-4 py-2 rounded-md border-[1px] border-slate-300"
                  onChange={(e) => {
                    setInformation({ ...information, title: e.target.value });
                  }}
                />
              </section>

              <section className="flex flex-row gap-4 justify-between mb-2">
                {/* Full-time options */}
                <div className="flex flex-col gap-2">
                  <h6 className="text-base">Job Type</h6>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        className="hidden peer"
                        value="Internship"
                        checked={information.jobtype === "Internship"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            jobtype: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.jobtype === "Internship" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Internship
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        className="hidden peer"
                        value="Freelance"
                        checked={information.jobtype === "Freelance"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            jobtype: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.jobtype === "Freelance" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Freelance
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        className="hidden peer"
                        value="Contract"
                        checked={information.jobtype === "Contract"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            jobtype: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.jobtype === "Contract" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Contract
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        className="hidden peer"
                        value="Project"
                        checked={information.jobtype === "Project"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            jobtype: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.jobtype === "Project" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Project
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        className="hidden peer"
                        value="Part-time"
                        checked={information.jobtype === "Part-time"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            jobtype: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.jobtype === "Part-time" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Part-time
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        className="hidden peer"
                        value="Full-time"
                        checked={information.jobtype === "Full-time"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            jobtype: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.jobtype === "Full-time" ? "text-red-600" : "text-gray-700"}  peer-checked:border-red-600 peer-checked:bg-white`}
                      >
                        Full-time
                      </span>
                    </label>
                  </div>
                </div>

                {/* Remote options */}
                <div className="flex flex-col gap-2">
                  <h6 className="text-base">Remote?</h6>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="remote"
                        className="hidden peer"
                        value="On-site"
                        checked={information.remote === "On-site"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            remote: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.remote === "On-site" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        On-site
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="remote"
                        className="hidden peer"
                        value="Hybrid-remote"
                        checked={information.remote === "Hybrid-remote"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            remote: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.remote === "Hybrid-remote" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Hybrid-remote
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="remote"
                        className="hidden peer"
                        value="Full remote"
                        checked={information.remote === "Full remote"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            remote: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.remote === "Full remote" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Full remote
                      </span>
                    </label>
                  </div>
                </div>


                {/* Experience options */}
                <div className="flex flex-col gap-2">
                  <h6 className="text-base">Experience</h6>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        className="hidden peer"
                        value="Entry-Level"
                        checked={information.experience === "Entry-Level"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            experience: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.experience === "Entry-Level" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Entry-Level
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        className="hidden peer"
                        value="Mid-Level"
                        checked={information.experience === "Mid-Level"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            experience: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.experience === "Mid-Level" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Mid-Level
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        className="hidden peer"
                        value="Senior-Level"
                        checked={information.experience === "Senior-Level"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            experience: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.experience === "Senior-Level" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Senior-Level
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        className="hidden peer"
                        value="Managerial"
                        checked={information.experience === "Managerial"}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            experience: e.target.value,
                          });
                        }}
                      />
                      <div className="w-4 h-4 rounded-full border-4 border-gray-300 peer-checked:border-red-600 peer-checked:bg-white"></div>
                      <span
                        className={`ml-2 ${information.experience === "Managerial" ? "text-red-600" : "text-gray-700"} peer-checked:text-red-600`}
                      >
                        Managerial
                      </span>
                    </label>
                  </div>
                </div>

                {/* Salary */}
                <div className="w-1/3 flex flex-col gap-2">
                  <label>Salary</label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    className={`px-4 py-2 rounded-md border-[1px] border-slate-300 ${information.salary === "Unpaid"
                      ? "text-gray-400"
                      : "text-black"
                      }`}
                    value={information.salary || "Unpaid"}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );

                      if (numericValue.length > 11) return;

                      const formattedValue = numericValue
                        ? `₱${Number(numericValue).toLocaleString("en-PH")}`
                        : "";

                      setInformation({
                        ...information,
                        salary: formattedValue,
                      });
                    }}
                    onFocus={() => {
                      if (information.salary === "Unpaid") {
                        setInformation({ ...information, salary: "" });
                      }
                    }}
                  />
                  <p className="text-xs">
                    <span className="text-red-800 text-lg">*</span> Immediately
                    input Numeric Values (Leave Blank if Unpaid).{" "}
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-2 mb-2">
                <h6 className="text-base">Location</h6>
                <section className="flex md:flex-row flex-col justify-between gap-4">
                  <div className="w-full">
                    <h6>State</h6>
                    <StateSelect
                      countryid={174}
                      value={information.state}
                      // eslint-disable-next-line
                      onChange={(e: any) => {
                        setStateid(e.id); // Corrected the typo here
                        setInformation({
                          ...information,
                          state: e.name.toString(),
                        });
                      }}
                      placeHolder="Select State"
                    />
                  </div>
                  <div className="w-full">
                    <h6>City</h6>
                    <CitySelect
                      countryid={174}
                      stateid={stateid}
                      value={information.city}
                      // eslint-disable-next-line
                      onChange={(e: any) => {
                        setInformation({
                          ...information,
                          city: e.name.toString(),
                        });
                      }}
                      placeHolder="Select City"
                    />
                  </div>
                  <div className="w-full">
                    <h6>Street</h6>
                    <div className="py-1 px-1.5 border-[1px] flex justify-between items-center rounded-md border-slate-300">
                      <input
                        type="text"
                        required
                        value={information.street}
                        className="w-full p-1.5 rounded-sm border-[1px] border-slate-300 bg-white"
                        placeholder="Specific Street"
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            street: e.target.value,
                          });
                        }}
                      />
                      <SignpostOutlinedIcon />
                    </div>
                  </div>
                </section>
                <p className="text-xs">
                  <span className="text-red-800 text-lg">*</span>Please input
                  the location by selection (No auto fills by google).
                </p>
              </section>

              <section className="flex flex-col gap-2">
                {isClient && (
                  <div className="mb-4">
                    <EditorToolbar toolbarId="t2" />
                    <ReactQuill
                      theme="snow"
                      value={information.description}
                      onChange={(value) => setInformation({ ...information, description: value })}
                      placeholder="Write something..."
                      className="bg-white border rounded"
                    />
                  </div>
                )}
              </section>
              <input
                type="submit"
                required
                className="px-4 py-2 rounded-lg border-2 bg-red-900 cursor-pointer text-white"
              />
            </section>
          </MaxWidthWrapper>
        </section>
      </form>
    </div>
  );
}
