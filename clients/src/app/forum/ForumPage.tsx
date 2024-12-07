"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import checkJob from "@/Configure/checkJob";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Link from "next/link";
import { useEffect, useState } from "react";
import checkAdmin from "@/Configure/checkAdmin";
import { useRouter } from "next/navigation";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import checkAnnouncement from "@/Configure/checkAnnouncement";


export default function ForumPage() {

  const router = useRouter()

  const [checkAdmin, setCheckAdmin] = useState<checkAdmin | null>(null)
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setCheckAdmin(data);
    }
    checkUser();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [location, setLocation] = useState({
    valueLocation: "",
    openLocation: false,
  });
  const [experience, setExperience] = useState({
    valueExperience: "",
    openExperience: false,
  });
  const [salary, setSalary] = useState({ valueSalary: "", openSalary: false });

  const [openBar, setOpenBar] = useState<boolean>(false);

  const [displayJobs, setDisplayJobs] = useState<checkJob[]>([]);
  const [displayOptions, setDisplayOptions] = useState<checkJob[]>([]);

  const [displayAnnouncement, setDisplayAnnouncement] = useState<checkAnnouncement[]>([]);

  const handleSearch = async () => {
    const query = new URLSearchParams({
      keyword: searchKeyword,
      location: location.valueLocation,
      experience: experience.valueExperience,
      salary: salary.valueSalary?.replace("k+", "000"),
    });

    try {
      const res = await fetch(`http://localhost:5000/api/job/display?${query}`);
      const data = await res.json();
      if (res.ok) {
        setDisplayJobs(data);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/job/display");
        const data = await res.json();
        if (res.ok) {
          setDisplayJobs(data);
          setDisplayOptions(data);
        } else {
          console.error("Failed to fetch all jobs");
        }
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      }
    };

    fetchAllJobs();
  }, []);

  useEffect(() => {
    const fetchAllAnnouncement = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcement/allAnnouncements");
        const data = await res.json();
        if (res.ok) {
          setDisplayAnnouncement(data);
          setDisplayAnnouncement(data);
        } else {
          console.error("Failed to fetch all Announcement");
        }
      } catch (error) {
        console.error("Error fetching all Announcement:", error);
      }
    };

    fetchAllAnnouncement();
  }, []);

  return (
    <div className="mt-14">
      <form>
        <MaxWidthWrapper className="h-16 flex flex-row justify-between items-center border-b-2 text-sm">
          <section className="lg:ml-64 flex flex-row border-[1px] rounded-lg overflow-hidden">
            <input
              placeholder="Find the job you're looking for"
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-64 py-2 pl-4 outline-none bg-slate-100"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="py-2 pr-2 bg-slate-100"
            >
              <SearchOutlinedIcon />
            </button>
          </section>
          <section className="lg:flex flex-row text-gray-500  hidden">
            <div className="flex items-center h-10 px-6 border-r-2 ">
              <section
                className={`h-16  flex flex-row items-center hover:bg-gray-300 cursor-pointer ${location.valueLocation ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => {
                  setLocation({
                    ...location,
                    openLocation: !location.openLocation,
                  });
                }}
              >
                <FmdGoodOutlinedIcon className="mr-3" />
                <p>
                  {location.valueLocation ? location.valueLocation : "Location"}
                </p>
                <ArrowDropDownIcon />
              </section>
              <section
                className={
                  location.openLocation
                    ? "absolute py-2 top-32 bg-white border-2 w-36 text-black h-40 overflow-y-auto"
                    : "hidden"
                }
              >
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setLocation({ openLocation: false, valueLocation: "" });
                  }}
                >
                  All
                </p>
                {[...new Set(displayOptions.map((job) => job.city))]
                  .sort()
                  .map((location, index) => (
                    <p
                      className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                      key={index}
                      onClick={() => {
                        setLocation({
                          openLocation: false,
                          valueLocation: location,
                        });
                      }}
                    >
                      {location}
                    </p>
                  ))}
              </section>
            </div>

            <div className="flex items-center h-10 px-6 border-r-2 ">
              <section
                className={`h-16  flex flex-row items-center hover:bg-gray-300 cursor-pointer ${experience.valueExperience ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => {
                  setExperience({
                    ...experience,
                    openExperience: !experience.openExperience,
                  });
                }}
              >
                <WorkHistoryOutlinedIcon className="mr-3" />
                <p>
                  {experience.valueExperience
                    ? experience.valueExperience
                    : "Experience"}
                </p>
                <ArrowDropDownIcon />
              </section>
              <section
                className={
                  experience.openExperience
                    ? "absolute py-2 top-32 bg-white border-2 w-36 text-black"
                    : "hidden"
                }
              >
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setExperience({
                      openExperience: false,
                      valueExperience: "",
                    });
                  }}
                >
                  All
                </p>
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setExperience({
                      openExperience: false,
                      valueExperience: "Intern",
                    });
                  }}
                >
                  Intern
                </p>
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setExperience({
                      openExperience: false,
                      valueExperience: "2 years +",
                    });
                  }}
                >
                  2 years +
                </p>
              </section>
            </div>

            <div className="flex items-center h-10 pl-4 pr-6 ">
              <section
                className={`h-16  flex flex-row items-center hover:bg-gray-300 cursor-pointer ${salary.valueSalary ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => {
                  setSalary({ ...salary, openSalary: !salary.openSalary });
                }}
              >
                <PriceChangeOutlinedIcon className="mr-3" />
                <p>{salary.valueSalary ? salary.valueSalary : "Salary"}</p>
                <ArrowDropDownIcon />
              </section>
              <section
                className={
                  salary.openSalary
                    ? "absolute py-2 top-32 bg-white border-2 w-36 text-black"
                    : "hidden"
                }
              >
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setSalary({ openSalary: false, valueSalary: "" });
                  }}
                >
                  All
                </p>
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setSalary({ openSalary: false, valueSalary: "10k+" });
                  }}
                >
                  10k
                </p>
                <p
                  className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    setSalary({ openSalary: false, valueSalary: "20k+" });
                  }}
                >
                  20k
                </p>
              </section>
            </div>
          </section>
          {/* Mobile Bar Section */}
          <section className="lg:hidden block p-4 ">
            <MenuOutlinedIcon
              onClick={() => {
                setOpenBar(!openBar);
              }}
              className="text-3xl"
            />
            <section
              className={
                openBar
                  ? "absolute top-32 right-8 flex flex-col gap-2 bg-white text-gray-500  shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  : "hidden"
              }
            >
              <div className="flex items-center h-10 ">
                <section
                  className="h-10 w-full px-2 flex flex-row justify-between items-center hover:bg-gray-300 cursor-pointer"
                  style={
                    location.valueLocation
                      ? { color: "black" }
                      : { color: "rgb(107 114 128 / var(--tw-text-opacity))" }
                  }
                  onClick={() => {
                    setLocation({
                      ...location,
                      openLocation: !location.openLocation,
                    });
                  }}
                >
                  <ExitToAppIcon className="mr-3" />
                  <p>
                    {location.valueLocation
                      ? location.valueLocation
                      : "Location"}
                  </p>
                  <ArrowDropDownIcon />
                </section>
                <section
                  className={
                    location.openLocation
                      ? "absolute py-2 top-10 bg-white border-2 w-36 text-black h-40 overflow-y-auto"
                      : "hidden"
                  }
                >
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setLocation({ openLocation: false, valueLocation: "" });
                    }}
                  >
                    All
                  </p>
                  {[...new Set(displayOptions.map((job) => job.city))]
                    .sort()
                    .map((location, index) => (
                      <p
                        className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                        key={index}
                        onClick={() => {
                          setLocation({
                            openLocation: false,
                            valueLocation: location,
                          });
                        }}
                      >
                        {location}
                      </p>
                    ))}
                </section>
              </div>

              <div className="flex items-center h-10 ">
                <section
                  className="h-10 px-2 w-full flex flex-row justify-between items-center hover:bg-gray-300 cursor-pointer"
                  style={
                    experience.valueExperience
                      ? { color: "black" }
                      : { color: "rgb(107 114 128 / var(--tw-text-opacity))" }
                  }
                  onClick={() => {
                    setExperience({
                      ...experience,
                      openExperience: !experience.openExperience,
                    });
                  }}
                >
                  <ExitToAppIcon className="mr-3" />
                  <p>
                    {experience.valueExperience
                      ? experience.valueExperience
                      : "Experience"}
                  </p>
                  <ArrowDropDownIcon />
                </section>
                <section
                  className={
                    experience.openExperience
                      ? "absolute py-2 top-20 bg-white border-2 w-36 text-black"
                      : "hidden"
                  }
                >
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setExperience({
                        openExperience: false,
                        valueExperience: "",
                      });
                    }}
                  >
                    All
                  </p>
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setExperience({
                        openExperience: false,
                        valueExperience: "Intern",
                      });
                    }}
                  >
                    Intern
                  </p>
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setExperience({
                        openExperience: false,
                        valueExperience: "2 years +",
                      });
                    }}
                  >
                    2 years +
                  </p>
                </section>
              </div>

              <div className="flex items-center h-10 ">
                <section
                  className="h-10 w-full px-2 flex flex-row justify-between items-center hover:bg-gray-300 cursor-pointer"
                  style={
                    salary.valueSalary
                      ? { color: "black" }
                      : { color: "rgb(107 114 128 / var(--tw-text-opacity))" }
                  }
                  onClick={() => {
                    setSalary({ ...salary, openSalary: !salary.openSalary });
                  }}
                >
                  <ExitToAppIcon className="mr-3" />
                  <p>{salary.valueSalary ? salary.valueSalary : "Salary"}</p>
                  <ArrowDropDownIcon />
                </section>
                <section
                  className={
                    salary.openSalary
                      ? "absolute py-2 top-32 bg-white border-2 w-36 text-black"
                      : "hidden"
                  }
                >
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setSalary({ openSalary: false, valueSalary: "" });
                    }}
                  >
                    All
                  </p>
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setSalary({ openSalary: false, valueSalary: "10k+" });
                    }}
                  >
                    10k
                  </p>
                  <p
                    className="p-3 hover:bg-gray-300 border-b-[1px] cursor-pointer"
                    onClick={() => {
                      setSalary({ openSalary: false, valueSalary: "20k+" });
                    }}
                  >
                    20k
                  </p>
                </section>
              </div>
            </section>
          </section>
        </MaxWidthWrapper>
      </form>

      <section className="h-fit py-7 bg-gray-100 ">

        <MaxWidthWrapper className="flex lg:flex-row flex-col-reverse gap-8">
          <section className="lg:max-w-60 flex flex-col">
            <h3 className="lg:text-lg md:mb-6 mb-4 font-bold">Announcements</h3>
            {displayAnnouncement.map((announcement, index) => (
              <section key={index} className="h-fit flex-col p-2 rounded-sm mb-2 bg-white">
                <div className="flex flex-row gap-2 mb-2">
                  <CircleNotificationsIcon className="" />
                  <h1 className="text-lg font-semibold line-clamp-2">{announcement.title}</h1>
                </div>
                <p className="text-sm line-clamp-2 mb-2 text-[0.8rem]  text-gray-600">{announcement.description}</p>
                <div className="w-full py-2 text-xs flex justify-end border-t-[1px] text-slate-500 border-black">
                  <p>{new Date(announcement.date).toLocaleDateString()}</p>
                </div>
              </section>
            )
            )}
          </section>


          <section className="">
            <h3 className="lg:text-lg md:mb-6 mb-4 font-bold">Job</h3>
            <div className="flex md:gap-3 gap-4 flex-wrap">
              {displayJobs.map((jobs, index) => (
                <section
                  key={index}
                  className="h-fit lg:w-72 md:w-60 w-56 md:py-6 py-2 md:px-4 px-3 rounded-md bg-white"
                >
                  <p className="flex items-center text-xs mb-4 text-slate-500">
                    <CalendarMonthOutlinedIcon className="text-lg mr-1" />
                    {new Date(jobs.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-1 text-blue-500">
                    {jobs.applicants ? jobs.applicants : 0} Applicants
                  </p>
                  <h4 className="lg:text-xl mb-1 font-bold">{jobs.title}</h4>
                  <p
                    className="lg:text-sm text-xs line-clamp-3 font-sans"
                    dangerouslySetInnerHTML={{ __html: jobs.description }}
                  ></p>
                  <div className="flex flex-row flex-wrap gap-2 mt-4">
                    <p className="border-2 px-2 py-1 rounded-lg  md:text-[0.6rem] text-[0.5rem] tracking-wide bg-violet-200 text-violet-800">
                      {jobs.city}
                    </p>
                    <p className="border-2 px-2 py-1 rounded-lg   md:text-[0.6rem] text-[0.5rem] tracking-wide bg-green-200 text-green-800">
                      {jobs.experience}
                    </p>
                    <p className="border-2 px-2 py-1 rounded-lg   md:text-[0.6rem] text-[0.5rem] tracking-wide bg-red-200 text-red-800">
                      {jobs.salary ? jobs.salary : "Unpaid"}
                    </p>
                  </div>
                  <div className="flex justify-end border-t-[1px] gap-2 mt-4">
                    {checkAdmin?.role === "admin" ?
                      <Link
                        href={`/forum/edit-Job/${jobs.id}`}
                        className="lg:text-sm text-xs py-2 px-4 mt-4 rounded-lg border-black hover:bg-black hover:text-white border-2 "
                      >
                        Edit
                      </Link> :
                      null
                    }
                    <Link
                      href={`/forum/check-job/${jobs.id}`}
                      className="lg:text-sm text-xs py-2 px-4 mt-4 rounded-lg bg-black text-white"
                    >
                      Checkout
                    </Link>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
